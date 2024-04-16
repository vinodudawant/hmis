package com.hms.sandbox.service.impl;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.JsonElement;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.doctordesk.dto.ImmunizationPatientStatus;
import com.hms.doctordesk.dto.OPDIPDLabTestResultDTO;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.doctordesk.service.PrescriptionService;
import com.hms.dto.Doctor;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.RegService;
import com.hms.pathology.service.Phlebotomyservice;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.sandbox.service.ISandboxReportService;

@Service
@Transactional
public class SandboxReportServiceImpl implements ISandboxReportService {

	private static final Logger LOG = LogManager.getLogger(SandboxReportServiceImpl.class);
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	Phlebotomyservice phelbotomyService;
	
	@Autowired
	PrescriptionService prescriptionService;
	
	@Autowired
	RegService regService;

	@SuppressWarnings("unchecked")
	@Override
	public String sendPrescriptionData(int patientId) {

		LOG.info("Inside a Send Prescription Data ");
		
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		org.json.JSONObject jsonObject = new org.json.JSONObject();
		
		
//		  fetach patient name from patient table

		Session currentSession = sessionFactory.getCurrentSession();
		Criteria criteria = currentSession.createCriteria(RegistrationDto.class);
		criteria.add(Restrictions.eq("patientId", patientId));
		// criteria.addOrder(Order.asc("id"));
		RegistrationDto sandBoxPatientInfo = (RegistrationDto) criteria.uniqueResult();

		try {
//		  org.json.JSONObject jsonObject = new org.json.JSONObject();
			jsonObject.put("resourceType", "Bundle");
			UUID uuid = UUID.randomUUID();
			jsonObject.put("id", uuid.toString());

			org.json.JSONObject jsonObjectMeta = new org.json.JSONObject();
			jsonObjectMeta.put("lastUpdated", currentDate);
			jsonObject.put("meta", jsonObjectMeta);

			org.json.JSONObject jsonObjectIdentifier = new org.json.JSONObject();
			jsonObjectIdentifier.put("system", "https://www.max.in/bundle");
			jsonObjectIdentifier.put("value", uuid.toString());

			jsonObject.put("identifier", jsonObjectIdentifier);
			jsonObject.put("type", "document");
			jsonObject.put("timestamp", currentDate);

			org.json.JSONArray enrtyArray = new org.json.JSONArray();

			// first object start
			org.json.JSONObject jsonObjectFullUrl1 = new org.json.JSONObject();
			UUID uuidFullUrl1 = UUID.randomUUID();
			jsonObjectFullUrl1.put("fullUrl", "Composition" + "/" + uuidFullUrl1.toString());

			org.json.JSONObject jsonObjectFullUrl1Resource = new org.json.JSONObject();
			jsonObjectFullUrl1Resource.put("resourceType", "Composition");
			jsonObjectFullUrl1Resource.put("id", uuidFullUrl1.toString());

			org.json.JSONObject jsonIdentifierFullUrl1 = new org.json.JSONObject();
			jsonIdentifierFullUrl1.put("system", "https://www.max.in/document");
			jsonIdentifierFullUrl1.put("value", uuidFullUrl1.toString());

			jsonObjectFullUrl1Resource.put("identifier", jsonIdentifierFullUrl1);
			jsonObjectFullUrl1Resource.put("status", "final");

			org.json.JSONObject jsonTypeFullUrl1 = new org.json.JSONObject();
			org.json.JSONArray jsonTypeArray = new org.json.JSONArray();

			org.json.JSONObject jsonCodingFullUrl1 = new org.json.JSONObject();
			jsonCodingFullUrl1.put("system", "https://projecteka.in/sct");
			jsonCodingFullUrl1.put("code", "440545006");
			jsonCodingFullUrl1.put("display", "Prescription record");
			jsonTypeArray.put(jsonCodingFullUrl1);
			jsonTypeFullUrl1.put("coding", jsonTypeArray);

			jsonObjectFullUrl1Resource.put("type", jsonTypeFullUrl1);

			org.json.JSONObject jsonObjectSubject1 = new org.json.JSONObject();
			jsonObjectSubject1.put("reference", "Patient/"+sandBoxPatientInfo.getPatientId().toString());

			jsonObjectFullUrl1Resource.put("subject", jsonObjectSubject1);

			org.json.JSONObject jsonObjectEncounter11 = new org.json.JSONObject();
			UUID uuidEncounter1 = UUID.randomUUID();
			jsonObjectEncounter11.put("reference", "Encounter" + "/" + uuidEncounter1.toString());

			jsonObjectFullUrl1Resource.put("encounter", jsonObjectEncounter11);

			jsonObjectFullUrl1Resource.put("date", currentDate);
			// get the doctor name
			String doctorname = "";
			String sql = "select doctor_id from ehat_treatment where patient_id=" + patientId + " ";
			SQLQuery sQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			String doctorIds = (String) sQuery.uniqueResult();
			String[] doctorArray = doctorIds.split(",");
			int docCount = 1;
			for (String doctorId : doctorArray) {
				String sqlDoctor = "select doc_name from doctor where Doctor_ID= '" + doctorId + "' ";
				SQLQuery sdocQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
				String docName = (String) sdocQuery.uniqueResult();
				if (docCount == 1) {
					doctorname = docName;
				} else {
					doctorname = doctorname + "," + docName;
				}
				docCount++;

			}
			
			Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
			
			createCriteria2.add(Restrictions.eq("doc_Type", "DOCTOR"));
			createCriteria2.add(Restrictions.eq("deleted", "N"));
			createCriteria2.add(Restrictions.eq("Doctor_ID", doctorIds));
			
			List<Doctor> doctors = createCriteria2.list();
			Doctor doctor = doctors.get(0);
			int hospitalSpecializetionId = Integer.parseInt(doctor.getSpecialisation());
			String[] split = doctor.getDoc_name().split(".");
			
			//fetch hospital specilization from doctor id
			Criteria createCriteria3 = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
			createCriteria3.add(Restrictions.eq("deleted", "N"));
			createCriteria3.add(Restrictions.eq("specialisationId", hospitalSpecializetionId));
			
			List<HospitalSpecialisationDto> specialisationDtos = createCriteria3.list();
			HospitalSpecialisationDto hospitalSpecialisationDto = specialisationDtos.get(0);
			String specializationName = hospitalSpecialisationDto.getSpecializationName();
			
			// end doctor details
			org.json.JSONArray authorArray1 = new org.json.JSONArray();
			org.json.JSONObject jsonAuthorobj1 = new org.json.JSONObject();
			jsonAuthorobj1.put("reference", "Practitioner/MAX5001");
			// jsonAuthorobj1.put("display","Dr Ram Sharma");
			jsonAuthorobj1.put("display", doctorname);
			authorArray1.put(jsonAuthorobj1);

			jsonObjectFullUrl1Resource.put("author", authorArray1);
			jsonObjectFullUrl1Resource.put("title", "Prescription");

			org.json.JSONArray sectionArray1 = new org.json.JSONArray();
			org.json.JSONObject sectionObject1 = new org.json.JSONObject();
			sectionObject1.put("title", "OPD Prescription");

			org.json.JSONObject sectioncode = new org.json.JSONObject();
			org.json.JSONArray secondcodeingArray = new org.json.JSONArray();
			org.json.JSONObject sectionCodeingObj = new org.json.JSONObject();
			sectionCodeingObj.put("system", "https://projecteka.in/sct");
			sectionCodeingObj.put("code", "440545006");
			sectionCodeingObj.put("display", "Prescription record");
			secondcodeingArray.put(sectionCodeingObj);
			sectioncode.put("coding", secondcodeingArray);

			sectionObject1.put("code", sectioncode);
			sectionArray1.put(sectionObject1);

			jsonObjectFullUrl1Resource.put("section", sectionArray1);

			jsonObjectFullUrl1.put("resource", jsonObjectFullUrl1Resource);

			enrtyArray.put(jsonObjectFullUrl1);

			// first object end

			// start second obj
			org.json.JSONObject jsonObjectFullUrl2 = new org.json.JSONObject();
			jsonObjectFullUrl2.put("fullUrl", "Practitioner/MAX5001");

			org.json.JSONObject resource2 = new org.json.JSONObject();
			resource2.put("resourceType", "Practitioner");
			resource2.put("id", "MAX5001");

			org.json.JSONArray identifier2 = new org.json.JSONArray();
			org.json.JSONObject identfier2Obj = new org.json.JSONObject();
			identfier2Obj.put("system", "https://www.mciindia.in/doctor");
			identfier2Obj.put("value", "MAX5001");
			identifier2.put(identfier2Obj);

			resource2.put("identifier", identifier2);

			org.json.JSONArray name2 = new org.json.JSONArray();
			org.json.JSONObject name2obj = new org.json.JSONObject();
			// name2obj.put("text", "Ram Sharma");
			name2obj.put("text", doctorname);

			org.json.JSONArray prefix = new org.json.JSONArray();
//			prefix.put("Dr");
			prefix.put(split[0]);

			org.json.JSONArray suffix = new org.json.JSONArray();
//			suffix.put("MD");
			suffix.put(specializationName);

			name2obj.put("prefix", prefix);
			name2obj.put("suffix", suffix);
			name2.put(name2obj);

			resource2.put("name", name2);

			jsonObjectFullUrl2.put("resource", resource2);

			enrtyArray.put(jsonObjectFullUrl2);
			// end second obj

			String patientName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getlName();
			org.json.JSONObject jsonObjectFullUrl3 = new org.json.JSONObject();
			jsonObjectFullUrl3.put("fullUrl", "Patient/"+sandBoxPatientInfo.getPatientId().toString());

			org.json.JSONObject resource3 = new org.json.JSONObject();
			resource3.put("resourceType", "Patient");
			resource3.put("id", sandBoxPatientInfo.getPatientId().toString());
			resource3.put("gender", sandBoxPatientInfo.getAge());

			org.json.JSONArray name3 = new org.json.JSONArray();
			org.json.JSONObject name3obj = new org.json.JSONObject();
//			  name3obj.put("text", "abc");

			name3obj.put("text", patientName);
			name3.put(name3obj);

			resource3.put("name", name3);

			jsonObjectFullUrl3.put("resource", resource3);

			enrtyArray.put(jsonObjectFullUrl3);
			// end third obj

			// start fourth obj
			UUID uuidFullUrl4 = UUID.randomUUID();
			org.json.JSONObject jsonObjectFullUrl4 = new org.json.JSONObject();
			jsonObjectFullUrl4.put("fullUrl", "Encounter" + "/" + uuidFullUrl4.toString());

			org.json.JSONObject resource4 = new org.json.JSONObject();
			resource4.put("resourceType", "Encounter");
			resource4.put("id", uuidFullUrl4.toString());
			resource4.put("status", "finished");

			org.json.JSONObject class4 = new org.json.JSONObject();
			class4.put("system", "http://terminology.hl7.org/CodeSystem/v3-ActCode");
			class4.put("code", "AMB");
			class4.put("display", "Outpatient visit");

			resource4.put("class", class4);

			org.json.JSONObject subject4 = new org.json.JSONObject();
			subject4.put("reference", "Patient/"+sandBoxPatientInfo.getPatientId().toString());

			resource4.put("subject", subject4);

			org.json.JSONObject period4 = new org.json.JSONObject();
			period4.put("start", currentDate);

			resource4.put("period", period4);

			jsonObjectFullUrl4.put("resource", resource4);

			enrtyArray.put(jsonObjectFullUrl4);
			// end fourth obj

			// end sixth obj

			// int patientId=39957;
			Criteria c = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionDto.class);
			c.add(Restrictions.eq("patientId", patientId));
			c.add(Restrictions.eq("deleted", "N"));

			List<OPDPrescriptionDto> listpres = c.list();
			org.json.JSONArray entryArray1 = new org.json.JSONArray();
			System.out.println("pres====" + listpres);
			int count = 1;
			for (OPDPrescriptionDto pobj : listpres) {
				// start fifth obj
				UUID uuidMedication = UUID.randomUUID();
				org.json.JSONObject jsonObjectFullUrl5 = new org.json.JSONObject();
				jsonObjectFullUrl5.put("fullUrl", "Medication" + "/" + uuidMedication.toString());

				org.json.JSONObject resource5 = new org.json.JSONObject();
				resource5.put("resourceType", "Medication");
				resource5.put("id", uuidMedication.toString());

				org.json.JSONObject code5obj = new org.json.JSONObject();
				org.json.JSONArray code5Array = new org.json.JSONArray();
				org.json.JSONObject code5 = new org.json.JSONObject();
				code5.put("system", "https://projecteka.in/act");
				code5.put("code", "R05CB0" + count);
				count++;
				// code5.put("display", "paracetemol 24 mg");
				code5.put("display", pobj.getMedicineName());
				// code5.put("display", "paracetemol 24 mg");
				code5Array.put(code5);

				code5obj.put("coding", code5Array);

				resource5.put("code", code5obj);

				jsonObjectFullUrl5.put("resource", resource5);

				enrtyArray.put(jsonObjectFullUrl5);
				// end fifth obj

				// start sixth obj
				UUID uuidFullUrl6 = UUID.randomUUID();
				org.json.JSONObject jsonObjectFullUrl6 = new org.json.JSONObject();
				jsonObjectFullUrl6.put("fullUrl", "MedicationRequest" + "/" + uuidFullUrl6.toString());

				org.json.JSONObject resource6 = new org.json.JSONObject();
				resource6.put("resourceType", "MedicationRequest");
				resource6.put("id", uuidFullUrl6.toString());
				resource6.put("status", "active");
				resource6.put("intent", "order");

				// medication add into composition
				org.json.JSONObject entryObject1 = new org.json.JSONObject();

				entryObject1.put("reference", "MedicationRequest" + "/" + uuidFullUrl6.toString());
				entryArray1.put(entryObject1);

				org.json.JSONObject medicationReference6 = new org.json.JSONObject();

				medicationReference6.put("reference", "Medication" + "/" + uuidMedication.toString());

				resource6.put("medicationReference", medicationReference6);

				org.json.JSONObject subject6 = new org.json.JSONObject();
				subject6.put("reference", "Patient/"+sandBoxPatientInfo.getPatientId().toString());

				resource6.put("subject", subject6);
				resource6.put("authoredOn", currentDate);

				org.json.JSONObject requester6 = new org.json.JSONObject();
				requester6.put("reference", "Practitioner/MAX5001");

				resource6.put("requester", requester6);

				org.json.JSONArray dosageInstructionArray = new org.json.JSONArray();
				org.json.JSONObject dosageInstruction = new org.json.JSONObject();
				// dosageInstruction.put("text", "1 capsule 2 times a day");

				int prepId = pobj.getPrep();

				PreparationMaster prepObj = (PreparationMaster) sessionFactory.getCurrentSession()
						.get(PreparationMaster.class, prepId);

				dosageInstruction.put("text",
						"1" + "  " + prepObj.getPreparationName() + " " + pobj.getFrequency() + "times a day");
				dosageInstructionArray.put(dosageInstruction);

				resource6.put("dosageInstruction", dosageInstructionArray);

				jsonObjectFullUrl6.put("resource", resource6);

				enrtyArray.put(jsonObjectFullUrl6);
				// end sixth obj

			}
			sectionObject1.put("entry", entryArray1);
			jsonObject.put("entry", enrtyArray);
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("Main json obj=======" + jsonObject.toString());
		return jsonObject.toString();

//		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String sendDiagnosisData(int patientId) {

		LOG.info("Inside a Send Diagnosis Data ");
		
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
		
		Integer unitId=1;
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
		criteria.add(Restrictions.eq("sandboxIntegrationFlag", 'Y'));
		criteria.add(Restrictions.eq("hospitalUnitId", unitId));
		HospitalDetails hospitalDetails = (HospitalDetails) criteria.uniqueResult();

		if (hospitalDetails == null) {

			throw new RuntimeException("Hospital Details is null in dignostic report");
		}
		
		List<RegistrationDto> patientRecordsbypatientId = regService.getPatientRecordsbypatientId(patientId);
		RegistrationDto sandBoxPatientInfo=patientRecordsbypatientId.get(0);
		
		String patientName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getlName();
		String patientId2 = sandBoxPatientInfo.getPatientId().toString();
		
		
//		fetch tretment details from treatment table
		Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
		
//		SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery("Select * from ehat_treatment where t_flag='Y' and patient_id="+patientId);
//		createSQLQuery.setResultTransformer(Transformers.aliasToBean(TreatmentDto.class));
		createCriteria.add(Restrictions.eq("patientId", patientId));
//		createCriteria.add(Restrictions.eq("t_flag", "Y"));s
		List<RegistrationDto> list = createCriteria.list();
		List<TreatmentDto> treatmentDto;
		TreatmentDto treatmentDto2= new TreatmentDto();
		if(list!=null) {
			treatmentDto = list.get(0).getListTreatment();
			
			//list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
			List<TreatmentDto> collect = treatmentDto.stream().filter(x->x.gettFlag().equalsIgnoreCase("Y")).collect(Collectors.toList());
			treatmentDto2 = collect.get(0);
		}
		
		Integer treatmentId = treatmentDto2.getTreatmentId();
		//fetch lab result service name and test name
		
		List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();

		try {
				CpoeServdetails objCpoe = new CpoeServdetails();

				String fetchId = "";
				Calendar postDate = Calendar.getInstance();
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");

				int packageID = Integer.parseInt((String) resourceBundleEhat.getString("labHeadingID"));// 13
				int serviceId = Integer.parseInt((String) resourceBundleEhat.getString("packageID"));// 11
				int investigation = Integer.parseInt((String) resourceBundleEhat.getString("investigation"));// 12
				int casuality = Integer.parseInt((String) resourceBundleEhat.getString("casuality"));
				int physiotherapy = Integer.parseInt((String) resourceBundleEhat.getString("physiotherapy"));
				int otherservices = Integer.parseInt((String) resourceBundleEhat.getString("otherservices"));
				int radiationId = Integer.parseInt((String) resourceBundleEhat.getString("radiationId"));
				String sql = "select a.bill_details_id AS bill_details_id, a.emrPer AS emrPer, a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel,a.speciality_id as speciality_id,a.sndtolabflag as sndtolabflag,a.template_wise as template_wise  from (((ehat_bill_details a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N' and a.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
						+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality
						+ "," + otherservices + "," + radiationId + ") and a.treatment_id='" + treatmentId
						+ "' order by a.bill_details_id desc";

				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				for (Map<String, Object> row : result) {
					CpoeServdetails obj = new CpoeServdetails();
					obj.setBilldetailsid((Integer) row.get("bill_details_id"));
					obj.setTreatmentid((Integer) row.get("treatment_id"));
					obj.setServiceid((Integer) row.get("service_id"));
					obj.setPaid_flag((String) row.get("paid_flag"));
					obj.setDoctor_id((Integer) row.get("doctor_id"));
					obj.setClinical_notes((String) row.get("clinical_notes"));
					obj.setInstructions((String) row.get("instructions"));
					obj.setServicename((String) row.get("service_name"));
					obj.setCategoryid((Integer) row.get("id"));
					obj.setCategoryName((String) row.get("category_name"));
					obj.setCategorycharges((Double) row.get("category_charges"));
					obj.setQuantity(((Double) row.get("quantity")).intValue());
					obj.setDocName((String) row.get("docName"));
					obj.setInserted_date_time((Date) row.get("created_date_time"));
					obj.setEmrPer((Double) row.get("emrPer"));
					obj.setRate((Double) row.get("rate"));
					obj.setDeleted((String) row.get("deleted"));
					obj.setCancel((String) row.get("cancel"));
					obj.setSpecialityId((Integer) row.get("speciality_id"));
					obj.setTemplate_wise((String) row.get("template_wise"));

					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

					obj.setCreated_date_time(sqlDate);
					obj.setSndtolabflag((String) row.get("sndtolabflag"));
					tlistbiilall.add(obj);
				}
			

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
		//return obj1;

		try {
			// com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
			jsonObject.addProperty("resourceType", "Bundle");
			UUID uuid = UUID.randomUUID();
			jsonObject.addProperty("id", uuid.toString());

			com.google.gson.JsonObject jsonObjectMeta = new com.google.gson.JsonObject();
			jsonObjectMeta.addProperty("lastUpdated", currentDate);
			jsonObject.add("meta", jsonObjectMeta);

			com.google.gson.JsonObject jsonObjectIdentifier = new com.google.gson.JsonObject();
			jsonObjectIdentifier.addProperty("system", "https://www.max.in/bundle");
			jsonObjectIdentifier.addProperty("value", uuid.toString());

			jsonObject.add("identifier", jsonObjectIdentifier);
			jsonObject.addProperty("type", "document");
			jsonObject.addProperty("timestamp", currentDate);

			com.google.gson.JsonArray enrtyArray = new com.google.gson.JsonArray();

			// first object start
			com.google.gson.JsonObject jsonObjectFullUrl1 = new com.google.gson.JsonObject();
			
//		         jsonObjectFullUrl1.addProperty("fullUrl", "Composition"+"/"+uuidFullUrl1.toString());
			jsonObjectFullUrl1.addProperty("fullUrl", "Composition" + "/" + "1007DR1");

			com.google.gson.JsonObject jsonObjectFullUrl1Resource = new com.google.gson.JsonObject();
			jsonObjectFullUrl1Resource.addProperty("resourceType", "Composition");

			jsonObjectFullUrl1Resource.addProperty("status", "final");

			com.google.gson.JsonObject jsonTypeFullUrl1 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonTypeArray = new com.google.gson.JsonArray();

			com.google.gson.JsonObject jsonCodingFullUrl1 = new com.google.gson.JsonObject();
			jsonCodingFullUrl1.addProperty("system", "https://projecteka.in/sct");
			jsonCodingFullUrl1.addProperty("code", "721981007");
			jsonCodingFullUrl1.addProperty("display", "Diagnostic Report");
			jsonTypeArray.add(jsonCodingFullUrl1);
			jsonTypeFullUrl1.add("coding", jsonTypeArray);

			jsonTypeFullUrl1.addProperty("text", "Prescription record");

			jsonObjectFullUrl1Resource.add("type", jsonTypeFullUrl1);

			com.google.gson.JsonObject jsonObjectSubject1 = new com.google.gson.JsonObject();
			jsonObjectSubject1.addProperty("reference", "Patient/"+patientId2);

			jsonObjectFullUrl1Resource.add("subject", jsonObjectSubject1);

			com.google.gson.JsonArray attesterArray1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonattesterobj1 = new com.google.gson.JsonObject();
			jsonattesterobj1.addProperty("mode", "official");
			com.google.gson.JsonObject jsonpartyobj1 = new com.google.gson.JsonObject();
//			jsonpartyobj1.addProperty("display", "Max Super Speciality Hospital, Saket");
			jsonpartyobj1.addProperty("display", hospitalDetails.getHospitalName());
			
			jsonpartyobj1.addProperty("reference", "Organization/MaxSaket01");
			jsonattesterobj1.add("party", jsonpartyobj1);
			jsonattesterobj1.addProperty("time", currentDate);
			attesterArray1.add(jsonattesterobj1);

			jsonObjectFullUrl1Resource.add("attester", attesterArray1);

			com.google.gson.JsonArray authorArray1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonAuthorobj1 = new com.google.gson.JsonObject();
			jsonAuthorobj1.addProperty("reference", "Organization/MaxSaket01");
			com.google.gson.JsonObject jsonAuthorobj12 = new com.google.gson.JsonObject();
			jsonAuthorobj12.addProperty("reference", "Practitioner/DHID1234");
			authorArray1.add(jsonAuthorobj1);
			authorArray1.add(jsonAuthorobj12);

			jsonObjectFullUrl1Resource.add("author", authorArray1);

			jsonObjectFullUrl1Resource.addProperty("date", currentDate);

			com.google.gson.JsonObject jsonObjectEncounter11 = new com.google.gson.JsonObject();
			UUID uuidEncounter1 = UUID.randomUUID();
			jsonObjectEncounter11.addProperty("display", "OPD Visit - patient walked in");
			jsonObjectEncounter11.addProperty("reference", "Encounter" + "/" + uuidEncounter1.toString());

			jsonObjectFullUrl1Resource.add("encounter", jsonObjectEncounter11);

			jsonObjectFullUrl1Resource.addProperty("id", "1007DR1");

			com.google.gson.JsonObject jsonIdentifierFullUrl1 = new com.google.gson.JsonObject();
			jsonIdentifierFullUrl1.addProperty("system", "https://www.max.in/composition");
			jsonIdentifierFullUrl1.addProperty("value", "1007DR1");

			jsonObjectFullUrl1Resource.add("identifier", jsonIdentifierFullUrl1);

			jsonObjectFullUrl1Resource.addProperty("title", "Doc: Surgical Pathology Report");

			com.google.gson.JsonArray sectionArray1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject sectionObject1 = new com.google.gson.JsonObject();
			sectionObject1.addProperty("title", "Section - Diagnostic report: Surgical Pathology");

			com.google.gson.JsonObject sectioncode = new com.google.gson.JsonObject();
			com.google.gson.JsonArray secondcodeingArray = new com.google.gson.JsonArray();
			com.google.gson.JsonObject sectionCodeingObj = new com.google.gson.JsonObject();
			sectionCodeingObj.addProperty("system", "https://projecteka.in/sct");
			sectionCodeingObj.addProperty("code", "721981007");
			sectionCodeingObj.addProperty("display", "Diagnosti Report: Surgical Pathology");
			secondcodeingArray.add(sectionCodeingObj);
			sectioncode.add("coding", secondcodeingArray);

			sectionObject1.add("code", sectioncode);
			sectionArray1.add(sectionObject1);

			com.google.gson.JsonObject jsonObjecttext1 = new com.google.gson.JsonObject();
			jsonObjecttext1.addProperty("div",
					"<div xmlns=\"http://www.w3.org/1999/xhtml\">Diagnostic Report for Navjot Singh (RVH1002) </div>");

			jsonObjecttext1.addProperty("status", "generated");

			jsonObjectFullUrl1Resource.add("text", jsonObjecttext1);

			com.google.gson.JsonArray entryArray1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject entryObject1 = new com.google.gson.JsonObject();
			UUID uuidDiagnosticReport = UUID.randomUUID();
			entryObject1.addProperty("reference", "DiagnosticReport" + "/" + uuidDiagnosticReport.toString());
			entryArray1.add(entryObject1);

			sectionObject1.add("entry", entryArray1);

			jsonObjectFullUrl1Resource.add("section", sectionArray1);

			jsonObjectFullUrl1.add("resource", jsonObjectFullUrl1Resource);

			enrtyArray.add(jsonObjectFullUrl1);

			// first object end

			// object second start
			com.google.gson.JsonObject jsonObjectFullUrl9 = new com.google.gson.JsonObject();
			jsonObjectFullUrl9.addProperty("fullUrl", "Organization" + "/" + hospitalDetails.getInitials());

			com.google.gson.JsonObject resource9 = new com.google.gson.JsonObject();
			resource9.addProperty("resourceType", "Organization");
			resource9.addProperty("id", hospitalDetails.getInitials());
//			resource9.addProperty("name", "Max Super Speciality Hospital, Saket");
			resource9.addProperty("name",hospitalDetails.getHospitalName());

			com.google.gson.JsonArray addressArray8 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject address8 = new com.google.gson.JsonObject();
//			address8.addProperty("city", "New Delhi");
			address8.addProperty("city", hospitalDetails.getHospitalCity());
			address8.addProperty("country", "INDIA");

			com.google.gson.JsonArray line9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject de = new com.google.gson.JsonObject();
			de.addProperty("ar", hospitalDetails.getHospitalAddress());
			JsonElement jsonElement = de.get("ar");
			line9.add(jsonElement);
			address8.add("line", line9);
			address8.addProperty("postalCode", hospitalDetails.getHospitalZip());
			address8.addProperty("state", hospitalDetails.getHospitalState());
			addressArray8.add(address8);
			resource9.add("address", addressArray8);

			com.google.gson.JsonArray alias9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo = new com.google.gson.JsonObject();
			demo.addProperty("ar", hospitalDetails.getHospital_initial());
			JsonElement jsonElement1 = demo.get("ar");
			alias9.add(jsonElement1);
			resource9.add("alias", alias9);

			com.google.gson.JsonArray endpoint9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject endpointobj9 = new com.google.gson.JsonObject();
			endpointobj9.addProperty("display", "Website");
			endpointobj9.addProperty("reference",hospitalDetails.getWebsite());
			endpoint9.add(endpointobj9);

			resource9.add("endpoint", endpoint9);

			com.google.gson.JsonArray identifier9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonIdentifierFullUrl9 = new com.google.gson.JsonObject();
			jsonIdentifierFullUrl9.addProperty("system", "https://facilitysbx.ndhm.gov.in");
			jsonIdentifierFullUrl9.addProperty("value", "IN0410000183");
			identifier9.add(jsonIdentifierFullUrl9);
			resource9.add("identifier", identifier9);

			com.google.gson.JsonArray telecom9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsontelecomFullUrl9 = new com.google.gson.JsonObject();
			jsontelecomFullUrl9.addProperty("system", "phone");
			jsontelecomFullUrl9.addProperty("value", hospitalDetails.getHospitalContact());
			com.google.gson.JsonObject jsontelecomFullUrl91 = new com.google.gson.JsonObject();
			jsontelecomFullUrl91.addProperty("system", "fax");
			jsontelecomFullUrl91.addProperty("value",hospitalDetails.getHospitalFax());
			telecom9.add(jsontelecomFullUrl9);
			telecom9.add(jsontelecomFullUrl91);
			resource9.add("telecom", telecom9);

			jsonObjectFullUrl9.add("resource", resource9);

			enrtyArray.add(jsonObjectFullUrl9);

			// object second end
			// start second obj
			com.google.gson.JsonObject jsonObjectFullUrl2 = new com.google.gson.JsonObject();
			jsonObjectFullUrl2.addProperty("fullUrl", "Practitioner" + "/" + "DHID1234");

			com.google.gson.JsonObject resource2 = new com.google.gson.JsonObject();
			resource2.addProperty("resourceType", "Practitioner");
			resource2.addProperty("id", "DHID1234");

			com.google.gson.JsonArray identifier2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject identfier2Obj = new com.google.gson.JsonObject();
			identfier2Obj.addProperty("system", "http://mciindia.org/");
			identfier2Obj.addProperty("value", "2318");
			identifier2.add(identfier2Obj);

			resource2.add("identifier", identifier2);

			// get the doctor name
			String doctorname = "";
			String sql = "select doctor_id from ehat_treatment where patient_id=" + patientId + " ";
			SQLQuery sQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			String doctorIds = (String) sQuery.uniqueResult();
			String[] doctorArray = doctorIds.split(",");
			int docCount = 1;
			for (String doctorId : doctorArray) {
				String sqlDoctor = "select doc_name from doctor where Doctor_ID= '" + doctorId + "' ";
				SQLQuery sdocQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
				String docName = (String) sdocQuery.uniqueResult();
				if (docCount == 1) {
					doctorname = docName;
				} else {
					doctorname = doctorname + "," + docName;
				}
				docCount++;

			}
			
			Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
			
			createCriteria2.add(Restrictions.eq("doc_Type", "DOCTOR"));
			createCriteria2.add(Restrictions.eq("deleted", "N"));
			createCriteria2.add(Restrictions.eq("Doctor_ID", Integer.parseInt(doctorIds)));
			
			List<Doctor> doctors = createCriteria2.list();
			Doctor doctor = doctors.get(0);
			int hospitalSpecializetionId = Integer.parseInt(doctor.getSpecialisation());
			String doctorName = doctor.getDoc_name();
			String[] split = doctorName.split(" ");
			String prefix2=split[0];
			String[] prefixArr = prefix2.split("\\.");
			
			//fetch hospital specilization from doctor id
			Criteria createCriteria3 = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
			createCriteria3.add(Restrictions.eq("deleted", "N"));
			createCriteria3.add(Restrictions.eq("specialisationId", hospitalSpecializetionId));
			
			List<HospitalSpecialisationDto> specialisationDtos = createCriteria3.list();
			HospitalSpecialisationDto hospitalSpecialisationDto = specialisationDtos.get(0);
			//hospitalSpecialisationDto.getSpecializationName();
			
			// end doctor details

			com.google.gson.JsonArray name2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name2obj = new com.google.gson.JsonObject();
			// name2obj.addProperty("text", "Manju Sengar");
			name2obj.addProperty("text", split[1]+" "+split[3]);
			name2obj.addProperty("family", "Sengar");

			com.google.gson.JsonArray given = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo1 = new com.google.gson.JsonObject();
			demo1.addProperty("ar1", split[1]);
			JsonElement jsonElement2 = demo1.get("ar1");
			given.add(jsonElement2);

			com.google.gson.JsonArray prefix = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo2 = new com.google.gson.JsonObject();
			//demo2.addProperty("ar2", "Dr");
			demo2.addProperty("ar2", prefixArr[0]);
			JsonElement jsonElement3 = demo2.get("ar2");
			prefix.add(jsonElement3);

			com.google.gson.JsonArray suffix = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo3 = new com.google.gson.JsonObject();
			//demo3.addProperty("ar2", "MD");
			demo3.addProperty("ar2", hospitalSpecialisationDto.getSpecializationName());
			JsonElement jsonElement4 = demo3.get("ar2");
			suffix.add(jsonElement4);

			name2obj.add("given", given);
			name2obj.add("prefix", prefix);
			name2obj.add("suffix", suffix);
			name2.add(name2obj);

			resource2.add("name", name2);

			jsonObjectFullUrl2.add("resource", resource2);

			enrtyArray.add(jsonObjectFullUrl2);
			// end second obj

			// start third obj
			com.google.gson.JsonObject jsonObjectFullUrl3 = new com.google.gson.JsonObject();
			jsonObjectFullUrl3.addProperty("fullUrl", "Patient" + "/" + patientId2);//"RVH1002"

			com.google.gson.JsonObject resource3 = new com.google.gson.JsonObject();
			resource3.addProperty("resourceType", "Patient");
			resource3.addProperty("id", patientId2);

			com.google.gson.JsonArray identifier13 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonIdentifierFullUrl13 = new com.google.gson.JsonObject();
			jsonIdentifierFullUrl13.addProperty("system", "https://projecteka.in/PHRID");
			jsonIdentifierFullUrl13.addProperty("value", sandBoxPatientInfo.getEmailId());
			identifier13.add(jsonIdentifierFullUrl13);

			resource3.add("identifier", identifier13);

			com.google.gson.JsonArray name3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name3obj = new com.google.gson.JsonObject();
			name3obj.addProperty("text", patientName);
			name3.add(name3obj);

			resource3.add("name", name3);

			jsonObjectFullUrl3.add("resource", resource3);

			enrtyArray.add(jsonObjectFullUrl3);
			// end third obj

			// start fourth obj
			UUID uuidFullUrl4 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl4 = new com.google.gson.JsonObject();
			jsonObjectFullUrl4.addProperty("fullUrl", "Encounter" + "/" + uuidFullUrl4.toString());

			com.google.gson.JsonObject resource4 = new com.google.gson.JsonObject();
			resource4.addProperty("resourceType", "Encounter");
			resource4.addProperty("id", uuidFullUrl4.toString());
			resource4.addProperty("status", "finished");

			com.google.gson.JsonObject class4 = new com.google.gson.JsonObject();
			class4.addProperty("system", "http://terminology.hl7.org/CodeSystem/v3-ActCode");
			class4.addProperty("code", "AMB");
			class4.addProperty("display", "Outpatient visit");

			resource4.add("class", class4);

			com.google.gson.JsonObject subject4 = new com.google.gson.JsonObject();
			subject4.addProperty("reference", "Patient/"+patientId2);

			resource4.add("subject", subject4);

			com.google.gson.JsonObject period4 = new com.google.gson.JsonObject();
			period4.addProperty("end", currentDate);
			period4.addProperty("start", currentDate);

			resource4.add("period", period4);

			jsonObjectFullUrl4.add("resource", resource4);

			enrtyArray.add(jsonObjectFullUrl4);
			// end fourth obj

			// getting Dynamic Report
//			Criteria c = sessionFactory.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
//			c.add(Restrictions.eq("patientId", patientId));
//			c.add(Restrictions.eq("deleted", "N"));
//
//			List<SandBoxPatientDignosis> listdigno1 = c.list();
//
//			
//			System.out.println("digno====" + listdigno1);
//			for (SandBoxPatientDignosis pobj : listdigno1) {

				// start fifth obj

				com.google.gson.JsonObject jsonObjectFullUrl5 = new com.google.gson.JsonObject();
				jsonObjectFullUrl5.addProperty("fullUrl", "DiagnosticReport" + "/" + uuidDiagnosticReport.toString());

				com.google.gson.JsonObject resource5 = new com.google.gson.JsonObject();
				resource5.addProperty("resourceType", "DiagnosticReport");
				resource5.addProperty("id", uuidDiagnosticReport.toString());
				resource5.addProperty("status", "final");

				com.google.gson.JsonObject code5 = new com.google.gson.JsonObject();
				code5.addProperty("text", "Surgical Pathology Report");
				resource5.add("code", code5);

				com.google.gson.JsonObject subject5 = new com.google.gson.JsonObject();
				subject5.addProperty("display", patientName);
				subject5.addProperty("reference", "Patient/"+patientId2);
				resource5.add("subject", subject5);

				com.google.gson.JsonArray performer5Array = new com.google.gson.JsonArray();
				com.google.gson.JsonObject performer5obj = new com.google.gson.JsonObject();
				performer5obj.addProperty("reference", "Organization" + "/" + hospitalDetails.getInitials());
				performer5Array.add(performer5obj);
				resource5.add("performer", performer5Array);

				com.google.gson.JsonArray resultsInterpreter5Array = new com.google.gson.JsonArray();
				com.google.gson.JsonObject resultsInterpreter5obj = new com.google.gson.JsonObject();
				resultsInterpreter5obj.addProperty("reference", "Practitioner/DHID1234");
				resultsInterpreter5Array.add(resultsInterpreter5obj);
				resource5.add("resultsInterpreter", resultsInterpreter5Array);

				com.google.gson.JsonArray result5Array = new com.google.gson.JsonArray();
				com.google.gson.JsonObject result5obj = new com.google.gson.JsonObject();
				com.google.gson.JsonObject result51obj = new com.google.gson.JsonObject();
				UUID uuidFullUrl6 = UUID.randomUUID();
				
				
				result5obj.addProperty("reference", "Observation" + "/" + uuidFullUrl6.toString());
				UUID uuidFullUrl7 = UUID.randomUUID();
				result51obj.addProperty("reference", "Observation" + "/" + uuidFullUrl7.toString());
				result5Array.add(result5obj);
				result5Array.add(result51obj);
				resource5.add("result", result5Array);

				resource5.addProperty("effectiveDateTime", currentDate);
				resource5.addProperty("issued", (currentDate + 1 * 60 * 60 * 1000));

				com.google.gson.JsonArray media5Array = new com.google.gson.JsonArray();
				com.google.gson.JsonObject media5obj = new com.google.gson.JsonObject();
				media5obj.addProperty("comment", "X Ray");
				com.google.gson.JsonObject link5obj = new com.google.gson.JsonObject();
				UUID uuidFullUrl8 = UUID.randomUUID();
				link5obj.addProperty("reference", "Media" + "/" + uuidFullUrl8.toString());
				link5obj.addProperty("display", "Radiology: XRay PA View Chest");
				media5obj.add("link", link5obj);
				media5Array.add(media5obj);
				resource5.add("media", media5Array);

				resource5.addProperty("conclusion", "Refer to Doctor. To be correlated with further study");

				jsonObjectFullUrl5.add("resource", resource5);

				enrtyArray.add(jsonObjectFullUrl5);
				// end fifth obj


				
				for (CpoeServdetails pobj2 : tlistbiilall) {

					// start sixth obj
					int billDetailsId = pobj2.getBilldetailsid();
					
					//fetch lab test name/ result
					
					List<OpdPatientDetailsDto> lstOpdPatientDetailsDto = new ArrayList<OpdPatientDetailsDto>();
					OpdPatientDetailsDto obj = new OpdPatientDetailsDto();
					
					try {
						Query q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_patient_info_by_treatment_id(:treatmentId)");
						q.setParameter("treatmentId", treatmentDto2.getTreatmentId());
						q.setResultTransformer(Transformers.aliasToBean(OpdPatientDetailsDto.class));
						//obj = (OpdPatientDetailsDto) q.uniqueResult();
						lstOpdPatientDetailsDto = q.list();
						obj.setListOpdPatientDetailsDto(lstOpdPatientDetailsDto);

					} catch (Exception e) {
						e.printStackTrace();
					}
					//return obj;
					
					 String age = obj.getListOpdPatientDetailsDto().get(0).getPatient_age();
					 String[] ageArray = age.split("/");
					 String yearData=ageArray[0];
					 String year = yearData.replace("Y", "");
					 String monthData=ageArray[1];
					 String month = monthData.replace("M", "");
					 String daysData=ageArray[2];
					 String days = daysData.replace("D", "");
					 int ageIn=0;
					 int patientAge=0;
					 int year2 = Integer.parseInt(year);
					 int month2 = Integer.parseInt(month);
					 int day2 = Integer.parseInt(days);
					  if(year2 > 0){
						  patientAge=year2;
						  ageIn=1;
					  }else if(year2 == 0 && month2 > 0){
						  patientAge=month2;
						  ageIn=2;
					  }else {
						  patientAge=day2;
						  ageIn=3;
					  }
					
					int sexType=0;
					String gender = sandBoxPatientInfo.getGender();
					if(gender.equalsIgnoreCase("Male")) {
						sexType=1;
					}
					else if(gender.equalsIgnoreCase("Female")) {
						sexType=2;
					}
					
					
					
					List<OPDIPDLabTestResultDTO> lstOPDIPDLabtestresult = new ArrayList<OPDIPDLabTestResultDTO>();
					OPDIPDLabTestResultDTO obj1 = new OPDIPDLabTestResultDTO();
					
					try {
						Query q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_fetch_lis_result_on_opd_ipd_coversheet(:treatmentId,:billDetailsId,:fromAge,:toAge,:ageIn,:sexType)");
						q.setParameter("treatmentId", treatmentId);
						q.setParameter("billDetailsId", billDetailsId);
						q.setParameter("fromAge", year2);
						q.setParameter("toAge", year2);
						q.setParameter("ageIn", ageIn);
						q.setParameter("sexType", sexType);
						q.setResultTransformer(Transformers.aliasToBean(OPDIPDLabTestResultDTO.class));
						//obj = (OpdPatientDetailsDto) q.uniqueResult();
						lstOPDIPDLabtestresult = q.list();
						obj1.setLstOPDIPDLabtestresult(lstOPDIPDLabtestresult);

					} catch (Exception e) {
						e.printStackTrace();
					}
					

					com.google.gson.JsonObject jsonObjectFullUrl6 = new com.google.gson.JsonObject();
					jsonObjectFullUrl6.addProperty("fullUrl", "Observation" + "/" + uuidFullUrl6.toString());

					com.google.gson.JsonObject resource6 = new com.google.gson.JsonObject();
					resource6.addProperty("resourceType", "Observation");
					resource6.addProperty("id", uuidFullUrl6.toString());

					com.google.gson.JsonObject textReference6 = new com.google.gson.JsonObject();
					textReference6.addProperty("status", "additional");
					textReference6.addProperty("div", "<div xmlns=\"http://www.w3.org/1999/xhtml\"></div>");

					resource6.add("text", textReference6);
					resource6.addProperty("status", "final");

					com.google.gson.JsonObject code6 = new com.google.gson.JsonObject();
					code6.addProperty("text", pobj2.getCategoryName());

					resource6.add("code", code6);

					com.google.gson.JsonObject subject6 = new com.google.gson.JsonObject();
					subject6.addProperty("display", patientName);
					resource6.add("subject", subject6);

					com.google.gson.JsonArray performerArray6 = new com.google.gson.JsonArray();
					com.google.gson.JsonObject performerobj6 = new com.google.gson.JsonObject();
					performerobj6.addProperty("display", doctorname);

					performerArray6.add(performerobj6);

					resource6.add("performer", performerArray6);

					resource6.addProperty("valueString", "Correlate with Pathology Report");

					jsonObjectFullUrl6.add("resource", resource6);

					enrtyArray.add(jsonObjectFullUrl6);
					// end sixth obj

					// start Seven obj

//					com.google.gson.JsonObject jsonObjectFullUrl7 = new com.google.gson.JsonObject();
//					jsonObjectFullUrl7.addProperty("fullUrl", "Observation" + "/" + uuidFullUrl7.toString());
//
//					com.google.gson.JsonObject resource7 = new com.google.gson.JsonObject();
//					resource7.addProperty("resourceType", "Observation");
//					resource7.addProperty("id", uuidFullUrl7.toString());
//
//					com.google.gson.JsonObject textReference7 = new com.google.gson.JsonObject();
//					textReference7.addProperty("status", "additional");
//					textReference7.addProperty("div", "<div xmlns=\"http://www.w3.org/1999/xhtml\"></div>");
//
//					resource7.add("text", textReference7);
//					resource7.addProperty("status", "final");
//
//					com.google.gson.JsonObject code7 = new com.google.gson.JsonObject();
//					code7.addProperty("text", "Further investigation");
//
//					resource7.add("code", code7);
//
//					com.google.gson.JsonObject subject7 = new com.google.gson.JsonObject();
//					subject7.addProperty("display", "Navjot Singh");
//					resource7.add("subject", subject7);
//
//					com.google.gson.JsonArray performerArray7 = new com.google.gson.JsonArray();
//					com.google.gson.JsonObject performerobj7 = new com.google.gson.JsonObject();
//					performerobj7.addProperty("display", doctorname);
//
//					performerArray7.add(performerobj7);
//
//					resource7.add("performer", performerArray7);
//
//					jsonObjectFullUrl7.add("resource", resource7);
//
//					resource7.addProperty("valueString", "Correlate with Pathology Report");
//
//					enrtyArray.add(jsonObjectFullUrl7);
					// end Sevan obj
				}

					// start eight object
					com.google.gson.JsonObject jsonObjectFullUrl8 = new com.google.gson.JsonObject();
					jsonObjectFullUrl8.addProperty("fullUrl", "Media" + "/" + uuidFullUrl8.toString());

					com.google.gson.JsonObject resource8 = new com.google.gson.JsonObject();
					resource8.addProperty("resourceType", "Media");
					resource8.addProperty("id", uuidFullUrl8.toString());
					resource8.addProperty("status", "completed");

					com.google.gson.JsonObject content8 = new com.google.gson.JsonObject();
					content8.addProperty("contentType", "application/dicom");
					content8.addProperty("data", "AAAAAAAAAAAAAAAAAAAAAAAAAAAA");

					resource8.add("content", content8);
					resource8.addProperty("status", "final");

					jsonObjectFullUrl8.add("resource", resource8);

					enrtyArray.add(jsonObjectFullUrl8);
					// eight obj end

					// obj nine start
					// }

					jsonObject.add("entry", enrtyArray);
//				}
//			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("Main json obj=======" + jsonObject.toString());
		return jsonObject.toString();

	}

	@SuppressWarnings("unchecked")
	@Override
	public String immunizationData(Integer patientId, HttpServletRequest request) {

		LOG.info("Inside a Send Immunization Data ");
		HttpSession session = request.getSession(true);
//		String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");
//		Integer unitId = (Integer) session.getAttribute("uId");
		String hospitalHIPUnitId = "1";
		Integer unitId = 1;

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
			criteria.add(Restrictions.eq("sandboxIntegrationFlag", 'Y'));
			criteria.add(Restrictions.eq("hospitalUnitId", unitId));
			HospitalDetails hospitalDetails = (HospitalDetails) criteria.uniqueResult();

			if (hospitalDetails == null) {

				throw new RuntimeException("Hospital Details is null in dignostic report");
			}

			// get the doctor name
			String doctorname = "";
			String sql = "select doctor_id from ehat_treatment where patient_id=" + patientId + " ";
			SQLQuery sQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			String doctorIds = (String) sQuery.uniqueResult();
			String[] doctorArray = doctorIds.split(",");
			int docCount = 1;
			for (String doctorId : doctorArray) {
				String sqlDoctor = "select doc_name from doctor where Doctor_ID= '" + doctorId + "' ";
				SQLQuery sdocQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
				String docName = (String) sdocQuery.uniqueResult();
				if (docCount == 1) {
					doctorname = docName;
				} else {
					doctorname = doctorname + "," + docName;
				}
				docCount++;

			}

			Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(Doctor.class);

			createCriteria2.add(Restrictions.eq("doc_Type", "DOCTOR"));
			createCriteria2.add(Restrictions.eq("deleted", "N"));
			createCriteria2.add(Restrictions.eq("Doctor_ID", Integer.parseInt(doctorIds)));

			List<Doctor> doctors = createCriteria2.list();
			Doctor doctor = doctors.get(0);
			int hospitalSpecializetionId = Integer.parseInt(doctor.getSpecialisation());
			String[] split = doctor.getDoc_name().split("\\.");

			// fetch hospital specilization from doctor id
			Criteria createCriteria3 = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSpecialisationDto.class);
			createCriteria3.add(Restrictions.eq("deleted", "N"));
			createCriteria3.add(Restrictions.eq("specialisationId", hospitalSpecializetionId));

			List<HospitalSpecialisationDto> specialisationDtos = createCriteria3.list();
			HospitalSpecialisationDto hospitalSpecialisationDto = specialisationDtos.get(0);
			String specializationName = hospitalSpecialisationDto.getSpecializationName();

			// end doctor details
			
//			fetch tretment details from treatment table
			Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
			
			createCriteria.add(Restrictions.eq("patientId", patientId));
			List<RegistrationDto> list = createCriteria.list();
			RegistrationDto sandBoxPatientInfo = list.get(0);
			List<TreatmentDto> treatmentDto;
			TreatmentDto treatmentDto2= new TreatmentDto();
			if(list!=null) {
				treatmentDto = list.get(0).getListTreatment();
				
				//list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
				List<TreatmentDto> collect = treatmentDto.stream().filter(x->x.gettFlag().equalsIgnoreCase("Y")).collect(Collectors.toList());
				treatmentDto2 = collect.get(0);
			}
			
			Integer treatmentId = treatmentDto2.getTreatmentId();

//			fetach patient name from patient table

		//	List<RegistrationDto> patientRecordsbypatientId = regService.getPatientRecordsbypatientId(patientId);
		//	RegistrationDto sandBoxPatientInfo = patientRecordsbypatientId.get(0);

			String patientName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getlName();

			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String currentDate = instant.toString();

			// fetch lab result service name and test name

			List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();

			try {
				CpoeServdetails objCpoe = new CpoeServdetails();

				String fetchId = "";
				Calendar postDate = Calendar.getInstance();
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");

				int packageID = Integer.parseInt((String) resourceBundleEhat.getString("labHeadingID"));// 13
				int serviceId = Integer.parseInt((String) resourceBundleEhat.getString("packageID"));// 11
				int investigation = Integer.parseInt((String) resourceBundleEhat.getString("investigation"));// 12
				int casuality = Integer.parseInt((String) resourceBundleEhat.getString("casuality"));
				int physiotherapy = Integer.parseInt((String) resourceBundleEhat.getString("physiotherapy"));
				int otherservices = Integer.parseInt((String) resourceBundleEhat.getString("otherservices"));
				int radiationId = Integer.parseInt((String) resourceBundleEhat.getString("radiationId"));
				sql = "select a.bill_details_id AS bill_details_id, a.emrPer AS emrPer, a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel,a.speciality_id as speciality_id,a.sndtolabflag as sndtolabflag,a.template_wise as template_wise  from (((ehat_bill_details a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N' and a.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
						+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality
						+ "," + otherservices + "," + radiationId + ") and a.treatment_id='" + treatmentId
						+ "' order by a.bill_details_id desc";

				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				for (Map<String, Object> row : result) {
					CpoeServdetails obj = new CpoeServdetails();
					obj.setBilldetailsid((Integer) row.get("bill_details_id"));
					obj.setTreatmentid((Integer) row.get("treatment_id"));
					obj.setServiceid((Integer) row.get("service_id"));
					obj.setPaid_flag((String) row.get("paid_flag"));
					obj.setDoctor_id((Integer) row.get("doctor_id"));
					obj.setClinical_notes((String) row.get("clinical_notes"));
					obj.setInstructions((String) row.get("instructions"));
					obj.setServicename((String) row.get("service_name"));
					obj.setCategoryid((Integer) row.get("id"));
					obj.setCategoryName((String) row.get("category_name"));
					obj.setCategorycharges((Double) row.get("category_charges"));
					obj.setQuantity(((Double) row.get("quantity")).intValue());
					obj.setDocName((String) row.get("docName"));
					obj.setInserted_date_time((Date) row.get("created_date_time"));
					obj.setEmrPer((Double) row.get("emrPer"));
					obj.setRate((Double) row.get("rate"));
					obj.setDeleted((String) row.get("deleted"));
					obj.setCancel((String) row.get("cancel"));
					obj.setSpecialityId((Integer) row.get("speciality_id"));
					obj.setTemplate_wise((String) row.get("template_wise"));

					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

					obj.setCreated_date_time(sqlDate);
					obj.setSndtolabflag((String) row.get("sndtolabflag"));
					tlistbiilall.add(obj);
				}

			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}

			JSONObject jsonObject = new JSONObject();

			org.json.JSONArray enrtyArray = new org.json.JSONArray();

			jsonObject.put("resourceType", "Bundle");
			UUID uuid = UUID.randomUUID();
			jsonObject.put("id", uuid.toString());

			org.json.JSONObject jsonObjectMeta = new org.json.JSONObject();
			jsonObjectMeta.put("lastUpdated", currentDate);
			jsonObject.put("meta", jsonObjectMeta);

			org.json.JSONObject jsonObjectIdentifier = new org.json.JSONObject();
			jsonObjectIdentifier.put("system", "https://www.max.in/bundle");
			jsonObjectIdentifier.put("value", uuid.toString());

			jsonObject.put("identifier", jsonObjectIdentifier);
			jsonObject.put("type", "document");
			jsonObject.put("timestamp", currentDate);
			
			
			
			// start fifth obj DiagnosticReport
			
			List<String> uuidDiagnostic = new ArrayList<>();
			org.json.JSONObject jsonObjectFullUrl5=null;
			for (CpoeServdetails cpoeServdetails : tlistbiilall) {

				UUID uuidDiagnosticReport = UUID.randomUUID();
				jsonObjectFullUrl5 = new org.json.JSONObject();
				jsonObjectFullUrl5.put("fullUrl", "DiagnosticReport" + "/" + uuidDiagnosticReport.toString());
				uuidDiagnostic.add(uuidDiagnosticReport.toString());
				org.json.JSONObject resource5 = new org.json.JSONObject();
				resource5.put("resourceType", "DiagnosticReport");
				resource5.put("id", uuidDiagnosticReport.toString());
				resource5.put("status", "final");

				org.json.JSONArray codingArray = new org.json.JSONArray();
				org.json.JSONObject code5 = new org.json.JSONObject();
				org.json.JSONObject codingObject = new org.json.JSONObject();

				codingObject.put("code", "718-7");
				codingObject.put("display", cpoeServdetails.getCategoryName());
				codingObject.put("system", "https://projecteka.in/loinc");

				codingArray.put(codingObject);

				code5.put("coding", codingArray);
//							code5.put("text", "Complete Blood Count");
				resource5.put("code", code5);

				resource5.put("conclusion", "Refer to Doctor. To be correlated with further study.");

				resource5.put("id", uuidDiagnosticReport.toString());

				resource5.put("resourceType", "DiagnosticReport");
				resource5.put("id", uuidDiagnosticReport.toString());

				org.json.JSONArray resultsInterpreter = new org.json.JSONArray();
				JSONObject resultsInterpreterObj = new JSONObject();
				resultsInterpreterObj.put("reference", "Practitioner/MAX180414"); // id getting for Practitioner obj

				resultsInterpreter.put(resultsInterpreterObj);

				resource5.put("resultsInterpreter", resultsInterpreter);
				resource5.put("status", "final");
				jsonObjectFullUrl5.put("resource", resource5);
				
				enrtyArray.put(jsonObjectFullUrl5);
				
				// end fifth obj
			}
			
			// six objcet Observation

			UUID uuidObservation1 = UUID.randomUUID();

			org.json.JSONObject jsonObjectFullUrl6 = new org.json.JSONObject();
			jsonObjectFullUrl6.put("fullUrl", "Observation" + "/" + uuidObservation1.toString());

			org.json.JSONObject resource6 = new org.json.JSONObject();
			resource6.put("resourceType", "Observation");
			resource6.put("id", uuidObservation1.toString());

			resource6.put("status", "final");

			org.json.JSONObject code6 = new org.json.JSONObject();
			code6.put("text", "Temperature");

			resource6.put("code", code6);

			org.json.JSONObject valueQuantity = new org.json.JSONObject();
			valueQuantity.put("value", 99.5);
			valueQuantity.put("unit", "C");

			resource6.put("valueQuantity", valueQuantity);

			jsonObjectFullUrl6.put("resource", resource6);

			enrtyArray.put(jsonObjectFullUrl6);
			
			
			

			// seven obj Immunization

			List<ImmunizationPatientStatus> listImmunization = new ArrayList<ImmunizationPatientStatus>();
			try {
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(ImmunizationPatientStatus.class);
				criteria2.add(Restrictions.eq("patient_id", patientId));
				criteria2.add(Restrictions.eq("deleted", "N"));
				listImmunization = criteria2.list();
			} catch (Exception e) {

			}
			System.out.println(listImmunization);
			// ImmunizationPatientStatus immunizationPatient = listImmunization.get(0);

			List<String> uuidImmunization = new ArrayList<>();
			org.json.JSONObject immunization=null;
			for (ImmunizationPatientStatus immunizationPatient : listImmunization) {

				UUID immunizationId1 = UUID.randomUUID();
				immunization = new org.json.JSONObject();
				immunization.put("fullUrl", "Immunization" + "/" + immunizationId1.toString());
				uuidImmunization.add(immunizationId1.toString());
				org.json.JSONObject resource7 = new org.json.JSONObject();
				resource7.put("resourceType", "Immunization");
				resource7.put("id", immunizationId1.toString());

				resource7.put("status", immunizationPatient.getVaccinestatus());

				org.json.JSONObject vaccineCode = new org.json.JSONObject();

				vaccineCode.put("text", immunizationPatient.getVaccinename());
//							vaccineCode.put("text", "Rotavirus Vaccine");
				resource7.put("vaccineCode", vaccineCode);

				org.json.JSONObject patient = new org.json.JSONObject();
				patient.put("reference", "Patient/" + sandBoxPatientInfo.getPatientId().toString()); // patient
																										// obj
																										// RVH1012
				resource7.put("patient", patient);

				resource7.put("occurrenceDateTime", currentDate);

				org.json.JSONObject manufacturer = new org.json.JSONObject();
				manufacturer.put("reference", "Organization/" + hospitalHIPUnitId); // patient obj
				resource7.put("manufacturer", manufacturer);

				org.json.JSONObject route = new org.json.JSONObject();
				org.json.JSONArray codingArr = new org.json.JSONArray();
				org.json.JSONObject codingObj = new org.json.JSONObject();
				codingObj.put("system", "https://projecteka.in/sct");
				codingObj.put("code", "47625008");
				codingObj.put("display", " Intravenous route");

				codingArr.put(codingObj);
				route.put("coding", codingArr);

				resource7.put("route", route);

				org.json.JSONArray reasonReferenceArr = new org.json.JSONArray();

				if (uuidDiagnostic.size() != 0) {
					for (String uuidDiagnosticReport : uuidDiagnostic) {
						org.json.JSONObject reasonReferenceObj = new org.json.JSONObject();
						reasonReferenceObj.put("reference", "DiagnosticReport/" + uuidDiagnosticReport.toString()); // diagnosis
						reasonReferenceArr.put(reasonReferenceObj); // id
						//
					}
				}

				resource7.put("reasonReference", reasonReferenceArr);

				org.json.JSONArray reaction = new org.json.JSONArray();
				org.json.JSONObject reactionObj = new org.json.JSONObject();
				org.json.JSONObject detail = new org.json.JSONObject();
				detail.put("reference", "Observation/" + uuidObservation1.toString());// observation id ref
				reactionObj.put("detail", detail);
				reaction.put(reactionObj);

				resource7.put("reaction", reaction);

				org.json.JSONArray protocolApplied = new org.json.JSONArray();
				org.json.JSONObject protocolAppliedObj = new org.json.JSONObject();
				protocolAppliedObj.put("doseNumberPositiveInt", 2);

				protocolApplied.put(protocolAppliedObj);

				resource7.put("protocolApplied", protocolApplied);

				immunization.put("resource", resource7);
				
				enrtyArray.put(immunization);
				
			}
			// first composition object start

			org.json.JSONObject jsonObjectFullUrl1 = new org.json.JSONObject();
			UUID uuidFullUrl1 = UUID.randomUUID();
			jsonObjectFullUrl1.put("fullUrl", "Composition" + "/" + uuidFullUrl1.toString());

			org.json.JSONObject jsonObjectFullUrl1Resource = new org.json.JSONObject();
			jsonObjectFullUrl1Resource.put("resourceType", "Composition");
			jsonObjectFullUrl1Resource.put("id", uuidFullUrl1.toString());

			org.json.JSONObject jsonIdentifierFullUrl1 = new org.json.JSONObject();
			jsonIdentifierFullUrl1.put("system", "https://www.max.in/document");
			jsonIdentifierFullUrl1.put("value", uuidFullUrl1.toString());

			jsonObjectFullUrl1Resource.put("identifier", jsonIdentifierFullUrl1);
			jsonObjectFullUrl1Resource.put("status", "final");

			org.json.JSONObject jsonTypeFullUrl1 = new org.json.JSONObject();
			org.json.JSONArray jsonTypeArray = new org.json.JSONArray();

			org.json.JSONObject jsonCodingFullUrl1 = new org.json.JSONObject();
			jsonCodingFullUrl1.put("system", "https://projecteka.in/sct");
			jsonCodingFullUrl1.put("code", "440545006");
			jsonCodingFullUrl1.put("display", "Prescription record");
			jsonTypeArray.put(jsonCodingFullUrl1);
			jsonTypeFullUrl1.put("coding", jsonTypeArray);

			jsonObjectFullUrl1Resource.put("type", jsonTypeFullUrl1);

			org.json.JSONObject jsonObjectSubject1 = new org.json.JSONObject();
			jsonObjectSubject1.put("reference", "Patient/" + sandBoxPatientInfo.getPatientId().toString()); // "+sandBoxPatientInfo.getPatientId().toString()

			jsonObjectFullUrl1Resource.put("subject", jsonObjectSubject1);

			jsonObjectFullUrl1Resource.put("date", currentDate);

			org.json.JSONArray authorArray1 = new org.json.JSONArray();
			org.json.JSONObject jsonAuthorobj1 = new org.json.JSONObject();

			jsonAuthorobj1.put("mode", "official");
			jsonAuthorobj1.put("time", currentDate);

			org.json.JSONObject party = new org.json.JSONObject();
			party.put("reference", "Organization/" + hospitalHIPUnitId);
			party.put("display", hospitalDetails.getHospitalName());

			jsonAuthorobj1.put("party", party);
			authorArray1.put(jsonAuthorobj1);

			jsonObjectFullUrl1Resource.put("attester", authorArray1);
			jsonObjectFullUrl1Resource.put("title", "Prescription");

			org.json.JSONArray author = new org.json.JSONArray();
			org.json.JSONObject authorObj = new org.json.JSONObject();
//			authorObj.put("display", "Dr Lakshmi G");
			authorObj.put("display", doctorname);
			authorObj.put("reference", "Practitioner/MAX1456");
			author.put(authorObj);

			jsonObjectFullUrl1Resource.put("author", author);

			org.json.JSONArray sectionArray1 = new org.json.JSONArray();
			org.json.JSONObject sectionObject1 = new org.json.JSONObject();
			sectionObject1.put("title", "OPD Immunization");

			org.json.JSONObject sectioncode = new org.json.JSONObject();
			org.json.JSONArray secondcodeingArray = new org.json.JSONArray();
			org.json.JSONObject sectionCodeingObj = new org.json.JSONObject();
			sectionCodeingObj.put("system", "https://projecteka.in/sct");
			sectionCodeingObj.put("code", "440545006");
			sectionCodeingObj.put("display", "Prescription record");
			secondcodeingArray.put(sectionCodeingObj);
			sectioncode.put("coding", secondcodeingArray);

			sectionObject1.put("code", sectioncode);
			sectionArray1.put(sectionObject1);

			org.json.JSONArray entryArray1 = new org.json.JSONArray();
			org.json.JSONObject entryObject1 = new org.json.JSONObject();
			org.json.JSONObject entryObject2 = new org.json.JSONObject();
			// UUID immunizationId1 = UUID.randomUUID();
			//UUID immunizationId2 = UUID.randomUUID();
			if(uuidImmunization.size()!=0) {
				
				for (String string : uuidImmunization) {
					
					entryObject2.put("reference", "Immunizations" + "/" + string);
				}
				
			}
			// entryObject1.put("reference", "Immunizations" + "/" + immunizationId1);
			

			entryArray1.put(entryObject1);
			//entryArray1.put(entryObject2);

			sectionObject1.put("entry", entryArray1);

			jsonObjectFullUrl1Resource.put("section", sectionArray1);

			jsonObjectFullUrl1.put("resource", jsonObjectFullUrl1Resource);

			enrtyArray.put(jsonObjectFullUrl1);

			// start second obj Practitioner
			org.json.JSONObject jsonObjectFullUrl2 = new org.json.JSONObject();
			jsonObjectFullUrl2.put("fullUrl", "Practitioner/MAX180414");

			org.json.JSONObject resource2 = new org.json.JSONObject();
			resource2.put("resourceType", "Practitioner");
			resource2.put("id", "MAX180414");

			org.json.JSONArray identifier2 = new org.json.JSONArray();
			org.json.JSONObject identfier2Obj = new org.json.JSONObject();
			identfier2Obj.put("system", "https://www.mciindia.in/doctor");
			identfier2Obj.put("value", "MAX180414");
			identifier2.put(identfier2Obj);

			resource2.put("identifier", identifier2);

			org.json.JSONArray name2 = new org.json.JSONArray();
			org.json.JSONObject name2obj = new org.json.JSONObject();
//			name2obj.put("text", "Lakshmi G");
			name2obj.put("text", split[1]);

			org.json.JSONArray prefix = new org.json.JSONArray();
//			prefix.put("Dr");
			prefix.put(split[0]);

			org.json.JSONArray suffix = new org.json.JSONArray();
//			suffix.put("MBBS");
			suffix.put(specializationName);

			name2obj.put("prefix", prefix);
			name2obj.put("suffix", suffix);
			name2.put(name2obj);

			resource2.put("name", name2);

			jsonObjectFullUrl2.put("resource", resource2);

			enrtyArray.put(jsonObjectFullUrl2);

			// start third obj patient

			org.json.JSONObject jsonObjectFullUrl3 = new org.json.JSONObject();
			jsonObjectFullUrl3.put("fullUrl", "Patient/" + sandBoxPatientInfo.getPatientId().toString());// RVH1012

			org.json.JSONObject resource3 = new org.json.JSONObject();
			resource3.put("resourceType", "Patient");
			resource3.put("id", sandBoxPatientInfo.getPatientId().toString());
			resource3.put("gender", sandBoxPatientInfo.getGender());

			org.json.JSONArray name3 = new org.json.JSONArray();
			org.json.JSONObject name3obj = new org.json.JSONObject();
//			name3obj.put("text", "Kabir Singh");
			name3obj.put("text", patientName);
			name3.put(name3obj);

			resource3.put("name", name3);

			jsonObjectFullUrl3.put("resource", resource3);

			enrtyArray.put(jsonObjectFullUrl3);

			// start fourth object Organization
			org.json.JSONObject jsonObjectFullUrl4 = new org.json.JSONObject();
			jsonObjectFullUrl4.put("fullUrl", "Organization" + "/" + hospitalHIPUnitId);

			org.json.JSONObject resource9 = new org.json.JSONObject();
			resource9.put("resourceType", "Organization");
			resource9.put("id", hospitalHIPUnitId);
			resource9.put("name", hospitalDetails.getHospitalName());

			org.json.JSONArray addressArray8 = new org.json.JSONArray();
			org.json.JSONObject address8 = new org.json.JSONObject();
			address8.put("city", hospitalDetails.getHospitalCity());
			address8.put("country", "INDIA");

			org.json.JSONArray line9 = new org.json.JSONArray();
			line9.put(hospitalDetails.getHospitalAddress());
			address8.put("line", line9);
			address8.put("postalCode", hospitalDetails.getHospitalZip());
			address8.put("state", hospitalDetails.getHospitalState());
			addressArray8.put(address8);
			resource9.put("address", addressArray8);

			org.json.JSONArray alias9 = new org.json.JSONArray();
//			alias9.put(hospitalDetails.getHospital_initial());
			alias9.put(hospitalDetails.getInitialsName());
			resource9.put("alias", alias9);

			org.json.JSONArray endpoint9 = new org.json.JSONArray();
			org.json.JSONObject endpointobj9 = new org.json.JSONObject();
			endpointobj9.put("display", "Website");
			endpointobj9.put("reference", hospitalDetails.getWebsite());
			endpoint9.put(endpointobj9);

			resource9.put("endpoint", endpoint9);

			org.json.JSONArray identifier9 = new org.json.JSONArray();
			org.json.JSONObject jsonIdentifierFullUrl9 = new org.json.JSONObject();
			jsonIdentifierFullUrl9.put("system", "https://facilitysbx.ndhm.gov.in");
			jsonIdentifierFullUrl9.put("value", "IN0410000183");
			identifier9.put(jsonIdentifierFullUrl9);
			resource9.put("identifier", identifier9);

			org.json.JSONArray telecom9 = new org.json.JSONArray();
			org.json.JSONObject jsontelecomFullUrl9 = new org.json.JSONObject();
			jsontelecomFullUrl9.put("system", "phone");
//			jsontelecomFullUrl9.put("value", "(+91) 011-2651-5050");
			jsontelecomFullUrl9.put("value", hospitalDetails.getHospitalContact());
			org.json.JSONObject jsontelecomFullUrl91 = new org.json.JSONObject();
			jsontelecomFullUrl91.put("system", "fax");
//			jsontelecomFullUrl91.put("value", "(+91) 011-2651-5051");
			jsontelecomFullUrl91.put("value", hospitalDetails.getHospitalFax());
			telecom9.put(jsontelecomFullUrl9);
			telecom9.put(jsontelecomFullUrl91);
			resource9.put("telecom", telecom9);

			jsonObjectFullUrl4.put("resource", resource9);

			enrtyArray.put(jsonObjectFullUrl4);
			
			
			

			
			

			

			// start eight object Organization
			/*
			 * org.json.JSONObject jsonObjectFullUrl8 = new org.json.JSONObject();
			 * jsonObjectFullUrl8.put("fullUrl", "Organization" + "/" + hospitalHIPUnitId);
			 * 
			 * org.json.JSONObject resource8 = new org.json.JSONObject();
			 * resource8.put("resourceType", "Organization"); resource8.put("id",
			 * hospitalHIPUnitId); resource8.put("name", hospitalDetails.getHospitalName());
			 * 
			 * org.json.JSONArray addressArray9 = new org.json.JSONArray();
			 * org.json.JSONObject address9 = new org.json.JSONObject();
			 * address9.put("city", hospitalDetails.getHospitalCity());
			 * address9.put("country", "INDIA");
			 * 
			 * org.json.JSONArray line7 = new org.json.JSONArray();
			 * line7.put(hospitalDetails.getHospitalAddress()); address9.put("line", line7);
			 * address9.put("postalCode", hospitalDetails.getHospitalZip());
			 * address9.put("state", hospitalDetails.getHospitalState());
			 * addressArray9.put(address9); resource8.put("address", addressArray9);
			 * 
			 * org.json.JSONArray alias10 = new org.json.JSONArray();
			 * alias10.put(hospitalDetails.getInitialsName()); resource8.put("alias",
			 * alias10);
			 * 
			 * org.json.JSONArray endpoint10 = new org.json.JSONArray(); org.json.JSONObject
			 * endpointobj10 = new org.json.JSONObject(); endpointobj10.put("display",
			 * "Website"); endpointobj10.put("reference",
			 * "https://www.max.in/hospital-network/max-super-speciality-hospital-saket");
			 * endpoint10.put(endpointobj10);
			 * 
			 * resource8.put("endpoint", endpoint10);
			 * 
			 * // org.json.JSONArray identifier10 = new org.json.JSONArray(); //
			 * org.json.JSONObject jsonIdentifierFullUrl10 = new org.json.JSONObject(); //
			 * jsonIdentifierFullUrl10.put("system", "https://facilitysbx.ndhm.gov.in"); //
			 * jsonIdentifierFullUrl10.put("value", "IN0410000183"); //
			 * identifier10.put(jsonIdentifierFullUrl10); // resource8.put("identifier",
			 * identifier10);
			 * 
			 * org.json.JSONArray telecom10 = new org.json.JSONArray(); org.json.JSONObject
			 * jsontelecomFullUrl10 = new org.json.JSONObject();
			 * jsontelecomFullUrl10.put("system", "phone");
			 * jsontelecomFullUrl10.put("value", hospitalDetails.getHospitalContact());
			 * org.json.JSONObject jsontelecomFullUrl11 = new org.json.JSONObject();
			 * jsontelecomFullUrl11.put("system", "fax"); jsontelecomFullUrl11.put("value",
			 * hospitalDetails.getHospitalFax()); telecom10.put(jsontelecomFullUrl10);
			 * telecom10.put(jsontelecomFullUrl11); resource8.put("telecom", telecom10);
			 * 
			 * jsonObjectFullUrl8.put("resource", resource8);
			 * 
			 * enrtyArray.put(jsonObjectFullUrl8);
			 * 
			 * // start fifth obj DiagnosticReport2
			 * 
			 * UUID uuidDiagnosticReport2 = UUID.randomUUID(); org.json.JSONObject
			 * jsonObjectFullUrl12 = new org.json.JSONObject();
			 * jsonObjectFullUrl12.put("fullUrl", "DiagnosticReport" + "/" +
			 * uuidDiagnosticReport2.toString());
			 * 
			 * org.json.JSONObject resource12 = new org.json.JSONObject();
			 * resource12.put("resourceType", "DiagnosticReport"); resource12.put("id",
			 * uuidDiagnosticReport2.toString()); resource12.put("status", "final");
			 * 
			 * org.json.JSONArray codingArray2 = new org.json.JSONArray();
			 * org.json.JSONObject code12 = new org.json.JSONObject(); org.json.JSONObject
			 * codingObject12 = new org.json.JSONObject();
			 * 
			 * codingObject12.put("code", "58410-2"); codingObject12.put("display",
			 * "Complete Blood Count"); codingObject12.put("system",
			 * "https://projecteka.in/loinc");
			 * 
			 * codingArray2.put(codingObject12);
			 * 
			 * code12.put("coding", codingArray2); code12.put("text",
			 * "Complete Blood Count"); resource12.put("code", code12);
			 * 
			 * resource12.put("conclusion",
			 * "Refer to Doctor. To be correlated with further study.");
			 * 
			 * resource12.put("id", uuidDiagnosticReport2.toString());
			 * 
			 * resource12.put("resourceType", "DiagnosticReport"); resource12.put("id",
			 * uuidDiagnosticReport2.toString());
			 * 
			 * org.json.JSONArray resultsInterpreter2 = new org.json.JSONArray(); JSONObject
			 * resultsInterpreterObj2 = new JSONObject();
			 * resultsInterpreterObj2.put("reference", "Practitioner/MAX180414"); // id
			 * getting for Practitioner obj
			 * 
			 * resultsInterpreter2.put(resultsInterpreterObj2);
			 * 
			 * resource12.put("resultsInterpreter", resultsInterpreter2);
			 * resource12.put("status", "final"); jsonObjectFullUrl12.put("resource",
			 * resource12);
			 * 
			 * enrtyArray.put(jsonObjectFullUrl12); // end fifth obj
			 * 
			 * // six objcet Observation2
			 * 
			 * UUID observationUUID2 = UUID.randomUUID();
			 * 
			 * org.json.JSONObject jsonObjectFullUrl4 = new org.json.JSONObject();
			 * jsonObjectFullUrl4.put("fullUrl", "Observation" + "/" +
			 * observationUUID2.toString());
			 * 
			 * org.json.JSONObject resource13 = new org.json.JSONObject();
			 * resource13.put("resourceType", "Observation"); resource13.put("id",
			 * observationUUID2.toString());
			 * 
			 * resource13.put("status", "final");
			 * 
			 * org.json.JSONObject code13 = new org.json.JSONObject(); code13.put("text",
			 * "Temperature");
			 * 
			 * resource13.put("code", code13);
			 * 
			 * org.json.JSONObject valueQuantity2 = new org.json.JSONObject();
			 * valueQuantity2.put("value", 99.5); valueQuantity2.put("unit", "C");
			 * 
			 * resource13.put("valueQuantity", valueQuantity2);
			 * 
			 * jsonObjectFullUrl4.put("resource", resource13);
			 * 
			 * enrtyArray.put(jsonObjectFullUrl4);
			 * 
			 * // seven obj Immunization 2 // UUID uuidFullUrl18 = UUID.randomUUID();
			 * 
			 * org.json.JSONObject immunization2 = new org.json.JSONObject();
			 * immunization2.put("fullUrl", "Immunization" + "/" +
			 * immunizationId2.toString());
			 * 
			 * org.json.JSONObject resource18 = new org.json.JSONObject();
			 * resource18.put("resourceType", "Immunization"); resource18.put("id",
			 * immunizationId2.toString()); resource18.put("lotNumber", "5R1UCLO");
			 * 
			 * resource18.put("status", "completed");
			 * 
			 * org.json.JSONObject vaccineCode2 = new org.json.JSONObject();
			 * org.json.JSONArray coding = new org.json.JSONArray(); org.json.JSONObject
			 * codingObj2 = new org.json.JSONObject(); codingObj2.put("code", "J07AM01");
			 * codingObj2.put("display", "Tetanus Toxoid"); codingObj2.put("system",
			 * "https://projecteka.in/act");
			 * 
			 * coding.put(codingObj2);
			 * 
			 * vaccineCode2.put("coding", coding); resource18.put("vaccineCode",
			 * vaccineCode2);
			 * 
			 * org.json.JSONObject patient2 = new org.json.JSONObject();
			 * patient2.put("reference",
			 * "Patient/"+sandBoxPatientInfo.getPatientId().toString()); // patient obj
			 * RVH1012 resource18.put("patient", patient2);
			 * 
			 * resource18.put("occurrenceDateTime", currentDate);
			 * 
			 * org.json.JSONObject manufacturer2 = new org.json.JSONObject();
			 * manufacturer2.put("reference", "Organization/MaxSaket01"); // patient obj
			 * resource18.put("manufacturer", manufacturer2);
			 * 
			 * org.json.JSONObject route2 = new org.json.JSONObject(); org.json.JSONArray
			 * codingArr2 = new org.json.JSONArray(); org.json.JSONObject codingObj3 = new
			 * org.json.JSONObject(); codingObj3.put("system", "https://projecteka.in/sct");
			 * codingObj3.put("code", "47625008"); codingObj3.put("display",
			 * " Intravenous route");
			 * 
			 * codingArr2.put(codingObj3); route2.put("coding", codingArr2);
			 * 
			 * resource18.put("route", route2);
			 * 
			 * org.json.JSONArray reasonReferenceArr2 = new org.json.JSONArray();
			 * org.json.JSONObject reasonReferenceObj2 = new org.json.JSONObject();
			 * reasonReferenceObj2.put("reference", "DiagnosticReport/" +
			 * uuidDiagnosticReport2.toString());
			 * 
			 * reasonReferenceArr2.put(reasonReferenceObj2);
			 * 
			 * resource18.put("reasonReference", reasonReferenceArr2);
			 * 
			 * org.json.JSONArray reaction2 = new org.json.JSONArray(); org.json.JSONObject
			 * reactionObj2 = new org.json.JSONObject(); org.json.JSONObject detail2 = new
			 * org.json.JSONObject(); detail2.put("reference", "Observation/" +
			 * observationUUID2.toString()); reactionObj2.put("detail", detail2);
			 * reaction2.put(reactionObj2);
			 * 
			 * resource18.put("reaction", reaction2);
			 * 
			 * org.json.JSONArray protocolApplied2 = new org.json.JSONArray();
			 * org.json.JSONObject protocolAppliedObj2 = new org.json.JSONObject();
			 * protocolAppliedObj2.put("doseNumberString", "2nd");
			 * 
			 * protocolApplied2.put(protocolAppliedObj2);
			 * 
			 * resource18.put("protocolApplied", protocolApplied2);
			 * 
			 * immunization2.put("resource", resource18); enrtyArray.put(immunization2);
			 */

			jsonObject.put("entry", enrtyArray);

			return jsonObject.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@Override
	public String wellnessReportData(Integer patientId) {

		LOG.info("Inside a Send wellness report Data ");
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		
		//fetch hospital details
		
		Integer unitId=1;
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
		criteria.add(Restrictions.eq("sandboxIntegrationFlag", 'Y'));
		criteria.add(Restrictions.eq("hospitalUnitId", unitId));
		HospitalDetails hospitalDetails = (HospitalDetails) criteria.uniqueResult();

		if (hospitalDetails == null) {

			throw new RuntimeException("Hospital Details is null in dignostic report");
		}
		
		// get the doctor name
				String doctorname = "";
				String sql = "select doctor_id from ehat_treatment where patient_id=" + patientId + " ";
				SQLQuery sQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String doctorIds = (String) sQuery.uniqueResult();
				String[] doctorArray = doctorIds.split(",");
				int docCount = 1;
				for (String doctorId : doctorArray) {
					String sqlDoctor = "select doc_name from doctor where Doctor_ID= '" + doctorId + "' ";
					SQLQuery sdocQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
					String docName = (String) sdocQuery.uniqueResult();
					if (docCount == 1) {
						doctorname = docName;
					} else {
						doctorname = doctorname + "," + docName;
					}
					docCount++;

				}
				
				Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
				
				createCriteria2.add(Restrictions.eq("doc_Type", "DOCTOR"));
				createCriteria2.add(Restrictions.eq("deleted", "N"));
				createCriteria2.add(Restrictions.eq("Doctor_ID", doctorIds));
				
				List<Doctor> doctors = createCriteria2.list();
				Doctor doctor = doctors.get(0);
				int hospitalSpecializetionId = Integer.parseInt(doctor.getSpecialisation());
				String[] split = doctor.getDoc_name().split(".");
				
				//fetch hospital specilization from doctor id
				Criteria createCriteria3 = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
				createCriteria3.add(Restrictions.eq("deleted", "N"));
				createCriteria3.add(Restrictions.eq("specialisationId", hospitalSpecializetionId));
				
				List<HospitalSpecialisationDto> specialisationDtos = createCriteria3.list();
				HospitalSpecialisationDto hospitalSpecialisationDto = specialisationDtos.get(0);
				String specializationName = hospitalSpecialisationDto.getSpecializationName();		
				// end doctor details
		
//		 fetach patient name from patient table

		List<RegistrationDto> patientRecordsbypatientId = regService.getPatientRecordsbypatientId(patientId);
		RegistrationDto sandBoxPatientInfo=patientRecordsbypatientId.get(0);
		
		String patientName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getlName();

		org.json.JSONObject jsonObject = new org.json.JSONObject();

		try {
			jsonObject.put("resourceType", "Bundle");
			UUID uuid = UUID.randomUUID();
			jsonObject.put("id", uuid.toString());

			org.json.JSONObject jsonObjectMeta = new org.json.JSONObject();
			jsonObjectMeta.put("lastUpdated", currentDate);
			jsonObject.put("meta", jsonObjectMeta);

			org.json.JSONObject jsonObjectIdentifier = new org.json.JSONObject();
			jsonObjectIdentifier.put("system", "https://www.max.in/bundle");
			jsonObjectIdentifier.put("value", uuid.toString());

			jsonObject.put("identifier", jsonObjectIdentifier);
			jsonObject.put("type", "document");
			jsonObject.put("timestamp", currentDate);

			org.json.JSONArray enrtyArray = new org.json.JSONArray();

			// first object start
			org.json.JSONObject jsonObjectFullUrl1 = new org.json.JSONObject();
			UUID uuidFullUrl1 = UUID.randomUUID();
			jsonObjectFullUrl1.put("fullUrl", "Composition" + "/" + uuidFullUrl1.toString());

			org.json.JSONObject jsonObjectFullUrl1Resource = new org.json.JSONObject();
			jsonObjectFullUrl1Resource.put("resourceType", "Composition");
			jsonObjectFullUrl1Resource.put("id", uuidFullUrl1.toString());

			org.json.JSONObject jsonIdentifierFullUrl1 = new org.json.JSONObject();
			jsonIdentifierFullUrl1.put("system", "https://www.max.in/document");
			jsonIdentifierFullUrl1.put("value", uuidFullUrl1.toString());

			jsonObjectFullUrl1Resource.put("identifier", jsonIdentifierFullUrl1);
			jsonObjectFullUrl1Resource.put("status", "final");

			org.json.JSONObject jsonTypeFullUrl1 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray = new org.json.JSONArray();

			org.json.JSONObject jsonCodingFullUrl1 = new org.json.JSONObject();
			jsonCodingFullUrl1.put("system", "https://projecteka.in/sct");
			jsonCodingFullUrl1.put("display", "Wellness Record");
			jsonCodingArray.put(jsonCodingFullUrl1);
			jsonTypeFullUrl1.put("coding", jsonCodingArray);
			jsonObjectFullUrl1Resource.put("type", jsonTypeFullUrl1);

			org.json.JSONObject jsonObjectSubject1 = new org.json.JSONObject();
			jsonObjectSubject1.put("reference", "Patient" + "/" + sandBoxPatientInfo.getPatientId().toString());
			jsonObjectFullUrl1Resource.put("subject", jsonObjectSubject1);

			org.json.JSONObject jsonObjectEncounter11 = new org.json.JSONObject();
			UUID uuidEncounter1 = UUID.randomUUID();
			jsonObjectEncounter11.put("reference", "Encounter" + "/" + uuidEncounter1.toString());
			jsonObjectFullUrl1Resource.put("encounter", jsonObjectEncounter11);

			jsonObjectFullUrl1Resource.put("date", currentDate);

			org.json.JSONArray authorArray1 = new org.json.JSONArray();
			org.json.JSONObject jsonAuthorobj1 = new org.json.JSONObject();
			jsonAuthorobj1.put("display", doctorname);
			jsonAuthorobj1.put("reference", "Practitioner" + "/" + "MAX5001");
			authorArray1.put(jsonAuthorobj1);

			jsonObjectFullUrl1Resource.put("author", authorArray1);
			jsonObjectFullUrl1Resource.put("title", "Wellness Record");

			org.json.JSONArray attesterArray1 = new org.json.JSONArray();
			org.json.JSONObject jsonattesterobj1 = new org.json.JSONObject();
			jsonattesterobj1.put("mode", "official");
			org.json.JSONObject jsonpartyobj1 = new org.json.JSONObject();
			jsonpartyobj1.put("display", hospitalDetails.getHospitalName());
			jsonpartyobj1.put("reference", "Organization" + "/" + "MaxSaket01");
			jsonattesterobj1.put("party", jsonpartyobj1);
			jsonattesterobj1.put("time", currentDate);
			attesterArray1.put(jsonattesterobj1);
			jsonObjectFullUrl1Resource.put("attester", attesterArray1);

			org.json.JSONArray sectionArray1 = new org.json.JSONArray();
			org.json.JSONObject sectionObject1 = new org.json.JSONObject();
			sectionObject1.put("title", "Vital Signs");

			org.json.JSONObject entryobj = new org.json.JSONObject();
			org.json.JSONArray entryArray = new org.json.JSONArray();
			UUID uuidObservation1 = UUID.randomUUID();
			entryobj.put("reference", "Observation" + "/" + uuidObservation1.toString());
			entryArray.put(entryobj);
			sectionObject1.put("entry", entryArray);
			sectionArray1.put(sectionObject1);

			org.json.JSONObject sectionObject2 = new org.json.JSONObject();
			org.json.JSONObject entryobj2 = new org.json.JSONObject();
			org.json.JSONArray entryArray2 = new org.json.JSONArray();
			UUID uuidObservation2 = UUID.randomUUID();
			entryobj2.put("reference", "Observation" + "/" + uuidObservation2.toString());
			UUID uuidObservation3 = UUID.randomUUID();
			org.json.JSONObject entryobj22 = new org.json.JSONObject();
			entryobj22.put("reference", "Observation" + "/" + uuidObservation3.toString());
			entryArray2.put(entryobj2);
			entryArray2.put(entryobj22);
			sectionObject2.put("entry", entryArray2);
			sectionObject2.put("title", "Body Measurement");
			sectionArray1.put(sectionObject2);

			org.json.JSONObject sectionObject3 = new org.json.JSONObject();
			org.json.JSONObject entryobj3 = new org.json.JSONObject();
			org.json.JSONArray entryArray3 = new org.json.JSONArray();
			UUID uuidObservation4 = UUID.randomUUID();
			entryobj3.put("reference", "Observation" + "/" + uuidObservation4.toString());
			UUID uuidObservation5 = UUID.randomUUID();
			org.json.JSONObject entryobj32 = new org.json.JSONObject();
			entryobj32.put("reference", "Observation" + "/" + uuidObservation5.toString());
			entryArray3.put(entryobj3);
			entryArray3.put(entryobj32);
			sectionObject3.put("title", "General Assessment");
			sectionObject3.put("entry", entryArray3);
			sectionArray1.put(sectionObject3);

			org.json.JSONObject sectionObject4 = new org.json.JSONObject();
			org.json.JSONObject entryobj4 = new org.json.JSONObject();
			org.json.JSONArray entryArray4 = new org.json.JSONArray();
			UUID uuidObservation55 = UUID.randomUUID();
			entryobj4.put("reference", "Observation" + "/" + uuidObservation55.toString());
			entryArray4.put(entryobj4);
			sectionObject4.put("entry", entryArray4);
			sectionObject4.put("title", "Physical Activity");
			sectionArray1.put(sectionObject4);

			org.json.JSONObject sectionObject5 = new org.json.JSONObject();
			org.json.JSONObject entryobj5 = new org.json.JSONObject();
			org.json.JSONArray entryArray5 = new org.json.JSONArray();
			UUID uuidObservation56 = UUID.randomUUID();
			entryobj5.put("reference", "Observation" + "/" + uuidObservation56.toString());
			entryArray5.put(entryobj5);
			sectionObject5.put("entry", entryArray5);
			sectionObject5.put("title", "Women Health");
			sectionArray1.put(sectionObject5);

			org.json.JSONObject sectionObject6 = new org.json.JSONObject();
			org.json.JSONObject entryobj6 = new org.json.JSONObject();
			org.json.JSONArray entryArray6 = new org.json.JSONArray();
			UUID uuidObservation57 = UUID.randomUUID();
			entryobj6.put("reference", "Observation" + "/" + uuidObservation57.toString());
			entryArray6.put(entryobj6);
			sectionObject6.put("entry", entryArray6);
			sectionObject6.put("title", "Lifestyle");
			sectionArray1.put(sectionObject6);

			org.json.JSONObject sectionObject7 = new org.json.JSONObject();
			org.json.JSONObject entryobj7 = new org.json.JSONObject();
			org.json.JSONArray entryArray7 = new org.json.JSONArray();
			UUID uuidDocumentReference = UUID.randomUUID();
			entryobj7.put("reference", "DocumentReference" + "/" + uuidDocumentReference.toString());
			entryArray7.put(entryobj7);
			sectionObject7.put("entry", entryArray7);
			sectionObject7.put("title", "Document Reference");
			sectionArray1.put(sectionObject7);

			jsonObjectFullUrl1Resource.put("section", sectionArray1);
			jsonObjectFullUrl1.put("resource", jsonObjectFullUrl1Resource);
			enrtyArray.put(jsonObjectFullUrl1);
			// first object end

			// start second obj
			org.json.JSONObject jsonObjectFullUrl2 = new org.json.JSONObject();
			jsonObjectFullUrl2.put("fullUrl", "Practitioner" + "/" + "MAX5001");

			org.json.JSONObject resource2 = new org.json.JSONObject();
			resource2.put("resourceType", "Practitioner");
			resource2.put("id", "MAX5001");

			org.json.JSONArray identifier2 = new org.json.JSONArray();
			org.json.JSONObject identfier2Obj = new org.json.JSONObject();
			identfier2Obj.put("system", "https://www.mciindia.in/doctor");
			identfier2Obj.put("value", "MAX5001");
			identifier2.put(identfier2Obj);

			resource2.put("identifier", identifier2);

			org.json.JSONArray name2 = new org.json.JSONArray();
			org.json.JSONObject name2obj = new org.json.JSONObject();
			name2obj.put("text", doctorname);

			org.json.JSONArray prefix = new org.json.JSONArray();
//			prefix.put("Dr");
			prefix.put(split[0]);

			org.json.JSONArray suffix = new org.json.JSONArray();
//			suffix.put("MD");
			suffix.put(specializationName);

			name2obj.put("prefix", prefix);
			name2obj.put("suffix", suffix);
			name2.put(name2obj);

			resource2.put("name", name2);

			jsonObjectFullUrl2.put("resource", resource2);

			enrtyArray.put(jsonObjectFullUrl2);
			// end second obj

			// start third obj
			org.json.JSONObject jsonObjectFullUrl3 = new org.json.JSONObject();
			jsonObjectFullUrl3.put("fullUrl", "Patient" + "/" + sandBoxPatientInfo.getPatientId().toString());

			org.json.JSONObject resource3 = new org.json.JSONObject();
			resource3.put("resourceType", "Patient");
			resource3.put("id", sandBoxPatientInfo.getPatientId().toString());
			resource3.put("gender", sandBoxPatientInfo.getGender());

			org.json.JSONArray name3 = new org.json.JSONArray();
			org.json.JSONObject name3obj = new org.json.JSONObject();
			name3obj.put("text", patientName);
			name3.put(name3obj);
			resource3.put("name", name3);

			jsonObjectFullUrl3.put("resource", resource3);
			enrtyArray.put(jsonObjectFullUrl3);
			// end third obj

			// start fourth obj
			UUID uuidFullUrl4 = UUID.randomUUID();
			org.json.JSONObject jsonObjectFullUrl4 = new org.json.JSONObject();
			jsonObjectFullUrl4.put("fullUrl", "Encounter" + "/" + uuidFullUrl4.toString());

			org.json.JSONObject resource4 = new org.json.JSONObject();
			resource4.put("resourceType", "Encounter");
			resource4.put("id", uuidFullUrl4.toString());
			resource4.put("status", "finished");

			org.json.JSONObject class4 = new org.json.JSONObject();
			class4.put("system", "http://terminology.hl7.org/CodeSystem/v3-ActCode");
			class4.put("code", "AMB");
			class4.put("display", "Outpatient visit");

			resource4.put("class", class4);

			org.json.JSONObject subject4 = new org.json.JSONObject();
			subject4.put("reference", "Patient" + "/" + sandBoxPatientInfo.getPatientId().toString());
			resource4.put("subject", subject4);

			org.json.JSONObject period4 = new org.json.JSONObject();
			period4.put("start", currentDate);
			resource4.put("period", period4);

			jsonObjectFullUrl4.put("resource", resource4);
			enrtyArray.put(jsonObjectFullUrl4);
			// end fourth obj

			// start fifth obj
			org.json.JSONObject jsonObjectFullUrl5 = new org.json.JSONObject();
			jsonObjectFullUrl5.put("fullUrl", "Observation" + "/" + uuidObservation1.toString());

			org.json.JSONObject resource5 = new org.json.JSONObject();
			resource5.put("resourceType", "Observation");
			resource5.put("id", uuidObservation1.toString());
			resource5.put("status", "finished");

			org.json.JSONObject jsoncodeobj = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray5 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj = new org.json.JSONObject();
			jsonCodingobj.put("system", "http://loinc.org");
			jsonCodingobj.put("code", "85354-9");
			jsonCodingobj.put("display", "Blood pressure panel with all children optional");

			jsonCodingArray5.put(jsonCodingobj);
			jsoncodeobj.put("coding", jsonCodingArray5);
			jsoncodeobj.put("text", "Blood pressure panel with all children optional");
			resource5.put("code", jsoncodeobj);

			org.json.JSONObject componentobj1 = new org.json.JSONObject();
			org.json.JSONArray componentArray1 = new org.json.JSONArray();
			org.json.JSONObject jsoncodeobj1 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray1 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj1 = new org.json.JSONObject();
			jsonCodingobj1.put("system", "http://loinc.org");
			jsonCodingobj1.put("code", "8480-6");
			jsonCodingobj1.put("display", "Systolic blood pressure");
			jsonCodingArray1.put(jsonCodingobj1);
			jsoncodeobj1.put("coding", jsonCodingArray1);
			componentobj1.put("code", jsoncodeobj1);

			org.json.JSONObject valueQuantity1 = new org.json.JSONObject();
			valueQuantity1.put("value", 107);
			valueQuantity1.put("unit", "mmHg");
			valueQuantity1.put("code", "mm[Hg]");
			componentobj1.put("valueQuantity", valueQuantity1);

			org.json.JSONObject componentobj2 = new org.json.JSONObject();

			org.json.JSONObject jsoncodeobj12 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray12 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj12 = new org.json.JSONObject();
			jsonCodingobj12.put("system", "http://loinc.org");
			jsonCodingobj12.put("code", "8462-4");
			jsonCodingobj12.put("display", "Diastolic blood pressure");
			jsonCodingArray12.put(jsonCodingobj12);
			jsoncodeobj12.put("coding", jsonCodingArray12);
			componentobj2.put("code", jsoncodeobj12);

			org.json.JSONObject valueQuantity12 = new org.json.JSONObject();
			valueQuantity12.put("value", 60);
			valueQuantity12.put("unit", "mmHg");
			valueQuantity12.put("code", "mm[Hg]");
			componentobj2.put("valueQuantity", valueQuantity12);
			componentArray1.put(componentobj1);
			componentArray1.put(componentobj2);
			resource5.put("component", componentArray1);
			jsonObjectFullUrl5.put("resource", resource5);
			enrtyArray.put(jsonObjectFullUrl5);

			// end fifth obj

			// start six obj
			org.json.JSONObject jsonObjectFullUrl6 = new org.json.JSONObject();
			jsonObjectFullUrl6.put("fullUrl", "Observation" + "/" + uuidObservation2.toString());

			org.json.JSONObject resource6 = new org.json.JSONObject();
			resource6.put("resourceType", "Observation");
			resource6.put("id", uuidObservation2.toString());
			resource6.put("status", "final");

			org.json.JSONObject jsoncodeobj6 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray6 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj6 = new org.json.JSONObject();
			jsonCodingobj6.put("system", "http://loinc.org");
			jsonCodingobj6.put("code", "39156-5");
			jsonCodingobj6.put("display", "Body mass index (BMI) [Ratio]");
			jsonCodingArray6.put(jsonCodingobj6);
			jsoncodeobj6.put("coding", jsonCodingArray6);
			resource6.put("code", jsoncodeobj6);

			org.json.JSONObject valueQuantity6 = new org.json.JSONObject();
			valueQuantity6.put("value", 16.2);
			valueQuantity6.put("unit", "kg/m2");
			valueQuantity6.put("system", "http://unitsofmeasure.org");
			valueQuantity6.put("code", "kg/m2");
			resource6.put("valueQuantity", valueQuantity6);

			jsonObjectFullUrl6.put("resource", resource6);
			enrtyArray.put(jsonObjectFullUrl6);
			// end six obj

			// start seven obj
			org.json.JSONObject jsonObjectFullUrl7 = new org.json.JSONObject();
			jsonObjectFullUrl7.put("fullUrl", "Observation" + "/" + uuidObservation3.toString());

			org.json.JSONObject resource7 = new org.json.JSONObject();
			resource7.put("resourceType", "Observation");
			resource7.put("id", uuidObservation3.toString());
			resource7.put("status", "final");

			org.json.JSONObject jsoncodeobj7 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray7 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj7 = new org.json.JSONObject();
			jsonCodingobj7.put("system", "http://loinc.org");
			jsonCodingobj7.put("code", "29463-7");
			jsonCodingobj7.put("display", "Body weight");
			jsonCodingArray7.put(jsonCodingobj7);
			jsoncodeobj7.put("coding", jsonCodingArray7);
			resource7.put("code", jsoncodeobj7);

			org.json.JSONObject valueQuantity7 = new org.json.JSONObject();
			valueQuantity7.put("value", 185);
			valueQuantity7.put("unit", "lbs");
			resource7.put("valueQuantity", valueQuantity7);

			jsonObjectFullUrl7.put("resource", resource7);
			enrtyArray.put(jsonObjectFullUrl7);
			// end seven obj

			// start eight obj
			org.json.JSONObject jsonObjectFullUrl8 = new org.json.JSONObject();
			jsonObjectFullUrl8.put("fullUrl", "Observation" + "/" + uuidObservation4.toString());

			org.json.JSONObject resource8 = new org.json.JSONObject();
			resource8.put("resourceType", "Observation");
			resource8.put("id", uuidObservation4.toString());
			resource8.put("status", "final");

			org.json.JSONObject jsoncodeobj8 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray8 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj8 = new org.json.JSONObject();
			jsonCodingobj8.put("system", "http://loinc.org");
			jsonCodingobj8.put("code", "2339-0");
			jsonCodingobj8.put("display", "Glucose [Mass/volume] in Blood");
			jsonCodingArray8.put(jsonCodingobj8);
			jsoncodeobj8.put("coding", jsonCodingArray8);
			resource8.put("code", jsoncodeobj8);

			org.json.JSONObject valueQuantity8 = new org.json.JSONObject();
			valueQuantity8.put("value", 142);
			valueQuantity8.put("unit", "mg/dL");
			valueQuantity8.put("system", "http://unitsofmeasure.org");
			valueQuantity8.put("code", "mg/dL");
			resource8.put("valueQuantity", valueQuantity8);

			jsonObjectFullUrl8.put("resource", resource8);
			enrtyArray.put(jsonObjectFullUrl8);
			// end eight obj

			// start nine obj
			org.json.JSONObject jsonObjectFullUrl9 = new org.json.JSONObject();
			jsonObjectFullUrl9.put("fullUrl", "Observation" + "/" + uuidObservation5.toString());

			org.json.JSONObject resource9 = new org.json.JSONObject();
			resource9.put("resourceType", "Observation");
			resource9.put("id", uuidObservation5.toString());
			resource9.put("status", "final");

			org.json.JSONObject jsoncodeobj9 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray9 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj9 = new org.json.JSONObject();
			jsonCodingobj9.put("system", "http://loinc.org");
			jsonCodingobj9.put("code", "8999-5");
			jsonCodingobj9.put("display", "Fluid intake oral Estimated");
			jsonCodingArray9.put(jsonCodingobj9);
			jsoncodeobj9.put("coding", jsonCodingArray9);
			resource9.put("code", jsoncodeobj9);

			org.json.JSONObject valueQuantity9 = new org.json.JSONObject();
			valueQuantity9.put("value", 3);
			valueQuantity9.put("unit", "Litres");
			valueQuantity9.put("system", "http://unitsofmeasure.org");
			valueQuantity9.put("code", "{mL or Litres}");
			resource9.put("valueQuantity", valueQuantity9);

			jsonObjectFullUrl9.put("resource", resource9);
			enrtyArray.put(jsonObjectFullUrl9);
			// end nine obj

			// start ten obj
			org.json.JSONObject jsonObjectFullUrl10 = new org.json.JSONObject();
			jsonObjectFullUrl10.put("fullUrl", "Observation" + "/" + uuidObservation55.toString());

			org.json.JSONObject resource10 = new org.json.JSONObject();
			resource10.put("resourceType", "Observation");
			resource10.put("id", uuidObservation55.toString());
			resource10.put("status", "final");

			org.json.JSONObject jsoncodeobj10 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray10 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj10 = new org.json.JSONObject();
			jsonCodingobj10.put("system", "http://loinc.org");
			jsonCodingobj10.put("code", "93832-4");
			jsonCodingobj10.put("display", "Sleep duration");
			jsonCodingArray10.put(jsonCodingobj10);
			jsoncodeobj10.put("coding", jsonCodingArray10);
			resource10.put("code", jsoncodeobj10);

			org.json.JSONObject valueQuantity10 = new org.json.JSONObject();
			valueQuantity10.put("value", 8);
			valueQuantity10.put("unit", "h");
			resource10.put("valueQuantity", valueQuantity10);
			jsonObjectFullUrl10.put("resource", resource10);
			enrtyArray.put(jsonObjectFullUrl10);
			// end ten obj

			// start eleone obj
			org.json.JSONObject jsonObjectFullUrl11 = new org.json.JSONObject();
			jsonObjectFullUrl11.put("fullUrl", "Observation" + "/" + uuidObservation56.toString());

			org.json.JSONObject resource11 = new org.json.JSONObject();
			resource11.put("resourceType", "Observation");
			resource11.put("id", uuidObservation56.toString());
			resource11.put("status", "final");

			org.json.JSONObject jsoncodeobj11 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray11 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj11 = new org.json.JSONObject();
			jsonCodingobj11.put("system", "http://loinc.org");
			jsonCodingobj11.put("code", "8693-4");
			jsonCodingobj11.put("display", "Mental status");
			jsonCodingArray11.put(jsonCodingobj11);
			jsoncodeobj11.put("coding", jsonCodingArray11);
			resource11.put("code", jsoncodeobj11);

			org.json.JSONObject valueQuantity11 = new org.json.JSONObject();
			valueQuantity11.put("value", 14);
			valueQuantity11.put("unit", "age");
			valueQuantity11.put("system", "http://unitsofmeasure.org");
			valueQuantity11.put("code", "{age}");
			resource11.put("valueQuantity", valueQuantity11);
			jsonObjectFullUrl11.put("resource", resource11);
			enrtyArray.put(jsonObjectFullUrl11);
			// end eleone obj

			// start 12 obj
			org.json.JSONObject jsonObjectFullUrl12 = new org.json.JSONObject();
			jsonObjectFullUrl12.put("fullUrl", "Observation" + "/" + uuidObservation57.toString());

			org.json.JSONObject resource12 = new org.json.JSONObject();
			resource12.put("resourceType", "Observation");
			resource12.put("id", uuidObservation57.toString());
			resource12.put("status", "final");

			org.json.JSONObject jsoncodeobj122 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray122 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj1222 = new org.json.JSONObject();
			jsonCodingobj1222.put("system", "http://loinc.org");
			jsonCodingobj1222.put("code", "365981007");
			jsonCodingobj1222.put("display", "Finding of tobacco smoking behavior");
			jsonCodingArray122.put(jsonCodingobj1222);
			jsoncodeobj122.put("coding", jsonCodingArray122);
			resource12.put("code", jsoncodeobj122);

			org.json.JSONObject valueCodeableConcept12 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray121 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj1211 = new org.json.JSONObject();
			jsonCodingobj1211.put("system", "http://snomed.info/sct");
			jsonCodingobj1211.put("code", "266919005");
			jsonCodingobj1211.put("display", "Never smoked tobacco");
			jsonCodingArray121.put(jsonCodingobj1211);
			valueCodeableConcept12.put("coding", jsonCodingArray121);
			valueCodeableConcept12.put("text", "Never smoked tobacco");
			resource12.put("valueCodeableConcept", valueCodeableConcept12);

			jsonObjectFullUrl12.put("resource", resource12);
			enrtyArray.put(jsonObjectFullUrl12);
			// end 12 obj

			// start 13 obj
			org.json.JSONObject jsonObjectFullUrl13 = new org.json.JSONObject();
			jsonObjectFullUrl13.put("fullUrl", "DocumentReference" + "/" + uuidDocumentReference.toString());

			org.json.JSONObject resource13 = new org.json.JSONObject();
			resource13.put("resourceType", "DocumentReference");
			resource13.put("id", uuidDocumentReference.toString());
			resource13.put("status", "current");

			org.json.JSONObject jsontypeobj13 = new org.json.JSONObject();
			org.json.JSONArray jsonCodingArray13 = new org.json.JSONArray();
			org.json.JSONObject jsonCodingobj13 = new org.json.JSONObject();
			jsonCodingobj13.put("system", "https://projecteka.in/loinc");
			jsonCodingobj13.put("code", "30954-2");
			jsonCodingobj13.put("display", "Surgical Pathology Report");
			jsonCodingArray13.put(jsonCodingobj13);
			jsontypeobj13.put("coding", jsonCodingArray13);
			resource13.put("type", jsontypeobj13);

			org.json.JSONArray authorArray13 = new org.json.JSONArray();
			org.json.JSONObject jsonAuthorobj13 = new org.json.JSONObject();
			jsonAuthorobj13.put("reference", "Practitioner" + "/" + "MAX5001");
			authorArray13.put(jsonAuthorobj13);
			resource13.put("author", authorArray13);

			org.json.JSONArray jsoncontentArray13 = new org.json.JSONArray();
			org.json.JSONObject jsoncontentobj13 = new org.json.JSONObject();
			org.json.JSONObject jsonattachmentobj13 = new org.json.JSONObject();
			jsonattachmentobj13.put("contentType", "application/pdf");
			//jsonattachmentobj13.put("data","SlZCRVJpMHhMalFLSmNPa3c3ekR0c09mQ2pJZ01DQnZZbW9LUER3dlRHVnVaM1JvSURNZ01DQlNMMFpwYkhSbGNpOUdiR0YwWlVSbFkyOWtaVDQrQ25OMGNtVmhiUXA0bktWWnlZN2JSaEM5Nnl0NE5pQzVxM29qQVlHQU5nWXhrSU9UQVhJSWNrcmlCTVpNQXZ2aTMwOHR2VkVTcWJFOWc1R2FTOWY2YXVzeE8raStiRDUxaG41OURGMGNzUHY4MStiWE45Mi9HK2o0OS9QZkd5TzNYelkrK3QwZzYrZE8xNGEyUC9QbTlLM1AvdGw4ZUNPYmdGN2hiU0d0bjRYSE5yKzlyZHYwcVd6ODFFRWZSQ0Ewa2Y1TTV3eS8rTWZMNXUyUEw2NDcvOWU5MzNqb1lyQzd5T1F0c2xSeVJRemtLbGk3czN3RjdUSy9JMnhVdTU5L1lPVjNRMERzdmhETGQvVDNzWXU3RUFDSDdxZnY1ZlBMNWozUmQraEVIOEMraS8wdTBMdU9QbFVocndvWmVTT0o0enk5dVNDT0h6enhJWEVjcHZWenAyeVVCUG5yK0xSQmpEdmZCUXowL09uUDd1MUV5cHJ1NmNQZWdFRmpqVFBlQkJOcDNkUDNZQTdtU0o4bnVoL00yVnpNWkM1Z0FNYW5qNXZMMHcxMTUzQ0hYVENCM0NMVXNZdEUvRGVpUG9MWkd4eTMvR1hIc0dkTy9NWE0rbkZMcTJIczk4UXYzVDJPYms5OGlTZGZuNWd4THlaekdzSEp0MjVqYWVobEdQYm1EQ2pid0pwcC9QM3AzVDBKRVlFa0pKQ3FmSlpzbndSazRVS1diY1E5Q2JMMUpBbUp2RGRSQmUvNS9pRDNEM0p2VCtZNThjMHpmL1R5UkpaQzRhSzdCbDVQb3lkWjVRYVpMKyt3NDVZK2owdlNzbHU5My9VcXJPc0FpalgzN0M0aUI4eHI2MFJjWUhFaFU0MXl1MmM3SWd2TnIrcExoeVYrQUQyQnQySHBHNVpNRFdXLzBuZXk5bkpmbndibUZZdkJ4Q0JPRE1hZWxUdEFaaUI5dHpFNWQvYlFMbnB0Q0lUYXU2WTR5czZUTURvei84dXlldGJpbW5LVElKdkVBZmxaYzRyalFMNlM1S3lXVnVONHRYZGtkU2VoYVpKVFBQdWY5UmUzUVdOUnNPTzZjendsaDRaMUt6OVJSZHJQakpTdUpXVUtoNTZWOHlUQ3VuM3ZhRVUwTW16QUoxY3RXUmNDV1haWlBvRm1GTHVBWWxPOERncVN1R1p1QzZUNWxXQkJmU1l5RGNYbUdmWWNJV3JQaVVNNHZnTDZuaE5ENVhRbHZkcDJnQVA5SFZXSjhwTXg4OEM4QUN2R3hXU1lCSXMrQjFmUmFBWFZjZWNxOVN0VXc0a3o0bGxJdUJ5VVlQZHdnU21GWFJPbHJKb2twQnpDYUVTNmk1aVo0MVdKMG1hbVNYUUk5c00rcmVGQ3I2UVg4a3FacXBQemxndHRTVWhJTWtIRmc2VDhWVU82Z2JQVVhGbUV4RUlrVmFrcDEydHFQQ1hwWGFPdVl1K2M4Z1kvMTVSMXVTKzJKSllpOGpKVUhkVnh2SnNaMU0yRFlCSGJzRy9RZXkrQnJ5Q1dtNFdHNFhVK0V5K2VpQmo0UFZyVlFpMGoycGZRWTN5ald1cWMvUTBaSldqUlAzREhQWlZQVldWVFV5RWNxT2d4eHZxVUdsZEE3WGV3b2h4S3JhRmliV29KSWkzVVpKcE5XOHdQeWNjSHhZVTVjUVppS0Q0b1BPeFJINzhuMTUrMEIwRDFNdmtmU2hqazZQWTUzSFh6dWNHY3p5aFVVTlJxUDVtY1RsY2hFcmtQYkRTNFRnNjFTbWgrU3hHRFBUM0IwUWJPU3l1bW9jeHpuZE5hei9kdDA2RnNZbnAwcWRLL1VoVkNPN1ljRjFSaDBOcFdEOVZyZFA2QkxzQll2c3JQMDRqRjRyYzFacHBCVzNJNTFuSlVYTzFtdTBnSUNIUEhGdnV3N01OVi9JTlVzcU5lVUhRaVp3OVliUlJvTkdKVFZZV3VHd1hzUlV6UEVaTXROTUZpQlU1aGZzZEFyYk0xczAyenpKWjl6VThrUE5RY2JlQThMbTl4VFJjVnZvQllIVTkyZkNXQzdYRGJVcWJPSXZuajFLZ3pKWGRLbkpJWDdubWw2YnFuaDVoMk5OSzFNc3lWMHo2WmxEdG9XVmEzVWYreGxxNnNoUHhjSThRR2VWTktTVW16NUJhWDA1amVWbVFtWDZwdDFiK2w5WDkxNExKTU5QZTY2NEl0VTFIVFkrVFdVTXRVSHErMDhaRGNMamFneGlMbFFiRlFDUlM2ZzRma0hpVjZLbFdoSlBrVXJIa09vWEZ4dVVVcDc4MGFrNVJyMHNiYWRLQm1Ba1FsM0RmRkJVRkpwVmZUbzlwcytGeU4yMVlJeitSMFNTYmdNWEhGaVl0bjZ1bkJJa2s2N0sycHhVOTdOMVdUS25odWhIbHJKQWVyeFp1bThKSVViOHJPckRtU2RjUEFRZ09CYzY2bDRxQVR0QnRqcm04cmtIQzROTXZWQmhqbW1DMWxVbE5yMDBhZzl2aTVxbkM3azBmdmtvbmJ2RHVMZ0s4RnN6VTM0ZHFDK2RCWU15T3hUTWdyWFdXTGhJSzBLNFFwd0pKNVhBRlliVjhyeU1va1hpUG9JYVQ0b1YxTmw5RGY2SjVHQmhqUjdxMGQ0M0FqQ21OQnRMdWs2Q0trb2hPODFvQ3NrWno3OGRaSzdhQ1M3SlZpSnhhTEtlUnJjUFhYdlNCY2FuUzMxczZ4Zm02SGg1bzBNQTlCZWVBcHNaVzZhRmNiNnlJRDFkUEdDZGJORW9rOFFaL3E3blZmUHJmWmdGNER0TFdUVXEvOXEydUdtVVBxS1phOWlJTzdHWEp2KzJsc3JDQU9zWHAvRnVyNnJzSmZsbGJvdE1QVllyRUNTZ0Z4VlJqRkZSRFZPSVpZSWdaOU9VeTZlcFpFMUxEd0pacldiTkhqYldjaHFtT29pYTluVWF4V3dObk1ySU5TR1R0cFZySXIxVjcwdmNOUTlCWEwyYU1jUWdyVFlTeUQyaks3eXF3NWxSOHNzY2dIMDNLUno2VVJxUkR6eVhwWnBNZGZjZlQ5amZUVGtYZlBKL3BzbE1CRHZCdkkrV2pMb1hmUVErOUdGMFRoNVFZK1U1YUw1MDR2QUJLTHNraVB2MHFYYjZKL2U2N09VSXJtcHN2SjQ2Zm1DSHQ2QUVqdHRDSEUyMUZFeGd2Tk5KcnZRejA3cXNOVUdyQlh1bWtYS1lNM0hPWXQ1LzJ4T3AvYnAyVEFVY2E1WjU0Sm9HWUNnVys0T1daWmJsc0RCUWJOZDNWSU5Ta1FpVjVnb1ppbzVTKzRVSUhTWHR4dy81TVA0SGkxcUROeTFicERYeWlTaUZaYUZpMC9nU3RnVERPSy9DdUFDcG8zd3NJRUxmTTJmZlI2Zk1OS2N0QlMveUwvcXBER1RJKzJCeVcvY3JMZDgzOU1YQWFPNndiTkNFNHNqaDZidzZiMzNmL1ZlTjlHQ21WdVpITjBjbVZoYlFwbGJtUnZZbW9LQ2pNZ01DQnZZbW9LTVRrME5RcGxibVJ2WW1vS0NqWWdNQ0J2WW1vS1BEd3ZWSGx3WlM5WVQySnFaV04wTDFOMVluUjVjR1V2U1cxaFoyVXZWMmxrZEdnZ05qWTBJQzlJWldsbmFIUWdPVFVnTDBKcGRITlFaWEpEYjIxd2IyNWxiblFnT0NBdlEyOXNiM0pUY0dGalpTOUVaWFpwWTJWSGNtRjVMMFpwYkhSbGNpOUVRMVJFWldOdlpHVXZUR1Z1WjNSb0lERTBNRGN4UGo0S2MzUnlaV0Z0Q3YvWS8rQUFFRXBHU1VZQUFRRUJBRWdBU0FBQS85c0FRd0FEQWdJREFnSURBd01EQkFNREJBVUlCUVVFQkFVS0J3Y0dDQXdLREF3TENnc0xEUTRTRUEwT0VRNExDeEFXRUJFVEZCVVZGUXdQRnhnV0ZCZ1NGQlVVLzhJQUN3Z0FYd0tZQVFFUkFQL0VBQndBQVFBQ0F3RUJBUUFBQUFBQUFBQUFBQUFFQlFJREJnY0JDUC9hQUFnQkFRQUFBQUg5VWdBQUFBQUFBQUFBRVNET2xnQUFBQUFBQUFBQUFBZzhiVTUya0R2ckFBQUFBQUFBQUFBQUEwOExxaDY0bWNyMHVRQUFBQUFBQUFBQUFBcCtkcmZCNk8zOXpzK2x2Z0IrYmJQa2VvNkttdGJqeEx2OXZRMW5SK2ZXbmFRT1p1YTJvMDlSU1RzNGZ2UDUxNldQQVZIcG5ubHI2WjR0dCsrZ2NqUytnOGRwbFNhSDA3ejcxL3pTT3NLbW90L2Q1Ym11TmsvbWI5b2ZqbjlCeGV5N0lBYzFXU0xEYlgyV05QalpTMUhQencyUStnaVVzVGRhMDE1VVh2T3p0ZU5sRWlhWlZ2RysxVjV0b0p0ZmgwbFZ2cjdTMjR5YlpmTWZsZDFrcHpkSFRlYmVOZXUrdDFub0hSQUFhZExReG15RVpKS3VYWFhVYkNaSGJJMG1KcXRFWFJEbXlhbEkwNDJFejdTWFlydnI1bGpsUEJGOCtwYlBIN1U5eDFNZ0FEemJ6K0ZEOUZ6cFl0TEdsWWVnY3IxVno1VitoL0hOTVRUMURtdmNPSDVEdXVvNTNpS0tEN2I1Vkg3T3Fpd1BmWnZqSEY5VjZyZWZuL21iU3hyTE90L1NZRmJ4dXlrNmVQMWxnQUExWS9QdXZjK1k1Ni9tekhObzF5OFB1V083VjlmUHUzREQ1bXh3eitmTnNhWnIwNTcwWFkxYmRXM2NCVTZZKyt1bWRFQUFBQUFBQUFBQUFBRlRoY29kYmFTZ0FBQUFBQUFBQUFBUE1xdTJwTE4zUG1uVFo4N05rMDNxc3dBQUFBQUFBQUFBQlVmTjJNUGZZeDlXejdqOGdYZThmLy9FQUNnUUFBSUNBZ0VEQkFNQkFBTUFBQUFBQUFNRUFnVUJCZ0FTRXhRSEVCRVZJREJnRmlNbE0vL2FBQWdCQVFBQkJRTCtGSzBGZm1MZFBPUk5CWS9qMldZS3dzTEl1QzlwaUJjR1BBMW8wTnJsZGVFa1pWc2JnLzR1YzhEaXcwYkwxallaT1R3L0VSbHJ4aml3aDFjbmdSeG9tWVZPSXNUai9pbjg0bG13c0FOSjFRQ0ZZMnk3dGozZmtibFU4MWkyczlPdDdjVSs1V0pBZkpXLzhNLzFYVzBGSHRGeGNHcmZVTkcxZVpxYXdzczdMVHJZdDYrc2NqUStuK2dXTW95WVlMamRoYkRZSTZic0s1eVhXelFDMXBWd3RHbmJibzF2OW5TbW5uYisxNXVoWDZtS3pVOWVTOGRpL3dDcXgyUmlaS2ptbkovTVBVcGx4YUtsNlc1OVF0U1hJL1hncklYZTFWbHM0NkpHdnhzaSs0V3ZXakcvTmFVbkwwSi9QaktPeWJEYTQrcXBEakk3dDJ5enMxTFNlMUZaUkJSS1V0anJpNUh3N0Vzd2UrMTF3YlZCUzdRVW0wUnZIYWUvcDR5dDVhdVFxOXpzQjRZMjBqRGs5T1RVeW9oUWRWWmFhNHVSOE85M1I4MnV3V2tMWjFlM2JYMWtGRXBTMklMbXhocTlZd1NPdDFOYUpuWFRqSTd0Mnl6czFMVFczQWJmWTFDdUI2VlhIbkt3RUlqMTJ2RHRnOXJJa1lGWkVXU3p1Yk5OQ3RVRnM5ckd5VThDM1ZhMUxZVmJVK3lJNXdNTlZTLytuNmxxRkpXcE5wOVd3Q1dyVjBoTlVxanBrNnBkQWNOY1Jnc1NzWExaU3FWNTJKOVRyR2FsL1ZFckJ3OUVrelVPVm9IeXpyUVRzN1RWVXJWdUZDa09sc0tSV3pyMEtVVmNhMXBGYmlLMnNvcXBMTHdVWGNxMTN6MTJxVmxYbGZUa2s0dWFraTQ1OUdseDdUcTZ3WVhwbEZYbTlTcm5KVjlkQ3RHN3A2RHpEdXRKTzhGcXRjR3ZaMVZOaDhkSXNOa0dzMXEvRU5UUXIyeDZja0RsaHF5ZGk1R29WSFZNMEtUVlQ5Q2wycGFmWDVGVjFDdE1HRmFDRm5MVUsyU2kydnJyeFIxQkN2T1BUa2djVHExMERxYXpYb2svejZPVElhbWhYdGpva3hWeXk4RkY4YVRWeEl6cXFiRDQ2UlliTmRScDFMSWFKTUZXeFFKdExrMU5PYlFSNEFIMnRnUUp4aXVtblhQNWczV2JSNlZWdGZSTlhyaE5KRDZRQ1dTYWVaelhram1DZFRER2YzU2xpRWNzaWlEeVErVDlncjJVN0JXeEcxWktKU0dXQngrMGpEaVR2UTczdTFZcW81Q2FEQThYQ0VuT2Q2SGVBeUpxUE85RHZkNkhlem40eDVJZkh4bjV3MDRCS0VMRlVpL3NjNDFRcHVyMkM1cnRCZFBMcStGTzVIdHEzZGU4QUYzWE1xS1dLajRHYmxCSlptNnIwNHNOQ1ZIN0J1VUdDL2dSNWNURTNseHNTZFhpemw1ZkRQbXIrVGg1ZkxQbXIrVCtSZ3hPSjZCY013RkU2Nnk4Skt1dFVycUR5cEdBVGo0UzJISjJLd1JSQUw5dTdIS1JFeGlyNmJ0enhhUGNxbXVHanFHb3RZSmRYUVRuM05sUW10S0l0dld2R0x5eHhWMk5sYm1yN214TUs4M2JaVHBQK1FmN2pScjFoellkaENjMjNVbGRLa3JwR3FaYUNFOFp5M0ZLeHNkakxhcCtGQzVZUFc0aksyc0tlemFZc05xWXRucTA2Y0xMMG9YWUhBZTd3SVRGN1FuUm90ZHlaZTN3MDE5anVmeGlvbGxwM2lacFJySEl1c2FJUmhiL0FDelRhOXZTejdSK0p3KzdxY1hLVlByMWpDdlIxL1o4dnNJQVpnZlBQVDFCbU5KUTdLZHZaTk91V3JDM2JhYUN4ellpVTdsM2Y0eG03ZnlyMzNpVXoreGxrdDVRaVUxanNvWks1YS9OdE9Ea2NSR3RhVGozWWR4eVVDeEdtWEs4YmQxVlNDWS8zZE9NNTdjWmN5T00rZHVPY0NBTmVQVGpxbEhFNDlHT2RxR1lkT09yQVlZNWtJODh4SEVjeERDR2ZqR1pkT09yeGhZTU5RUW11bkhWa1VNNGxDTTQ5RWZuRUl4OXVpUFQwNDZzeHhua280bGpFY1l6ek9NU3hDRVJ4a0dFNGRPT25NY1p4Z1VJOGlBY1lSSEdFY2lobm1Ramx6T01TNUJjWXpjakhFTWRrZnoyNDQ5OHJDbExveG1YUkhxOFlYVjBSNjhMQ3hMb2oxL204eklFWXhIVUpocWhHNTlLbnhkVVZPK1Qvcm5QNDFpdEEwWWRhQVJmWmxlRFFaVnN5Q0FMc0IvaWE2eVpaa3J2UlhFNDNMK0xGRFpuRlVMWGNEVlM3TzB0SUZxbi90SzZ6MlIrdmRVMmJMTnB0Yno2VlJXYllWKzVQZHN5dGNXVHVHQzIxakdtVnlYSzM4Sml0VWc0T3FTRHpLSytXUEFWNkowVmNRWmFwSS9CQ2lHRTBseXh4V3FSWjhGYjRFa3VDVTBGaU5HUVdZeG1nckpDaERFSS9oLy94QUJERUFBQ0FRSUVBd1FGQ2dVQ0JRVUFBQUFCQWdNRUVRQVNFeUVGTVVFVUlsRmhJekp4Z1pFR0VCVXpRbEppY3FHeElEQmd3ZEVrTkVORVZOTHdnNUtpNGZILzJnQUlBUUVBQmo4Qy9vWDBzcVIvbWEyUDl3bnh4NktWSlB5dGYrajh6aytBVWJsajREQ3d5QjlTUVhXbGdQZUkvRTM5aGhjcndVUkc1U0ZjMG5uZm5mQUw4UXFtR3Bld2k5WlJ6R0lSU1FRMUZRemdGWmhrYkw0OUQ4TUdOVmtVai9sNms3bm5zcmVPM0k0ekpmYlpsYllxZkEvMFlXWTJVQzVPSWdCa3FabExScys0aVQyZWZYQ21PUFpsSURqYmJ4WTlCNWN6aWFXdG1FZEpjRW1ZWlZINVZIdDY0WExEQUtkU1dFRHhMbWEvTStXSGxwdlRScGRaSUZ2bFZyYlpvenl0K0hBaXFDSmtDNTgvTXAwemp4Vy9RN2pCRWgxS3VKZWQvd0RjUitmbU9od3NpSE1qQzRQOUZ4Uk42ckhNM3NHLytNSklpM1ZneEpJc1NvNmU4MkdKc2dCbFJocXl1UHQyOE90dVE5K0tyNU1WbFZIMlNlVlZTZVNQY0EySzhzSDVPcDJqTTNxWkJjNWZ3djhBZHcvQW9vb0t5dXFwVU1qRmlkTnJjdk8yQW8vMHRVN1hUTDZyUHoyL05heEhzeEJJY3l0UzJhSzNQS2VuN2ozWXFhYnBHOTEvSzIvK2Y1Y2xjazlRS1BoMHlVNWhSSE1jaTc2ckVnWmJpNCtHSUp6VUg2TkVNYVNybjdnejVnRytOc2ZMR3JrcUpsTHhSVkVBem4wU3RuSzI4TnJZNFhUVVVIRU9IeUJkYXBGZFVsbG1qdDlsUzdYMytHT05DcWtuZlI0blU1TXM3b1Z0eUd4NWVXRjR1R25tcjU0QW8xSm5mUElUWmJBbjlzVm5DWnFpZXFlRExORk5VSzZzNk1OL1hGOW12aXBpMUhFWTRUbnladHI2amIrM0FvNjJva0wxU3hUMFZYbU9aaHFybmp2NGo5c2NUbmVPbzRuUnJHb1hzRlhsbG9pRjM5SGNYSjU0aTRyQlZWVXM0amdSS25XZU1zRElvSktnMnZ1Y2ZKK0NsZVpJM3IrOEdtZDc5dzlTVHRpbHBNOVYyZWFsa21kQldTN3RtRy9yZWVQbEJDWkdNY2FVMlJHYTRYdXRmRmZYU1QxQnFhYzFKaWtXb2RiZDgyNUhmMzRwRFRHcEx6ejArY2RwY3M5eUxnTVcydjdzU3Q5RzF0Q2N0czFWV2E0YjNhalk0WndxU1dTS2lraWtua1dOeWhsSzJzdHgwM3ZqNVU4TmdubGFtaDRlYWlMUElXYUJpcmJCdWZTK0tTb2s0ZlhRUDJjTjJtZXRNaU9TQjluVVBPOStXT0V0UXl1a3F6TkpsVnJaOGk1cmZwaWduZ25mNk1hTjRrVU4zV0lqRGsyLzlRZkRGTFVUY040bFZ1MHJYcXh4REtuMWgrenFEbDdPbVBsR2xSTlZMb3RBSXRHcGVQSmVJY2dEYkh5VmVhb1oyYXJtaWVRR3dtQ2h3Q2ZoampOYlcxazhGUkhWU3hST2t6S0tVSnkydmJ6T09GOE5ocnBTYXp2eVZ0S3BadE5SNnd5WDlZMjVZK1RNMm84ZFQ5SngwMVNMa0hNQXdZSDI4N2ZOeGVxbkZWWFVpdDNLdmgxWDM2S3czVXgzSExuaW1wWnFtV1hoNmNPU3FSVmN4NjVZK3ViVytHSXFlbjRtOVhwY1RpanZxWGVNWng2TW4vT09QSTFEWGNSU0pvY2dwNjNSRWQ0aDB6cmpnWDBYcXh5dzBza3hvcEpDMnBiTGRHTnpjMnZ2dmo1VjhTb0ozeVdwZEs1K3B6S29iMld1ZmhpZ2xpNGpOQzczamFPYWN2Mm8yL0VlZlhiRFN6Y040bFdudE1nN1NuRU1pMkRuN09vT1hzeFd5TkZOeFdrU0ZWMHFHcnlTMFp0ZStTNHVUenhSenBVdlZSR0w2K1lXWTIrOTU0anJubnFEUjhSbWVuRUxvNGpqWGJTWUVqTGMyUHh4eHFwbmxkK0VQVkdtZTVQK25iS01yZVFON2ZESHlWZ3FwNmg0NWFHVjN5enVoWWdqY2tISEcrR2E4dFJTMGpSR0ZwbXpzdVpibGI5YmYzeFdkcHB1STF0TkZSSkpwME16TGszYTVzSFhIQ3BHbG5uU3A0bW1raVZQcFRDV05vekpmbjA1NDRreTAxVHdXVFFJV29ycTNWVlRibjY3V3RqaEtWa1ZkUTFNZ0thd3FPMFU5YWJkVGZZOVJocFp1RzhTclQybVFkcFRpR1JiQno5blVITDJZRkxSVHp4UFFSZHFiUVIyRHkzN2tiWlJ5c0c1K09Qa3hOSEhWMU5MVlJUeU5UMGNwUm03cUg3eTh2Ymo1UjE5RTlSQlNpUklxYUtxbDFKYWMzeXlFM0p5ODcyT0tDV0xpTTBMdmVObzVweS9hamI4UjU5ZHNjZUMwZFZPRmVyQXJCTWxvL1c4V3piWXBaOTVaQlNLKy8yamt4UThicWVMVFUxYTVXZVN0ZVk1Tno2bVVuTGw2WTQ4alVOZHhGSW1oeUNucmRFUjNpSFRPdU9CZlJlckhMRFN5VEdpa2tMYWxzdDBZM056YSsrK09QTVpacEtOalRNaXJLeUZQUjdqWTdiODhjWTRnSnFrMWF4VmFMSTFUSWJBWnJiRTI2RGZIeWVncEl1STBWWkxrbW1scTZvbUtlSUR2aFFYTjcrR09PWitIOFE0aUk2cktwcDY3UlZCbEcxdFJjUnFBVXNvR1ZqY2ozL08yZStYczc4dmRpQ01uL2hwejd1MnB2OEEydzFUd21uaXFxaHd5c3NyNWJFTWQvUEgwbDhvT1BVOU0yYjFBNDFOdW5nQmhhenRVWFpDTGlkbkdXM3R4OU5jTTRoVGNVVjVDY3dkWGE3ZEdBL2NZcDZpbzRmUFE2UlZza3kydkptQUdYeTU0cUxTTTZhTncwZmRQMWhzTnZoaExmOEFTUS8zL2x5Y05TTC9BRWtnY09yTVNXemM3bjM0a2hsaGFSSklFcG16U0gxRU4xeFd4YUpDVmNTUXlnTWZWUVdVZVdLS1dSRHEwYlpvWFZpQ3ZsN01WS1FvVldvbGVhVGU5MmJuamg5T0kyMGFCdzhDNXpzdzVIenhEWGxUMm1KREdyQS9aUFE0ZXRLSHREUWRuTFgreGU5djF4VGNOa2d6VXRPUVlobU4xdDU0bXFTMVJCTE91U1kwODdSNm8vRmJBNFkwTnFJQlFJMU5yWlNDUDJ4U3lUS1dhbWsxWTkrVFd0L2ZFZGNWUGFZNHpFclgreVRmSGFtTThGUVUwMmtwcG1qTHI0RzNQQjRTa09TaDB6SHBnOUR6M3hIUnpCOUZDcFhJNVVncnkzR0RLbFJXU2tybHRVVlR5ajRNY1JhNFlTUXRuaWxpY282SHlJeFdVd1IzRllDS2lTUnkwa2x4YmR2WmlLQ01XampVSW84aGltbG5UTzlNeGFQZnFSYkZGMmFBeDlqMU5MdkhiUDYzdHdFZ25yNFl3YmlPT3RsVlJ2ZmxmRlRVdWFsSHFiYXdpcVhqVjdDd3VBZkRGQmxoQ0xRbThDcHNGMnRpb2tmWGpGVGJYamhuWkVsL01CanRjVVdTYlJGT045bGpISlFPbUpTeVNvWktnVlJNVXJMYVFDMllXNVlaRWxxSlF4dmVvbWFVL0ZzVkVyZG9pN1Q5ZkhCT3lKTCtZREZLMXBLYVNtWEpGSlRTR05sWDd1M1RFZEdzSjBWbUZSNjV6TklEZk1UMXhVVm1wVndUMUZ0UTA5VkpHR3NMRGtjVWxSNlNTZW1SbzQ1SkpDeHNlZDc4OGNRQ1V3eVY1dlVKMGIvSFBFTlF1dk5KQXVTSHRFelNDSWZodnl3d2hucjRGWmkrU0t0bFJiazNPd09IcWkxUlR6eUpweVBUVE5IcUw0RzJQbzZPUFRwTlBTeUliZDMyNGo0YThYK2tqQ0JGVmlDdVhsWSs3RmZHWWN5VnpGcDFZK3NiV3hSSW5hSU95SVk0V2huZEdDbm1MZzRhS2tqeUJtenV6TVdaMjhTVHp4SlhCVDJtU01STTEvc2czd2FZUnlSdzlvN1VCSEt5NUpQRmZEM1ltVXkxVlRITWhqZEttcGVWU0Q1TWNVOHFtb2w3TjlRazg3T3NYNVFjTUlaNitCV1l2a2lyWlVXNU56c0RpcW1pVWlXcWZVbFltOXphMktSNFltWHNoa01Jem15YW5yWXI1REJmdHk1YWhMOTE5cmN2SEVOUXV2TkpBdVNIdEV6U0NJZmh2eXhWVUt4a1U5VHFhaTVqdm45Yjk4UlFSaTBjYWhGSGtNTDNKdEJaZFlVbXMyaUg4Y21LaXMxS3VDZW90cUducXBJdzFoWWNqaWtxUFNTVDB5TkhISkpJV05qenZmbmlybXBZdEo2cDg4dGpzVGlmaHlvUlN6Wnc2NWp2bjliZjM0b29Yak9XalpXZ0lZaGtLOHQ4VkZRc3RaQkpPK2VUUXE1SXdUNDJCeEhHQ3pCQUZ1N1ppZmFldnp3bVZRME56RklENE4vOTJ4QUpKYlpMeHU2aXdSVHlQVGtiZnJpcm81WGxoaGQrL2s3cmMrK3Z2NTRyS3loZXBNOEthZ1YyQkJBNTlQREZEd293eXJCcnN5eWtkMXgwVWU4bkVkWEx4U1dubFJCSStXTWR3ODl0OFUwTGVucWdvVnJiWnBiZnBibWNVOUhCSjZTcElTUFBlNWpYcmY0bkUwcS9WczJTUDhxN2Y1L25GbU5sRzVKeHJtVkJEYStvVzd0dmJqUTFVMTdadFBOM3JlTnNTVGRwaDBZalo1TlFaVlBtZW1ESlNWTVZTZ05zMExoaCttQXRSVlEwNU80RXNnVy94d3J4c0hSdHd5bTRQenBHWFVPOThxazdtM1BHbG5YVnRteVgzdDQvd0tLbXBocDgzTFZrQzMrT0JKRTZ5UnR5WlRjSEhaQlcwNXF1V2hxcm4rSHphV2RkVzJiSmZlM2pndERJc3FnMnVqWDMrYlN6cnFXelpMNzI4Y2FXZGRTMmJKZmUzamk1NVkxOVZOQzJiVnpkMjNqZkZ4eXdIcUpvNEVKdG1sWUtMNDExcW9XaEJ0cUNRWmIrMzUzbG1rV0tKQmRuYzJBR0JQVFR4endubEpHMXhoS3VTdGdqcFgyV1ZwQUZQc09EVmE4ZlpndWZXemQyM2pmR2ZNTWxzMmJwYkVzOVBXMDgwTVgxanBJQ0U5dUhxb3E2bmVtajllWVNqS3Z0T0dtcHFxR3BoVTJNa1VnWlFmYU1SMU05YkJEVHkyeVN2SUFyK3c5Y1F0UFcwOEt6ZlZGNUFBL3N4cVRTTEVsd3VaamJjOHZuV09LdXBwWkc1SWtxa24rRllIcUlrbWYxWTJjQmo3c0xBODhTenR5akxqTWZkZ1U1bmpFNTNFV2NadmhnVXhuaTdRZDlMT00zd3gyZlhqN1JhK2xuR2I0WU5NSjR1MERmU3pqTjhNZG4xNCswV3ZwWnhtK0g4Ynh1THF3c2NRc3l2TlV3OTFrQXZxUm43UUhqMFA4QStZZVFpT2FKd1ZaUmRobDVBUDEyKzkweEZHNjZrYzE0aEcxUTNlMjZNTmlMZU5zTFJ5UlJDS21JWlZXVkYwaXZYbnRpYlVySkkxaUtreE5NYlAxQXpXL2JFOVRVK2xBSDFYcTMvQXYzVlBpZHppQ0dPUFFta1M3OWRGZjgrR0VqUVpVVVdBL25RY01wbDFhbmlFbWxwNXN0NHh2SnY3TnZmampIQ3FpUFJtb1pFeXg1czFvbWNGTi8wOTJKdU1SQXYyV21qUjA4UStvQi93RElMamlGTlhUdkNZK0tJWG4wOVJVa3l4RzdnODF2enh4S0lpaXFKUkhHelZ2RDdoSk9kZ3c1WnNVaTA4Tk5NL1lKRGxxcjViYWlmcmpoVkZVVi9ZYU9lcGxlcG5wdlJvaE4yVkFmc3JmSEJLZHVJMUlwNXBxcGRlTTVYbmlUMURmSEJVbHJXV0YycVVrcUhxT3o1eWpsVkJreW0yM3h4OG5hdW5mV3JqUzFaYVpSdmtCVHZLQ0Jkc294VDFGRFZ5SGh4NGZUbXBybDcwb2kxWDczK2ZEZkZkMmF2a2hOTkhGb2p0SVFHKzl3bGpxNCtVZFUxWlU2VkFvMHFlTTNYNmdNZTcxTjhDbmF0YXBpYWcxbVZxb1Q5L011K3c3cDNQZEY4Y0xXbmlwcG43TE4zYXErWG1tS2lpMTRlM3pHV3BXR0x1cWx6OWtmZEcySXFXTFQrbU1xcUl2K1o3VmZjK044M1hCaDFVYW9qVUdSQWQxdjVmSEVVSERKaERNM0RwYzl6WXNtZGU2RDBKMkY4Y0JpcDZoK0M4SGJVU1l4dHB0RklvRm8yYnB2bTl0c2NEN2R4S2Fqb1pucUE5Y0RwczRVK2l1M1M0L2JFTThYRTZ2dWNJWnhVSU5KNUxTR3hQOEE1dmlnbEk3UkxKd1NPY29MTG5ja1lpcDE0YlV3d3pGdTFhTWlNNGpIMlJ1UFd4QzhvbmpGUFJabFRQbERFTHNUYm1PdUtXSnBGRXNrZDBRbmRyQVhzTWNFV0pJcEpEeEZMTE42aDlISnp4eGlvbGFDQ2FzbXBSa3BGN2tlV1ZSZmZydisyT00wTDFVMVZEVG1JeG1vYk13ekxjNzQwZXhOMmIvcWRSYmN2dTg4UnMvKzNTcXAzbThNZ2xXOS9MSEdod3FCcXFpcXE1VmQ2YVJGN21rbXBrSklHNUZyKzNIeWFYYmc0amtuQ1ZOVGxaT1hMbjF1ZWR2Vk9JNFk2V1NYaHlRVk1rMDhMcU5SZ1d5dFlrSElUMzl2SVlNdkU0akZTOW45TkcrL2R0NVk0MXhOWmFmUE5UeHdpbWdrVmpCRUcyZVMzWGNuMkMyT0xwUHhTT1NKNUtMUHhHbmlHUVdPeVc1ZE9mNGhmSEY2U3BuN2RTUVNsVXFJL1JpWVpBYkhKWUd4dVBkajVOdElJRHhLU2lTT25hb2NJaUFvdVptSjVEbGlPa3ArSlVrZFQyQmd0YkxHR1NXTGZNcWIyNSszMlk0ZkkzRHAxb1lGcFhqQWtUNjB1bDgxemZZZDMzbkRKZTBxV3p4MzNTL2o4M0RaNUJRbW4wZTdrcHlKdi9kbS90amh5dFh5R0twYWZXamxxUVNGQ3NSZU1EMGRyZU9KSWFxdWxrZ1NOdXhaMHk5cVRPZlNIeEkySDY0aVNHaGFwamIxcEJJcTVQY2ZtbjRja2xMVDFVa3NjbFpXMUVvQmp5MnNzZHo2MjNUWVk0c3hsaFNidDFObG9uUzlUTmJMdkczUWZIcmppY0RCUHA1dUx4UEFMZWx5M1RLUitITGZIWWFhU2xwcFk2MWFpcHFwcFFKREtDTFJ4M04vN0RFMEhjK25mcHdPZ3Q2WEpuQkIvTGt4RFQwTWxMVGlsckRQTFBKS05hZWI3aVhPWWpmZjlNUXdkejZkSEhDNzdlbHlaemMvbHlmeUJtdXJLYnE2K3NwOHNYbWpjeXg5OTVxWUhJYjdET3ZqaXVxSVlvSjVCdkN0SEtVa2NmaTg4TzQ0WlVGOHR3RE1BVHkydmt4UnlnUUtEdkwycHkwb0Z2c2VkOExXMHFhWkNtUHRFZzgraWVQbWNaSXg1c3g1c2ZFL3p3YmJqQnVvTitlMkRkUWI4N2pEREtMTnpGdWVNc1VheHJ6c2d0ak5idmNyNHNRR0hnY0RZWEhMR1FvTXZoYmJBTmhjWXNFRnJXNWRNYm9wMnR5NllKQUF2anVvcSt3WXZiY2RjWnJkN2xmR3JwSnEvZnk3L0hFdFFxV21sQ3E3WDVnWHQrNXhtdDN1VjhFRkZJTzVGdWVNckFGZkE0dmxISzJObEEydHk2Zk5seWpMOTNwZ0d3dU1DNHZiRmlManp3VGJjOWZtc2R4NFlDcUFxK0F4bFpGWmZBamJHVzNkNVd4WWpid3hzZ0YvTEJRUnFFUDJRTnNaVlVLdmdCZ1hSVGJ4R0Z1aW5MeTI1WTMzeEpLcTJra3RtUGpibDgxZ0xEd0dQVVhmbnRoZTZPN3k4dm51WWtMZU9YQWF3ekRyak5sR2J4eG0wa3pjNzVjWnJETnl2ak1Ja0RlT1hHYXd6Y3IvQU1oVWlHZW9rMlJmN255R0NXSmRyM1kvYWtjLzN3ODFYREhKVVMrdHQ2bzZLTWZWRzNobmIvT0NxeHFrRlFlNjF2VmZ3OStOYmxUem0wbjRYNk43K1h3L280U3lKNlFETG1ERUcyRmtBWXN2cTUzTFcrUHp0RS9xdDRZYU5xMmRrWVdJWUovMjRTUE8wbVVXenZ6UDlGUTFrdkVraFdTcGVEc1RJT2hJeWpybTJ2aVdlUGhyQTVZM2hEdFlPR2tDYjdlZlMrSklaaEdnRlZGQ29qTitjZVkzdU1DZXRQYUpXaU11UUVCYm1YSW92YllZQmFsaWtuVU8wcVJUWnJCU0IwSG4xdGlyRFU0bnZXQ21wMVM5L3FnKzlnY1U5VnBtSFZYTnB0MHh4RkdaZXpHWklhYVRMNmo5MjZuMmdtMkZwelRCWUpKcFlFazFPOW1qNTNXMncvOEFPdUttU2hNYVMraUVMOHptYVFBZ2pCZmY2T0ZIbXlJbVp0VUZjM0xmYk5iR2FLZkpUcFBCRDJabzkzRWd2YzMzQi83Y2NlU2VzZ3BrcGhHMGN1VHV4S1FlZmljUnl0VnRETEpNNjA2YUttYW9IMkJia1BFK1hoaUl6WmRiS00rWGxmci9BRUthdGFXRmFwdWN3UVp2amlRcFNRSnFITTlveDNqZTR3MCtoSHJHMTN5Nzdjc0ZPelE1Y3VUTGtGc3ZoaUtKcUNtYU9MMUZhSVdYeHhMcTBrTDZ0cytaQjNyY3I0VkkxQ0l1d1ZSWUREaDRJM0RzSFlNZzNQamlTb0ZMRHJ5Q3p5WkJtWWVaeGJRaXRaVjlRY2wzWDRZelJ3UnhzTDdxZ0hNM1A2NFdwYW5qYW9UWlpTZ3pEMzRsV1duaWxFdHRRT2dPZTNLL2poWXp3NmtNYWtzRk1LMkJQUEFWUUZWZGdCMC9oLy9FQUNjUUFRQUNBZ0lDQVFRREFRRUJBQUFBQUFFUklRQXhRVkZoY1lFUWthR3hNR0RCSVBEUi85b0FDQUVCQUFFL0lmNkx6RGFpL2JLQS9uVEpxbjNGRDdmMC9mY1lYcEE1Y21BYWZDYjZLL0x2Qm1BeVEzZzdqelcrTUpZQUJSRXAzTzVnNXcyQ0NaY2d1aGpsNnlqdXhDV1FyK0RiNnZIVHlVVjJ3Y1A5TVA1TkRneUk1QUFwSzgrVGo0eUpWL3NFbDZpa05Zbm1IRUhCVFM0V2xxU2N1QUdUZEJOM3lzOHBreGdsZWgwT1dSRmxMNXlNL1l4NzYySTJNRjBWYUhlaVMyZGl1aWZUaFd3amNqL1M5czNsNjVmbkRKNjlFc24yYnVYQkY2YUlZZmhwd0gyWWpRR01jVk1LbUJySU1oc2Y0WS9UeGdVY0I2V1NjRnJrZkhwSnlFNmtFakg3TEJTeFliWTNvZGV3WVkzOGZvSHd3K1A0MVZGS1pDS0N3eTVGZmsrZ2NYcWpmemtIcGEwc0g2dkdJYm9aTkFjdUkvd2Vya3loUkliRDRaUE9MWHNoZ1pab1VZTmNoTXdWQ0FtWTVNQXhLQW94cWVIT1JZWXBXRTMyTzdYeG0rRVQ1bEV3L1hETWpJVEFtWW1ZbS9CbHFlMWhhMVJvVk1ZeUJna2dtY3B0UldTSHU0a1ZCN3FjTmR2enpTRWhCRnNhM09VYUhLVkZJeSthN0NORkI4d1pPMndJWUxFd2tnYndhN3N5SFkwb0pheVdGV3lzUlZzRW1QRGt2eE80bG5qYzFoeE1WMzB2clJSQ2NUQUV5UUJHOUFBamZnNGNjM1FvVU9VM1k0ckhtd01ZM01Qa25Gd3l6MmlKRXFzTG5JVDJJMXNwRmFYQzNqRU1NTFNISGVoSjJmU3B0bXVOQktWYnh2ZVZoSXpmMjFBQjRMaWNweVIxWmxnZkpIQjNXclN3bTFMZFRoRUlVR3U1REFsYlR6bExrR3pvczBtajV3YmRDWWFWbWl6TDlNZG9aN2hJM29GZW5PRUo1elZTUjFFTzRPc0xiQnJlaS9CYjR3VlJTbVFtZ3NzT1pGS0ZMNCswMXFMWU1obmpHUWE3N3hOcGNJWFM3RUNKWkRCcllxaXVaQ2ppZFlIQ09VSERCcHNpT1Vpa3Y2MG1JdVUwSzFnV2cxcU01a3pYVVk3UXozQ1J2UUs5T2N2OGZoUVpKQ1pvVXlnRGRjaEtTVFg3c2VhVm1NeW9oVWxST21jTnVoTU5LelJabCttQ1k3T0FZSUQ4SnhXY2ppVldFM3l5NUdRWm1iV0FXckdEdXRXbGhOcVc2bkNJUW9OZHlHQksybm5FaVhkeU1hU2lZQjJPVEVCWk5FVWhPQk5ieUl2ejBGSkwyQUNVMGFuNWE5a241eWRjNUE3RVU0YVpNdm1YNnhDZ2V0dHlqSndGTER4a2VqMnlHK0Ztei9Na1NZMEVMRUtkQ1Aydjl3TUFDQVBTWjFqdTJPekdXcHVZL1Jrd0Q1MDVDVm9OdkppMkt1cWQ4ZjhBeG5IS1NoUm5mWDhmeHFnWlFBVmFXcks4a1lSaFdBVE94NTNrZkpwd3NCZWc4WnhEendFTWphTmp2QmlDYTVPWDQ5WXZraFVDTWw2U3hPQ2JQMUJoVU5OazNqUmw3WVphdGJWNHlONVpQUk4rY1BOMDBDUUFVTUZlc25XVnZCWWQ3SHZKNnBFWllsNXBaYm5DTUFFUnJZWjhpWGVwMU1uaFVubTd5U3lzK2M3WWJkTWpUSmpxc0xjb3lJQnJlOTk0VDhlQ0hXOFR5YWNtdmV6a1VqTzBIV0lDZkJtQWcvQmpiYkZJRXVUbWwzaW9nbGUwMmwyZzNySGxQWUVwUVkycS9PYU90V25JSWFSa1VIUW95WHJ6Uzd3QjBFNVp5cUdxODVUWVI2bVowUW5yRkNNaFZTaXREeGsvWk1kcUlFVVBHSjlTcUpxMURWUGVQQlcvSnhaWFFwd09tK0pzQnlwRGVBaHc0aE9ZSW9NUUdwcC9zVnFMY0J1NENyM05leldUamVsUjBnWENwM0dITU5yUUFCQ1Z3cnhJQ0doVU1aTTlQS1VJaGphYjN2RlFFb0FJc0xFaGVUejdpRVFMMVFhelZBZWFsQ1hSdkhNSklnYmVWZTNMYzRSaFFDTmJYSHZlYmpaSU0zdUtUbS9QRmFJa0JWVGw5NUU1NUZxQ3FPc09ZYldnQUNFcmtoOEowUUc5QUZCanFsSVRZSUxwNjR4clVTSFhaeEljbDVPTjZWSFNCY0tuY1k2bzFjV2JiSmw2eEFUNE13RUg0TWNpeVpKazdJM2NhOFlDSERpRTVnaWd4QWFtbit4V290eUtmMHhCbXcwYmRZSk0yNUxQSVRMSThWYkFSQVhyZmVSWTlVUndvelFZYVdJd1FSS1d2TGI5VlhCb0RWK21SUUFHVUJnQW9EakE1YWswMEQwUWt4c1dKak43S3pXS1c1YzVMcm1XTmFPWS9BeVh2MUtFbEsxT0c3UFFYT1d5R1cwTVlrNm5UR2p3VDI2ZU1Mcmc5WEYrV1h6L0FESHBKSVFCMjRXWFFRQ1duaERKZ3lMaWVMcjdJODVQZmhXVnNraFdiN3laQndWUFVwd2RkeUNIWkxDQzlEZ2RpZlVHYklRSGdPWWsrK0VxWUM0ZDhVM0VqZjhBdzNFc1VQU1dENVNUZ2VFeGdHc2hkNnZQMFlVUk13NzRwdUpTOFNyaG1JTmxjL1Q3SWYzeFRjVHpuMlEvdmltNG5uQlpJRnE4Wk42ZG42eVBPQ1NTckU1eUFxMmtkSmVhZnRqWVRHNEV3Rm9tVVBuNnBFQVJHMnE2eWNjOEc4YnN4T1dTNGZaRHB4T2hOUTY1Nkl5R2N0eStTWnl3aXRMVXlwcXU4b09kOXl4Qjg0cWVSckFLS1FVajg1TTZoTUFTWFJJdXNqWGo3V0V0bG4zd091a0dGQUh0VU1qNkwyQ1BVc0QvQU0vZ2tFQXlselIxWG5vMmNBVmNpU2RtMkR4QkJ5VDV6aUFacm9udmxpOFFTTUUrYzRJaTQ2Sjc1ZjhBY3pSZzhaUHpYZXVKNkR3UE9Fd1ZiQXpCK29Fc0lkVGpFcmp1S2tRcURvbzNoQXVHREtDYU1Md1VhV21Na0ovbWNWV21VMU9nZGp5ckhOc1dHSVNXUk1ta1VQOEE1Z1pnamNCL053bFNFQk4wSTI4Y0FxYWg2UDI0RjF5VFdNTkNtWVluM0hhSzBkdGtKSzFncktvRnRPbkR4WjFMc0VEMC9PTkgzKzZqVE1vK09KeUZUOFhlT0hJRmhaN25CZEt2VnVVb0xva2J3NU00SGVLbENLSldjZU90SXBJSjVsdEZOTWxValJPTjBCa0ZVQzd5UnBWS2hVUEtTQzd5Uk9JZ1JwUWtVeVF5WmdYZ2QxRGVESlg3T0JQWWlKN2ZPYThrOFFpbzFzZkR4ajBHSzJJd3V3TVE3aHlhQkVTOCtWUEFGeXZkYUpBQnZzbmJ5eUZLNUxRVXVjOFQ3WnVvZnhnTEdxbjRPUGljRWtxdDFNK3NrZWtTODJSZEZtZ2Q0aVpIRkVKZUFQeVpGMXdVS1EyTVNUR3BNRm9CUGs2QTFoVzFUaUlqeWRsampHaU5IUkpTeVRGSmtDcnpibHlySUR6TE9qRDhBUytzblluY1FKSmlpSnFWc3hnc1ZSZ1VScE1Ra3ZjU1RjQ1B5ZFFJbDRLeUlWemFMa0diTTlEemlycUxWT3hwTk5HMWt4cGFFVXFGVENGYTFxRVlTWEUzQ1J0RlNLYUprdWxaQTJLS1pjdWpPV3FTRGdBV1pSUWkyVlQ2K3hnUmtrS2lXWUNTRWd6anJDUWg5TFpCUUEzQ3REalNESEVnUW1FYjR4SWlGWEZ1QVFWVFM4VkVCSGx1eVdycjZkdXNXWEdsQU93emJHUFU3RWhyM1V2UUtzVGJwMElDYy9rd1BpWG5NU3Y2VUZWSVk1QXRqSzdrakQ1Ui9qeVZnM1Q1a0xEWnBpSlpBdURBTm92UDQ5ZndCTG4zeDJsLzRlY2xmVW01Q2g2ak9wN3JKZnByS0NSa0Y1ampXSTBCeFlYdEp1ZmpMWFRHbVFsUGtNUjRrN0Fjamc5RWVjbW90a1o1aWN2ODZ5bDFNV1l5a2NpVXBNZTA4UUdZMWo4STVQYnZIck0wcG51c3F3UU5GeDFqNTUyRWptMzNLTmVzWmdlOGZoaThtQkJpekJrTlNnZmg2M2pwU1F5YTZlc2VDSzBONU5rQ2RCdklpS0NDRm1WWUlHaTQ2d1VJT21LZjdaYmNjVG92UkhGM2xXQ0JvdU9zWDRjZ1F1M0ZDVndTWjNCc2pqckhCUUlZMDZlc1NjOFdZcHAxR0x5WUVHTE1iUXBTU2FjVGltR0JPQVFteUZ2MGRpSVFyVGdJMW80RFBGb1kvWm5ES2FLanJJUEh1S3laNHN3Q2MyZHNDTDR3dUE2aUgyd3VFQ0NDc1BCaWtwWmVNRWdBNmM1VGhib2ovWDBBbUxRUUdMSloxS2piZ3FBd2l1bmpyNnRuQzFDY1hScUJsbVRHb0lJMkdTOHcwcG52UEUzVGNkVGxtQW1BbWM4VGROeDFQOEJ1MHp0VHo5d2Z0emowTlF6NFRzNk1wRHhTWHNIUitXWEFpUHRCOXNTZ3BsZm5uMXNlWk9UQk1JRURqVjZLTHpMdituSnNZKzhreFQzazhuNk1tcEJiK292cUcxQ1BDUENONU5DUkhKaDVaSE1HTGxqbitsU01oVmxVaHhsS3g0akpiR0ZrUUpxektZT0preURkS2RlQzBUenZDcUIwSm1nb1NXelV0NG0vWGhlRVZpZlNTSE9JWDk1VkZIUEE3Nk11M2drbGZKUE9CWkJrTEcrMk5KNUU2d05tQ25jbnVFTVgxZy9wbkdaQ0pFSWdNOHZXS0pNUzFRdFN1Q2Nqa1VKQUFsalVrMTdUaTlvRkpNV1RvUFU4WXkwUlFKZDd0RlFuYkFWQ1lPYTlQRS8wV3ZBQUoxNFRqallLRmdrTldqZnU4V0RzMU0yVXA3Slk5NHNoRzF0RExHTlRjWkpTQWN5Y0NPZWU4akllK3E0ODBGSFdCVitHQTZBMWpKYUVBNGhkcEJmZ3d3Q0pmRUlKZU1VdnFCZ2tnOUt6cHdzZUNPQWdLN3M5dDRCNjVJUG8yLzhBT1IrN0F2a1RUaWRZaUpwb1N3UlN3ZmJBL2tCd0EwSC9BRC8vMmdBSUFRRUFBQUFRL3dEL0FQOEEvd0QvQVA4QS93RC9BUHovQVA4QS93RC9BUDhBL3dEL0FQOEEvd0Q4eC84QS93RC9BUDhBL3dEL0FQOEEvd0QvQUozL0FQOEEvd0QvQVA4QS93RC9BUDhBL3dEb24veGR4L28wa25xaHpWZi9BTjdaNko2YW96b3h6UDhBL2w4NnM1NEpYOWY4Ri84QTNENURiUE5OOTM4ei93RDlTTVpjcTFOWVgrQi8vd0QvQVA4QS93RC9BUDhBL3dEL0FQM0gvd0QvQVA4QS93RC9BUDhBL3dEL0FQMFBGLzhBL3dEL0FQOEEvd0QvQVA4QS93REloLzhBLzhRQUpSQUJBUUVCQVFFQkFBSUJCUUVCQVFBQUFSRWhBREZCVVdGeEVDQXdZSUdSb2ZDeC85b0FDQUVCQUFFL0VQOEFncEEveUovOVVYa3djTVRnL3dCeWYvZS9qWFgvQUg2bWY4UEhrUllvV0RxUmdmamNHRmx0OWNLR3Fxd3VReHhoMnBHcmhWQ0RLQzZPSFRYVWhhbU1GRTV2bklVTVMrSWxIUmFZZ3VqM2lDY2d6Nk9xRkVIQ3Yxb1JUWDBMNTlFU2lML3d0cTR2QkFxdi9ROE1tK1FBSkpTQk5wU1U0c0lCelFCUXhaUklWNHhlczMwMVJxQWliM3dPWlZWblRGWlBRaXZvZUlrOEY2MDJRVElFQWp3bnNpUUNrUHJRV1ZLSEVkaklvV29oK3RSRlNVZWQ2Y2REVVQvcFArRnJRZllBekNmUkFmNFg5NllSVDZraGlrcVF5K2NuTTR3eEVEVU5xVFZ2RlFyb3ZsRTJaVEJtODBGOGFsby92WldtSjlIZUpaNFpxbEtHWmlDemt1MVYxOGlJV0tKYWFEeEw1eVlKZ2xCTUlMRkFoNFNiUEJTZndwL3dmOXMva203R3NEd3Z1QXB6V2J1T3hFelRtd2JONGRwcFZ0WUs5R0xDMmN0KzhIWE1DWkcwTm5LZlJOUmdkQW9Kbk01RmEwaVFvdWFHS2ROaVNwZ1dad29rdk9MOFR4alc0UUNTd0M4U0lOT1JXcU5QU3F3blBaZGhoaWhSQ3RZQ1Rrci9BSTBDTUdVZFlmQ1FWenVpM2FNT0NXZEo3c09Ja0FnSXhyek85cE9vUVRFRkRSNmhkNUVFbms3aUlnd0FCRE9Sc2dvN0FVRkFsclBlR0MvUkVsWWtrRjhGQjNrMUp4eU1BZ0JNRjhPWDFYZ2xQUVNPaXFucnpRRG1qSmFnUkpEOERtaVhnU3NheUZBaXVuSGZQclBETUFVTzVjNndvMzdhdXpYN01wcnhiRWJjd0FsYUwrdlA0M2t0UUJKMjBVOWNGM0VqWkV3QWF4K09WZkhCd29xSVNHQjR1aU5uK2FRbkQreFQvRUlHMjdsQWxtS3FHSGlNeVJha3lFTFVYL1hYdm1OSnk5enpVQVNUaFlVelpPUi9VR2hzdXUydHlublBzS0JIUTRGNmhjMU5WaEZKZGZMejgwZTZBb21CRWRUOGN3MDBEaHdqQ0VlNm11eHRrNEVGR1htaEk4UGNTQUVRckFLS05VMXQ0L2ttN0NzRHd2bWlqMG03R3F2aXBGTUNVYk9zM0FaVTFjcUt2WG1Ca2ZwZTFCd2dBOGJHNjkxbTFnWWY0em1CdU10OFhkS2xRVHdJYy83L0FJN0w0VVQyYzlMV3JFT29NWHNsZ2N3MDBEaHdqQ0VlNm11aHRtSElsWlFXcFJnOGgzK0xoTmNvQ05BRFp3OFhZekdFeURWVDhDZm1qM1FGRXdJanFmamdYb0p3QUlERUhjYnpvRWxvbWEyb0d2dFhyS2duMHhKUUprQ0g5SXNLWnNuSS9xRFEyWFhiVzVUem4yRkFqb2NwY09iT0E0Q0FhTHdHT3dhMEJISWZWcGUzdThPWlFiRkgwQWVlVVRuQVNyYXJHZnZqV2I0bkFGSVFSVkVXdHY4QWxCYTNvbEVBRldKays4Q0MzblJ2QUdoSUFJSWJ3NTR6alJMQm03R0cvT01VelNwQWlKR0lwUERlTnBRRlF3a05NTmZjNG9Ta3dFVlZvSWVrcG5POWp0SGdFVXF3aVhvOWlYekRzMWlZcVY4cUJlTmdpaFVLUVpsTVgrUDlzZGVWbFNrc2FtbUI0Y0lrcUI1VW9LTzlCWHN5UGU3MitpTEZ5M3BvY2JOTEVFSUtnQmVmMFVLZ0pWUXZnZ2ZPQU1uYWdDNkZ0SXVjN2FrMlFTeGlJeDA0b2tnVEl0WWJNWGZjNmxkTUltQTdpSGRGdlNGaGdwWmRVc3RKZUtpV3hqb0Q0ZXEyRzJ2QWJPV2RrQmc4RG0veHpyQjFCa1YwcXFsSm5QZDhoRVVoZ0t5bmpMQWxlTENyUUtiUmlhcVgzbkhxeWVDSUZBUkgwT0ZtcFdpZ0xLUUpBZzljaU9LUXhRaURLZUZHRUpFVlZYVHppd1RUSXJ5c2hjSTAxZFVEVjYveEhDWUt3cG9FM2xTQW04QTdLQm1vQUowaWl2aXhNaXdDS3I3MGZudzdBUEFPajYvWGk1Vkt1aGhQRzlhcTd4QWRDS0FBVVJTUkZ1dmJvSmZZZ01NS0FzTDV3THYrOTFsVjdaVUYwNjR0SkFqQVlMQ0ZWKzgyRm5JVVVDaUxBUXQxZXhjbSt3Z2JIQVRNbGVmdXJTMGxpZXhwb0I0VGtEc3JWQ3VJd1o5ZjNyUkxBcXhkVzlsYzQ5RlRvd1liS3E0MXZ2T1RFVk5xOHFNbUFET01LQXN1b1VCWWVyem9Wc29FQ0lsQlN4OXdpU3hOL0pBeWhXOUsyOE92S3lwU0dNVFhSOWVsWTRpclJYekZpSUpIZURzSFhkU0VTMnA4NkZIN3ZnMUtCdndKbkdzUFZDUlhDS29WdTlKK0RxMUI4UklZR2dIaWRZUGFoSkRTQU1VKzhKQU50S2FpZzdOUkpvY1lVQlpkUW9DdzlYaWxVTmRDVXhCRUd6ckN4VVlFQUtGRmxNbDRjRmxVa0RxaElrTDFiemt4RlRhdktqSmdBem53VFpsMmpmZ0krczVXUXVFYWF1cUJxODZZMXRURXBsb21WZkdjZ2RsYW9WeEdEUHIrOWFKWUZXTHEzc3JuRU5DYkJ0RjFYUUFxdkxibkNKdUswVGpsSjUwWWFCcVdVSWdBcVFXemtCUVo3cFhFVm5nY2JMYjFJSnFRcWlpcnIva1B5eFdFSzNJTXJ6WVNWMGdlWFZIalZPYVVFRVlGNGt1b0hvTG42blFlQW9Ld3hQUWNnTmtZc0p5SnhCenJpemFJb1FwQkJHME9TV01jVVNMQXRxSTAyRzdBQ3RRVXFrc3F5TDY0VHZSbEVvbjdFbjhIKzh6RFlZWVZSd0FGVi9PbmFYTFRKTllEWTBudlFDRmtWRmI5WVlsVHBFZ1d3VHhnMEVKSDcyYlRYdTFSQXhHWDZjam93MURJQXBjcHgxY0lUZUlJbjhqL0FKTnM1MHdVN1FLUXlMNzBTTXhRcEJYREFSS0o4LzBDSXRCYUlLQW9LVlAwN1M5QzdFcWtTam8vT1VJVk1BS3htaHFUL0ZTY3hCZ0lYUkF4S2g5NVFkV0tOVnNEaWZQOGYvaHNBWDhHSmN2Zi9oc0FYOEdKY3ZIZEtwQUE5Vi9PSnRxL0RDdXZqdXA5NDdwUklRUGlQNXdhNExYQ2hVR0VDM1g1d0prcFFHaEJBQzJnOWY4QUpqUHZLVmNBRDFYbFFxRU9TQWRNUkV1STl0UEdXeVJLUGdmaitjNGVoWXpTYmlWdG5MaGJrUVJxc0NiZkp4UXlRekNRNE1MVUVIbEpoUVZKbjdrOUhwKzgrcEpRaElRUUZvQituSDJzSnEra0dKVFRmT0Z6NkhWQklpV2htTjNpMnl1SnVyRUlQcW5mMS94YUN3WXlvcXVDNGZQOU1kemFwK1dGRWZENDhBZ2hJZDhzL0I4UG5SZjhVaVdsb2c2SHg2T05JOGxFVlJCZlBqMFlBS3BtK3VaOW5WeHBIa3FvaUFqNTlPckFCRU0zMXpQcy93QmZ6eEk3UkdQeCtqOGh3ckhtRXlRYUlwaGRFMGIvQURTRkpoUkhyanhLMzJWSlRHWWlnSnJoeW9rcmJUU0dEUlJFWG9heEVzUndnVUNxQ0hMRkJZc24xWml1a25PbkFtM0hrZ2xRc2RWeDk1MFR5RkEvOFA4QWVaQUVReGE0SXp0RE1qakZPNElTQ0EyUVArL2V4Y0hWTEQ1TDgzbW80aTRSWUJvRVlsNUZyU3BHSGJtbFJ2bkRScVZBTnQ0VUZKSFhMWmg0Q0g5S3dxTFplQ1hNbU9LVmxRU05FM2d2UHd6TlpZWTJ0b2kyQUZLbDJCSUNVd2lVTkVxZG9JZ2hTc0lFbkJ4a052b3h6QjNIamdGTWRNWVNETElRVDE1bG1qWUJKRElLZ3VuVmN2bkUzRjhxVFByMHdIQXdJdnRjSWF6aFFPSWlMUS9aMU42aTVyeHA0azVxMklHRHpuQ1NrQ2NjdzdQUjlEa01QZTE0NHJ0dUVLdjNSWmFkb3dtblpVL2loQUlVdGVpMmlRQ0V4aXR6WGtNZ2dhWHFDOUF3endGRUVwaHJGVE9DeWxHdkRYdUMvd0JHaEE4UGJNMGhqdkI5WHB4SVpoK0JXTVh3ZkRvYjF1S0NCWlFBeStjYlZ4dHN1VEFRVEtoMWxyRm94QmgyN1BpK2RQWkZiL3QzZ0hBUzRQTUpFVkxuQ2Mwb0ZqeDB6blA4UzVHUlZpbkZrWHJHcVhxREtDdUdHVkM3QklzaUVWWVBXZEcrK1gwak5aTitDUE5OYkVPV1VUSVNKSG5oZ0VZYndwM0o4Q01PTzRUS0FtWXN3WFpGYzlTRXNaTkJVbmhLbnRsbEJ2UW5aMkRnSUtLNjkxUVpkRkdNVS93NWtDN0JDWXZhZ29ublJPUnRKaHJoaW5Ha2VmeE4vd0FidVlnQkw2UTNGZ0NKRlFSckRaUGY4VjJjbmc0S1F4QmJnbkJra2hXSjBBSkpGY1VBSVVHNUpZMVQ5bnRYTUVETEJ3Yllod1BBcmhTa2FJTXNXTDVLUHZFZGpIVnRoRENtVWdYaE1nZk8xZ2JNQmRrSGgvc2ZrZG8rc21maUlnb0U1THVjVVNsMG9RWXFoRGtFeEQ5c3VCUkNPQTlJazhGUVVBZ3F2M0ZUcTRKU1VzalRnWUVzTHlYOVRSeWhOS2dPR0F6dmFEc0dmUTlJZjBBRUFQOEFmTHhDT0VHVUg1NGYrSFc0U2hRS2cwMHFwZjNubHp3QXFocHNkT1FDWHNGVWpFbEJHL25XUkpKS2dvQVZocytIS29kSWxvaTE3S0RQNE9JY09CL1lISGVIUjhtV2xJaW1FelBuUHFldEtxdHhMYStmZW9JWXpyS0Q4c0wvQUVjM0RvUU5MWkkwNC9sL2VSWG1vR0VUbVFwUE40aEJrZ1lBS251QUg5SEFjNUZ3eGREN0MvMGN1THNRRUZGQjlQQ244SEtvZElsb2kxN0tEUDRPelZTQktTTVZnSHZ6cTZneFY2S29KUUI3WGxVT2tTMFJhOWxCbjhIV0hIU3BHRTFvYS9oMFdNVXF4SlJOaUUvbzVTeXZVYnY2bm44Y2R1U2dJZUJEUHdjQmlDUHAzL25OZkNmaEo4blVFTVoxbEIrV0YvbzZwck9USVlsOFl1bjY4Nk9RUUtJakgrUW45SEpHTWtDSmxmV0hsL3d5MVFGQnhFK25YcnlFN3F3TU52OEE3MnM1dThXMmllOEZBeGhIbE1lU1pPWW93Q0JSK1RqaUVQSEg0dzNxRmkzQTlvSTM3d0I0UUlSMUFFK3YvcndwQkNxUHdwaDBTT3BIN1l4L3JtRHlpaUpScG45Ly93QTRGWWplUWdSWUFPQ2VyNi80TzM4Q0IrQVljdlU5ak1FVlpyRksvRi9lYzFMWVJZa3hpQVEvRC9LQjhwcWYxVXJ3UllSS2I2REtYN3ZMc3JtR3o0UHcvam01WGNxNnVwYmR2TURsMm4ydmhaZGw0S1NSSk5lakxiOTRvTnVVKzE4TExzdit3dUdkK1FlTFFOUDZHam51dzIwQlFleEFlWUdIR3BFbkpmQm9LMUhUNmNnQ0wxTi83Ui84NW9SaEZ4Vm16RUZ3Qng5eHBvUlB5QUNjd25xLzRjOUdvL09sbFRESDhPZFpLUVNVaENGS0gxbnYrVDVjcURrUnRBQW5pSEoyemZPUkZtMGZYZVErUVFFRlFDcHNEL2hVamw4a2o2QlJEU2VUMGZZbzZtYUFNTVhRcUkvcFNNMVhPQVBnODA4YVNkTVNBU1VCSzVuUzc4WldwcEE5Z25XYjVWQklaVUVsaXN5dlhJeER2SW95RVl6U01PY0V4a0E5Sm9GSElMa0hDY29LS3kzNklJZzdnWnR3U1dLYmtROVZNU2FtQlFRaWZYNXdjbnAzTVlJT0NCaWF4SHdDeEZ3T3pyb1NNWG5rWUlMVWRhVVJTWEZBUHFCbERkZEkvay80S0tzRzB1R21sQ0t1Z0d3T1hMNk53andJVnNFYnZKUmNKQkRNcUpLMEVDV2N1Y2pYVXpCZEx3dXBlQXhoTHpvWmdJRWZRTG9QVmhHUTdwVU5OUjBZUU9MZlUwTXdRQVlBWk9ZZ3dCZEhUVk5WTXZEbElMSlVBT0FJQkZiQWFCRHlJTThNTm40dnpRajBIU0huZVFJWlIraXU4aHJMQU5xU0NMNCtJK3RDbUpkS3lFQTU2Zmpna2lKb0M4Z0ZRcUFmT1BNNU13QUNBQUFBU1ovcC85a0taVzVrYzNSeVpXRnRDbVZ1Wkc5aWFnb0tOU0F3SUc5aWFnbzhQQzlVZVhCbEwxaFBZbXBsWTNRdlUzVmlkSGx3WlM5SmJXRm5aUzlYYVdSMGFDQTBNalFnTDBobGFXZG9kQ0F4TWpnZ0wwSnBkSE5RWlhKRGIyMXdiMjVsYm5RZ09DQXZRMjlzYjNKVGNHRmpaUzlFWlhacFkyVkhjbUY1TDBacGJIUmxjaTlFUTFSRVpXTnZaR1V2VEdWdVozUm9JREV4TURRNFBqNEtjM1J5WldGdEN2L1kvK0FBRUVwR1NVWUFBUUVCQUVjQVJ3QUEvOXNBUXdBREFnSURBZ0lEQXdNREJBTURCQVVJQlFVRUJBVUtCd2NHQ0F3S0RBd0xDZ3NMRFE0U0VBME9FUTRMQ3hBV0VCRVRGQlVWRlF3UEZ4Z1dGQmdTRkJVVS84SUFDd2dBZ0FHb0FRRVJBUC9FQUJ3QUFRQUNBd0VCQVFBQUFBQUFBQUFBQUFBRkJnSURCQWNCQ1AvYUFBZ0JBUUFBQUFIOVVnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUhCM2tUSzZvK1d3anBEN21WdnN5azRyWktjbXFLc3NYS0FhbzZMc200SWFacWRzYTloNFZ0aUptQWx2V1BCYlJYcjFTdWEwM3lxNks1SFdhcStnNnEzNkg1ZmR1RFhHeldpUzQ0cmJPVUMyWTZjZFUxNTc2N01lZVJVeEFlclhldjF6dDNhZUMwMTdkaDJ3LzFkYS8yWlJYUHp6a0xoYjY3OTc0YnY1dWVkNGRXbWQxUW5ieTU3TWNiblU5Ty9MQ1Nzb0FBQUI0N0lRa1ZjSUNkMHljRGh1N3JWU3Z0bXFzM3FqSkM3Y25uMStzNEFBQUJYNGpyNTVYNXg4LzNWbzA5cytpZDNURGJOaTRvSHFsQUFBQVJQbkY3KzlNeFJJaVZzOU5zc1Zseno5VytUT0x0NS9uRE53K3UzZDRBQUFJaWx3K3lZdHRYNXM1MnN6SHpuMGQzQkpmY3VmTExRbklqbnQwcUFBQUFBS3haMFBveTZlWExvNXVuaSs3dEhQbFlONEFBQUFBOHdwbHo3cURaNTZtcGFGbFpTaTNmaGpmbnBGakFBQUFBQURVMmdBQUFBQUFBQUFBQUFBQUFBQUFQLy9FQUNvUUFBSURBUUFBQlFNRUFnTUFBQUFBQUFRRkFnTUdBUUFTRkJVV0J4QVJFeUJBVUNFbE5tQncvOW9BQ0FFQkFBRUZBdjhBMVVrdWtPUDNvWWpra2VMSjhxZ0F6RmFWZVB6K09lNEQrNGM3K2ZINS9IUHZ4K3Zrd2kxRW1jY3lGV3g1M3pjWk5SVTR2R0EvVC9CRjlZdEladExBYXpSTGFidkh1QS91SDc1UzVEaTlrTTFvczB5cW15RStXUi9hQzBGWmZhM1RxNlkvYjgvNSsrMm9zMGQ3TFdGWDRKZzBlaDN6YU4yajNTTmp5RmI5c3hWd1JGellKRjdJeFI5TlpOWGxCTGR0YTB6ZDU1MGRXZ2FHcjg4NmFISExDMmprMWpvSE0wK2Jnd1lCdmZwMEwvcXRuVGRScU5DYnpRTmVPM0RJclpNaVhlYk4wQllHa0ZQWlFYcW43RXM3QmY4QURpcTc4b01ReVBiTm1Hb01YTzZXRHlBYWZRdEtTbHpoak5hblp2UzZjZTZKWUZiQjBlQVo3MDRaSHFkT2M2cSttMFpSejdoaVFzYytwbm4xWlRONHRYODBEQmtRMWVONlI2WExsd1hRMFlzNXlZTUUvZnFBUmVMamhWNE4rWnVjTmp5M0Q1ekVxcVpKdStYNlZ4ektJT3M0WCtGeWlsWjQrRUxQUjNaTUFpMFhOQmluWFpKZmZ5L0RMQ09nSzZWcTc0WXU0cHZ5WVJOMTJSWGtCMDVzT2xoSERMYXdPWVpWd01yREtqQ1NCYWl4UWMwR3ZtblJqSTZlcGgrbjJaSmRNTzNHSzdtakRDcW1kME04SEJpRmhWQU1Cc010RnZWcktVNFBjaURJZHJqMXJnNmVjQ3RaQVlkV3Vxb3lvQTF5ekdLMUpRV0ZWQWRYSUJscExYS0wzQlkyUUFEczdpVm5wRWlJVkFLTm5oQmpwWVpWTmJESmgwMUU0aFVUUVZpbFpVMStSWHJMN2Nhc3ViV1l4YmRST21OdEkrU0JHclB4cXRpeXZ5UUJOazhzSE15R1JXd1JKa1FxS3IrWHVucFM3eHBpK3poYzl1UTdGZVc0YUE0OCtKZCtudUwrU2ZKVFFSUzl0WlRPV3FsTnhqSEV6ZkdLMFZoYWVHK2xOZTcyQkNDdlR6blZuTWpObGFjcy9XMGhHTmEzdTh6dkdkeWNnZG1Pb3pkMnVtSlkzUFlTTHAwZkdFV0RZUlZGMDVwU3JNMjF1WklzM2RNbk8veTRwNk9TNWt3WWlFNXNJM3habGdyZUFxYVFMdXB4K3QyR2NEWkVrNVVFdVh4WUgzRVhKQWdsVVlwWU55T0lYK1J0bEFYTmhDeW90ZFN1Z01LVG1oQ2I0S1pEbkhKeDJCVmVRVzFVV1pRQzhXR1pFaDRvekFROGZ0V25IcG9CQ3JYQi93QWhrVklBRDU5eUZFbjY2STAzcTZCWTdNUXNqeGJwNjZXY3R5UFRSTFM5ckQ5ZlhCYVZyZWpVaHRvRm5IYU9JaGRta2hGaXIxTlRBQkl5OTRVVzZtNFNOdXU4aWFidWRVcm5SQTdZQjcyNnhDMzk4WHMzMUM0eXZRVTN0ODVwdWFDWHVVdU54WGhkeE1OUHptZkNJOVdIL0lhQ3pPWFdaUG5zTmVNTEg4ZkNiNjc4N203VXBOUzJGSjkrWC9WYUI1SDAwNnNsRVpLV29rYm5DYy9lNUhCWFQrUUhaejFoY2NsQ2tsWmpxZytLc3ZTdlhjenpLK2xhanZVai9IdjA0U1dNWk9xOHhDd2hVcklRd2RaMzNTNkdYOGhPZHpIVVYwbDl2dlFDdHFKNDVrS1BRcmhQYndQNkt6UWcxRmZZOW1NdGpOMEZXUlM0RUlMQllVTXFyM0lnMHFXNGw4anp4MVlsamNTazNqQWZweER3SVUydDJGWVVBMUdaeHFlQTNIUTBpNndmNUV1OUhYWkcySDlFS3B2dDFZZ3plWjJlb0xvRTBZUkZoOVdWWUNEQlp5Mm5SWlVlOGNmZ0pGc2ZRRVVEYnhHYzZXbm9XTnV1VW8ySU91Yzh2S2JmRm1GcnZOQUUxSEdDa3QyNjhWaXU4UVVFRDA1OEN4WWsvcWZKSHplU1BtLzdwLy9FQUVJUUFBSUJBZ1FFQXdVRUNBVUNCd0FBQUFFQ0F3UVJBQklUSVFVVUlqRkJVV0VqTW5HQmtRWVFRbUlWSUNRelVxR3gwVUJRY3NId01MSmdjSE9Dd3VIeC85b0FDQUVCQUFZL0F2OEF6VlZwcEZqVm5FWUxIOFJOZ1AxS21DT1VOTFRFQ1ZmNGJpLzNGbU5sSGZCa3BKMHFJeHRtak54OTIrT1IxQnpXbHJhZjVMMnY5ZnUzL1VGRUtsZVpKWlF2bVIzRisxeDVZTkVLaVBtd00yamZxdGlOcXFvU0FPMlJjNXRjK1dMNE5SV1RyQkNQeE5ocUxVL2FsajFUSCtYdGY3bmxtY1J4SUxzN0hZWWpxS2VRU3d5QzZ1UEVZZUo2eUpYUnNqWFBadjRmajZmZHlPb09hMHRiVC9KZTEvci9BTkFrbXdIampXcEpsbml1VnpyMnZpV09UaUVDUEViT0dlMlg0NERLUXluY0VmclRjck9zMmkrbStUd2J5KzUyZXVoQ0lTQzkrbS9sbTdYOVB2dCtwVVVFT3VSUlJhZ01Lay90QjNRSDREL3Z4VGNXb1psaHFtTWFTWFFHelpzcmZ6eDlvWUJ4ZS82T2hTb1IrV1M1dUw1ZmgvUEhEYVNuNGdLR09wNGVLdHNzQ3Z2dDU0KzJFRDFiQktObzFqRWFoZWx1Nm42NDBxYXZkdEhoelZHU09OR2x6RDhUM1hLRXR0NTQ0ZlZTMjFacWVPUnJlWlVIQzFORE1JWmhWc3R5b2J2TGJIMmdvSXAvMGhVMHFReVFIVFZHNnZlQThQaGZEdW5FcWxpT0l4eGxKWTFqbGpIVDBPQXZnYm5FL0MrY2ZsLzBVYWhXQ0puRDU4dCszL0w0K3l6SlZ1NHJhdlRsV1FLZGlXdjRYeHhLT1N0a0FwdUxwVExrQ2k2WEd4Mnh4V2s0YlZyRy9EdE1YbXlBUHRkbWZwK1B1MnhVOFJWVmVTT0xNQURkYi8yeHdtamxyV3FvT0owN25Qa1FHSjFXOXhZZHQvRytKNUhrYVcxWE5ZT0YyT2J2MndlTVV0elB3dWtobUtEOFVlZVVPUHBqZ2ZGSVhMVU1mRktlbmcvT1QxTzM4bEh5T09JVFVkUkRERFExeGdlT1psVk1pOTgyMTkvTytQdExMekppcHFLcldsRktxcjFaWFc1Sjc5ei9BQ3h4V0ozMUtTbDRhYXhZUW9IVVBYNVlnNGhKeGFsYUdvb2pMa3FGQ2haY3ViYkwrRWVONzlzVDBkVFBKUEJKd2cxV2FXTlV1MTdFcFlBNVBMTnZqaFAvQUtJeFV1NnJ4WDdNVk0yc3pMdExBUzNmMTN4eGFsb0s5S0UwTWNSVE9nS3ZtR1lscmp0YmJiRlVOV09vcFkrREd2V05GMlo4MXUvZTM5OE5XdFd3UFN5MExUUjU4aFlTQVpyb0FCMDI4RGZIQlpLeXQ1dUd2b3BKM2kwbFRLVlcrMXNVWEdwZUlSU1VzME1qeVVaVURxc1NGak5yK0c5ejRIRkZYY3hUeTAxWFRzZEtSbEh0Y3BZQkxDL2hZZ2s5amllQ3NxSnhWUnhKcTBkVkVxTWpiM0syQXV2YkV5VWxYa0VWQzlSb3dJclNaZ2ZlZk1MQkxmUEhESVlxOFVhVlBDUld2a2dWam4yODhmWjJtTlJ5MDliREpMTk9pcm1PVGF5Z2kyL3d4S0diT3dxNXJ0YnYxWSsya2tWTXRSRTRwWTVtWS91bE1SR2JMK0xIMmM0VlFWV3FLcnBGVnR1dHMzVGU0Rjc3ZDhSYzI3U2lHb2RhcWJoNFNTWlk4b0tFcVJieDMyN1d4UWNQb2E1SGxrNGZ6WE5JRlhWYStYc3lueTNGcjRwMDUyTVZRb3BKWkk2QlZrWXV1MllsaGxDZWZqZmJIQW9JZUlMUmM1UTY4akxBcmRRdDU0NGhVd2NSaXBZNkd1Tk8wTXFESVVYM2lUM3Vmamo3UTE5SlY2VWNYRnNyUWFZT3BjZ0c1UDhBdGppY2xQY1M2WUYxOGl3RGZ5dmlLa3lxYUJxWUw2WmJkLzhBN3h4U1BoZFJEQ25EblJRSldYSVZ0Y2w3aTl1L1lqdGo3VEdEaVFoaTRZa01rU0xDalpzeTN0Yy84N1loUE9TSm00UHJxb0NsVkpjWEhidHNENSt1S1RpMVJ4QlpXcnBoVHFoaFZWaDlvUm12OEJpdGc0ak5ITmxLdkQxTHFoVGYzOG9BOFA2L2RVYUprOXUrbzVkeTNWNTRtcExUOHZOTHJPbXNkMjg4VnNqNnJOV29JNS9hSHFVWXBxdE5YV3A0ZVhRdElUWlBMSEVnNk93NGhiWHU1M3QyK0ZzS1pPWUowVFRzM01QZVJPOW04OFIwVUJrV0dOY2lrdVN3SHhPUDBiYWJrOCtwcDZwNzN2OEExeFZUTVp4TlU2ZW82eWtIb0lLL1MySjZlUVN2cnlpYVNVeUhPWEhZM3d0YjdWNmdROHZtZVZtdW5rYit1K0k2TmVZRVVVb2xpT3UyYUpoL0NmRHVjVk5Oa215VkVvbWM2N1h6angrUHJoSjVVbU1vUVJ1ZFp2YWo4LzhBRmlTbmxRUEM2NUdROWlNSTBlcXp4eGFNVFNQbU1TZVM0ZUtsMUFqc1hJZHkyL3p4TlZ0bmVXV1BTY014S2xOOXJmTTRvYVFKSkhCUk9KSUVTUWpLdy9GOGNHdmFLVFdZaG5BY2hKQ094WmZIRlRKS3N5OHlRMHlSVEZVa0k4U01QVzVYZVo0ZVhiVWNzR1R5TisrS2hFZ2RvNWthTEk4aElSVzdoZkxDeW9hblVXRTArWnFoajBlV0lxU25EQ0dNV1VNMTdZNVpqTzFJWDFHcHpNU2pHOS82K0hiQzFWUkcrdGx5TnB1VjFGOG10M3dhNWtKbE1ITEZjM1FZdjRjdmxpZU9GSmNzc2JSV2FaamtROXd2bGZGRElna3pVU0dPQzhoNlZQaDY0TTlQQ3c5N0xHemtvbCsrVmZERTJqSElxeUs2NURLU3FCdStVZUdEVUlaWlp6R0l0V1p5eENEOE9HcUoxbEVqeGFENmNySm5UeU5zUXZIckI0WU9XUW1ZbXllV0tPQlZtaUZHeGFDU09VaDQ3OTdOZzA5SHFDTXNYNjVDMi96eFdWYWgybHE3Q2JPNUlld3NOc0NnMDVlV1Y4OFkxVGVJL2xQaGluV0Y2aUV3NXlKRW1PZGkzdlpqNDlzVWNXaThBcEJsaGFHUXF3SGxmRUxHT1NQU2c1WUNLVmt2SC9DYmQ4VWswR3RxVXFHT010S3hzdmxodUlHRmhNN0IzVU9RanNPeEs5amlxaGRaakhVeTY4bzFUMVA1NE1VZzFFWVpXRGIzR05GRFVjb0RjVXJUTVl2aGJ5OU8yRFd5d3NKbUFFZ1J5cXlqOHdIZkhFSGNTazhRc0tqMmg2cmRzVTlUZWRKNElkQlhTWWk2ZHdENTc0YmhHa1dvRGUwYnNUbDN2c2ZqaDBwdFFsL2VlVnk3SHkzUCtNaVdoY2g2YTFaT0ZCNmtEV3lmUHFQL0FMY2ZaK2FsbmtXS3Fyb2tKaWtLaDQyVmo0ZkxGVnpVN2ZvZVlpTHJZa1F5NUEvODk4ZmFKbG5hS3UxWTlDTjVjb2pEWld5ZVFOamEvbml1WDlzZ21USUpLR3VkbmFFOVc0SjdnLzdZbXBxYVN0TE53MXBZbzZXUS92czRBTnUyREZOU0xWVmxGUnBVVngxY2x0dXk3RzU2VDZZcVhqNGVKYVduamdsYVV6NVRsbDdkT1h2aDZPR2dsbWhqcUJUU1RwbTZTUU4vZHRiY2ZpdmlwNGN1ZW81ZWFZVFN5em5NZ3p0bEhtZHNGQXJWUW8wY3p6U1M5ZWE3RUx2MzJ0dVRqaUZRS0ZIYWtXRjhzZFJkV0VuNXN2aGhUVlVNV3BwbVYwV3B2dG10MDlPKzIvZ1BYSEU1WTNhT1NPbWtkSFJyRUVLU01MSXhxVHd4NktOaTFXMXlaL0hMZmUxc2Nka25xNTZmbHFwNlNCWVpqR0l3b0hYdDN2NjRvSzJwSHQ1Rk9iYTE3RWkvenRqaE5SRnpEalVmUERESXd6Z0lUdmJEOFU1dVRpU3ZaOVRPU0dMR3dWYis2TG0zOWNWVk5VMFlTdWllRkVqU1c2U2Foc3ZWWVczNzdZNE0vTEducXVkZUUwL00remtHUnQ3anc3SGRiNDRITTFJeWMxVVNSN1RuMmJxSEI3ZThOamhHcTVoQ3JHd0xlT0hySlNNb3NGQk9YTVQyRi9ENDQ0M200bXRUVlF6UysycDJCeWkyeFg4dXh0amhjMHJGNVpLV0ptYzl5Y28zL3dBWld0N1Ftci9lNW12NFcyeFIwbzF0R2prMVlScW5wYnd4VWN4RzB5enlySzZ1MjJaYlcvcGlzQjF2MnQxa2xJbElKWlNDcDlPd3hOTXJQTFBOWVBMSzEySUhZWUhFdXZtaEhvM3piWk85cmZIRFRTaDFlU0xSbDAzSzZxZnd0aXF6cklCVXFpU0tzaEFzbnUvVERWbnRkUnlydWdsT1IyWDNXSytKd3RUQUpVblhQMWlRNzVqZHY1NzRZUnBJQTBEVTdEVlBVaHZzZnFjVEt6MVVnbVJJM3oxRGJxdnUvVEJlb05SbWFIUWJUbEs1MHZleCtlSG9aREkwRHg2YlhjNW1GcmQrK0tlbmplUkVndGw2dTRIZ2ZURlJMN1dGcWtaWnhCSVZFdngvdmlrYW1rTlBSVThSajVaRDB0NWJlbUtXb2x6NmxNMmFQSzFySEZaVGlKelRWaEpsaDFEa3Y1Z2VIeXhVd1RpU2ZtTXVlV1NRbVRwOTNmMHhCMVRsNFpUTUpHbEpZdmExeWZIYmJGS3FhdVdsbGFhTDJoMlkzdjhBMVAxKytyaFFNcVZUdEpKWnZGdStJYVdHK2xDb1JRVGV3L3hOVFVoTlRTak1tVW0xN1lrYVdqRWJSbW5MM202UWt2WnIyOFBMRWRRYTZuRUVsOGtoa0ZqYnZoYVUxMU9LaHJXaTFCbU4rMkpJSWFtS1dhUDMwUjdrZUgzTlRhSk1LVHgwcnpYN1NPTGdXK24xdzlSSkF5MHhpbWxnY0c1bEViWlR0NGVtT0t5U1V0cWpoeWFra1N5WERMbHpiTjhML1RIT3luU2lFV3MxL0FXdmhITkd4YmxXclpJOCs4Y0k4ZjhBVjZlaDN4TlMyeXlJaXpKdmNTUnQyYitSeExIb1o0SUpJb3A1YzN1Tko3dGg0OTF2OGNWdE1rRWszSzA1bUxyK0lqOEMrdUo2dGtDeFJaYk5DK29ybGdPa2JEcXViVzg4VXRkcDZldkdKTWw3MnhYYzF3MW9XcDZjVktxc21lNjN0MVdIU2ZyaWF2NWRXQ1Q2SVpaQ1ltL1BuQys3MzN0M0J4d204TWJDdmJKbWltekJlZ3R0dDFEYjB4QlRQUU55ODdOSEhNc25VV0NrKzc1YmQ3NDRnS3FGS1VVZHN6cE5xTHVMNzdiRWVJOVJqbXRFMC90SFRJeDNHVml2KzJJS1JtajVpWVhHckpwcUJlM2Y0blllT0phQ0l4dEpEdEpta3MxN1hzcS9peElCVDZRVkZlNGZObHVTTWpiYk9MYmoxdzlFWWRoQnJodzI1M3RhMkt1bWw0ZG8xTU1hVEt1c0NwVmlRTG0zVDdwdjMrZUpPSlMwK1ZsWjBFTWI1OVFxU09rK0lOdS9saUNlMlhVUVBhL2E0L3hOVFRJd1JwbzJqek40WEZzVTFEVGlucDVVZUY1SkVpc0pDaEg5c0ZvcXFBeU10UkV5dkdTdVdWczMxQit1SXpGVlI2Y2ZLWmM2Ry9zUDc0WnBKS2FSRlZvNDNTRExLd0xadXR2VEVsVUpaMmR4WW8wekdNZkJiMkhiRHo2OXFhU3BqcTNpeTc2aUN3Mzh0bCttRUR5UjFGUEFrMGRQREpIdGFScm5QNStXT0tVa1VpaW9yMEt2SmxzcTNYTFlMNUFkc1M4TmR4bmVtTU9jZHI1Ylh3a2hma3A1S05xR3BSMXpkSjdsZjUyK09KYXpJWXFlS21XamlEZDJzYmx2aDJIMXhNd255VTlSTEROTkhsM1pvN1dzZlhLdjB4SkpCVlR3cTFLMU9QYU1TcEo5N2Y4QTVmRDZrbHJzamhLWE5DaXNxNWMxcjl6ZittT0gwN3l6U3kwYWdLNG1kRkovMGhyZkk0NGhIVWNRaEpxbEkxSW9DR3Y0WHUzdWdiV0Z1NXhORlN6UUlKWnpLWXpDZE5BUjJRWnR0OS9yamcwY0VnV0xoNzV1b2U5MEZmOEE1WU5YelZOb2pwUkRBUzZMNUE1dkhhKzJLdW9xM0RTMU9sbkZNREVPamNIdmU5ei9BRXhGVFF0ektTMUVra3J1VDBLU1R0di9BUHVLaDFsV0xtYVhsSmd5WnVtNUlJOVJkdnJoZmIvc3kxUE5xdVRyRDVjdnZlWGpoNU5jU0ZveEcyVmN1b1FUMXZ2dTNyZzF3a1RMeStpRXQ2M3Zpb2FXdHBacFpUZk55emJuYnYxL3c3QzF2bmlTRXlNc2pOTTRhSWxGVXlkN0xmOEE1dmlucHM1azBrQ1ptUGYvQUNPU25hUnhKR3lxL3NYc3BidGMydHY5Nk5VU2FlYjNSWWtuYS9ZZW1Jb0RVTHFTWlN0dHgxZTd2NitIbmcwMGN3YVlGaGJ6Sys5Ynp0aG5wNU5SVmN4azI3RWR4aVlTVEJURmx6N0U1UzNZZkUrWGZFQVNZTnJnbVBZOVZ1NCtJOHUrSkttcWxFTUVmdk8zaGdVanpoWnlRdVgxTjdDL21iSEJvdFVjMEUxVEg0NWUxOFIwY3RRcTFFaEFWRDVuc0w0YW5Xb1hWWE5jSGIzZmUzOUw3NExVMHVxQmEreEhjWEIzOEQ1NGFqV29YbVJmbytIZjZZa25XcEJpVExjMlBqN3R2Ty9oYkVOVUtsV2dtdmtaUVRlM2ZidnRiQ3VwRElSY0VlUCtSOFJxbjE0SU04VHBhMlNiS2hCdjljY1VNOEhFa2ltaWt5aEo3V2ZVNk1yWnZMQ1JjVGlySnF1T3AvZjZwS3Yzcy9mWmJlSG5pZ3JJS2MxU3d4enh0RXBGK3RSWTcvNmJmUEhJNmVycnBRZzFBYmFMU1BWL1RiNDRoa2pNcWNPcFpacHdKcmJ5U2JFTGI4TzU3NHJoUEMwSmtyWnBWRCtLczVJeFdScXBscWFYakFySGl2dThkN3FSZjh2L0FHWTRkQ3k2ZFpVY1hOWXNWOTQ0ODdNM2I4dTN6dzYwcFNSVWphMU15N3M1OGIzOHIvWEZOWHJDQ0ZlRE9WL2RTV0RCMkl2N3kzNmNTVmM3UlRSU1U3WjUxVzJZNTloMzhCYjVERkxEK2pwNUtTR1ZKekxIbDY1UHcrUFplL3lHT0tzc1dsRlZwVlIzWTlFZWNESzZiM3pOK0w0WW5xcDZjMGdOTkJUaU1rZDBCdjIvMVd4S3JVTTBFVWNjc0ZQTDA1UVhIVklkNytnMjhjYzUraTNhYUdnZ28wcDdyMVNMbXUzZjNSZkhEWm9xR2VUUUZTc3NUNVE3dElMNTdYdDczcjQ0b0tTVTNrZ2hTTmo2Z2Y1Vm1zTTNuak5ZWnZQL0FNYS8vOFFBS3hBQkFBSUNBZ0VEQXdRREFBTUFBQUFBQVJFaEFERkJVV0Z4Z1pFUW9iRWdRTkh3VU1IeE1HQncvOW9BQ0FFQkFBRS9JZjhBNnJHNlZSUHlndjZBWUlZYndKOVRCa2t5RzhaV1BueVZ3OWZvaGxBSGVmRjFzL0Q5TUFTTTNHSVpRQjMraHp1RzdCNU9FZzNLVExETHZubzZ3Y0cxT1h3N2NNQllsWTA3Z1g1ZUR0dzJCQkJaR282YlBwVDl4SURsemk2RXp1dkl1cXFueXRmZStueGRiUHcvVC93QVdKS21qSGdEMUUzZzRFRGxQVnRlK0IvR1NrVDlUOTdwVWhITCtQcFpCWWNqZit3VDlZZ2tEdjhBUnVMcHB1QTFDL0RyRWlBRXlnSWFOdU9zNXpGVit0alY0NFgyNGFsVUp5RDMvSHpsR0JGVlhJVkV0YzF4TVlZZUNxTFRwandRK0J6VE1UUVNqN3VHRXRUUWJScm5LWElXbkdCS0NkbHh2R1p5dHpwZ2tRamRUTVJsWGVFVUZiV1lIaU9sWkZJbFhXb095VGM4dUpDb05QY040Yi9NNnlOQkdzZ2JrdzBOTWVhSzM2ZkRnTDVrNEVuTkdVYmlUQkFlRzgxRjNHcGdsQ3k4M0hnd3NGSE4vd0RaT0hJSlp1MGgrVjZuTnJhdHJXMHN0a0FQRlpMeXhFUkt4dE1RbnJsd0ZENUpKN25ibm5BcTdwSmhXSmk1Rkhad0dHWHYyb0V0Qi90L1RlY21DTFVIWHdJVDQ0NW4vcTVOMWo2Unplc2pzTVlGQWZTUE91VVpQYkdHd283c0Vkdk1NaU9qVVppWmVaWTNYVlExM1BQRWlUSlg0SERHRzBwSTBWUWljWWxNNlJQTEdmVGI4NCs0SEd0N2NvNFJzeE9ESXdBQ0Vvdno5dm5EcVhENElSU1JMNFZrU2JGYWV6SEU0dnVJRExGVkNXU1RqekNQNzJlWXVKUWdTS2UyYTVVSXVBSnF4NWxUaUNYV09zVUFDa1I2SWNOQ3RVT3ltTk9SWUp5UlNiZDJJODF5aks5clpCWFdTQVVHQTJCV2ZuUUZKRk9mRU5iM0NEQjg4Vm5XWnUrYjcvTEswYS92cnJJVVltQTBZMUxWQnJpZnNzUXREZ2h1QTdGRjZjS3hFaE85WHhiczNXdDNKdTZFcERxYlp3eGZvK2dZZXVxRkVOdkFmQmt6dUtIbG5uVmhyckNGYXRxa0I0cnJLY1lFdzlYZi9Nb1JTMnV3K3hHQmhGa1RGa3pObjhHaU0vaFJCVWc0NndVVGJiMzVNOXNPamtsS3JPbERXRmJLOFdleUFDTUZYclB4dVhPenZJckhOWUVYVS9KZ0psaXJNa0t0Zkk4cmdIVXJLUENtZktkNCtmd0ZraVBqSFhWTjBPelhGN296Y3FWZDdmVmtCUWlvS2NjVDh6a29NaWNsTnBaTHZ0emdhSGZtRktZeWN1ZG1VZ1dKL3dDN3ZQWXFvdVpQdWIzM25hR2JQcnUvaTYzaVpwV3phNXhBYU5GT3dja2pPUXgxTGkvczhOWE90b2V6QXFyTS9wbFRHTjJjcEh0V3ZEeGZPUW52clJmbkRuNVFBQ0dIWTd4TElxMDc1bFNLOU1pd21rbGlkVWlweVJDM2JVZ25pWmNkTVZESHVOV1M1UFBCdHJlNzIvamdqT1djQlBCSk1QV0Q0dkNiVzIxZTJCQXVDUEFLcWlzZXpDbjRWWlpuZkdDZFFrWkpMT0cram93L29UYis0V1dkL1Bia2lIWm1kMnBFcSs5emhsRUxhMjRMRWZ3ZFpxN1FzTmF3YnZuQWFMMU5adk5hTmRHRDVqUnRFTTl6Z05PSlZlcS9MN01GZFl1bWhrVS9yaGF1aW1HcDhRVldSNXdiWU5DNlcrTXRqd2lwc1N6Wjk4RXBRWU1DQjBCby9lTEdmcXhocG9PNzg4aGEvbDFMTG1QNmNTWThVM0VpZEJhblhneVBEYU9OQnVUNmt5UjV2TU1qclRoL2hrUVU1TUN6cVJUTlgza05BY0VpcEFLTmRtbDNVdzVDQzBSa3AxUGRuTGUrV2s2OFNrMDVRMUlNd2xNMGlXVmh1YWpjNWNUd1NqQXQwQVh0aHhxckM1WUlRdENNQ2VjRldHclhYdmNwU0ZobFA4bVVTZVF5YnQrQ29WTXlwbmlkWWtEd0NTaUdEVE8rbzFXSGdKYVdhVjdudms4S0loTUlMUWd0VEE0aXk4Q0JVRTBFT1BSbTNpQXYrTmdCdFNPYzI3ZG1Pd2d0UUZEcnRrZENtSnBBRHU0NFl5SnJwRzN0aXpjQllYRXlncmEwUzhZQVJrYk15WENmWVBVNDBuRFpXeXZWL2VjWG5TeU5FdEFjWkE3SnB0TXAzVXNldU5CRVl1d25WQTlNMFN2cUFDV2gxWWJ5UHRGRUNYNWNsQ1lJUGNkTFNjckdjc2xtQTJXK2JjZkdoRW1rZ2E5R1VFSllPdVpnWUdld2Q1QkkwU1FqbnNkRHB6ZE04MzAyWHdQR0RIZmFSc2pmczkrMlJMZ1JzQ0VPN0xsMUlHTEpPNlRiakdxTVhPZzNNTUt5YkVvVnJ6RlFoakpUcUFIRjBIbHQ4UmQ3UFQ1UWhZTjB4aitBTEtUTEloeUZ3NDZNVHp5K0tIdWRJN2R5NUxaTWI5ZnJYMnNoZWh5MjZlWisrK3MxTkZKZUs4VGgrbWEzR2dsdWo5eUpOYXF3bHVIcnJHQ1NXZm16NUlQWEcvdUFIV1BqbnJFZkdidzZwbStQYnN6VG9GTGV3ZVJQVStuaWNpTjFDeXlzMG10NUNyZ2lWcFhWR3pYV0k2R0dxUnNIMk4rN0lvVWlydnZneEgvREdSTFZhSHg4QzNsVEJjUWREc0U0OHlZTEZWalVBSWRPWVVkNFk4ZnN6ckRrZm11SE55L0lraFdTQlZzR1c2UGNYeE1FNCtGeEdXb2FDaklRcGhZd0RZZ1E5VElRUzJrSG5BbWZxWTRhNHlHL2JJengycUptTk1VZUNpY1ZjYkVRcEtFS05uQXM1b0diZTNKMHZEakFjNGtZb2txYlFBRlhvdWFuZ0MwVmRNQkphQ1R6Q0V0bUMwUzh5NlhpT0RaWDRaLzNrSjRTcXVHa1VJb01hWW9QcHJDbVdDUTVQR2JKOTliRVQ3L3VSTVZBa2xTKytIbGgycWtvWExEYzd3SGhIMUdTWit3ZFpabW9tUm5Fbzk3dzREcTZIYldrRVV6TEtHY1IyOTgyeUtXSGZlT1liM2JvazZTalhJNXJvai9DVmJVRFhVNVFUbDlRQk5heWZmREc0enNLRVBYT1c1NnNKQXhKRTJrOGNOMmpyTDlzTzRYVTh1a05ZVmlpQzA5ZDBIdlZHNllxYkpuNVlCT0pQQlVBOXFiNDVFb01VQlNSdVFKRFljWWxPWUhVaWwyUFZDVmNYbm9TZEVvMGM0dWhNNXBNdVdtblVCcysyS21NNWpGbzdFblE2emNvOEpic0ZJWlhnY1hhYTNvRjIybEQzTlhqRTQxd2Jna2ZZbldWd3AxZE5FdHZDYlNZeHl6dmVVTG5LSU5PZXlJWWxrY3p6cDc0eTh5MEFUZHFnUlFFeTRUeEZpVHcwQ3IvQUN6bkJORmdSTi80T05WWkp3Rmk2WDlZQVpwUVJLQVdncjFHUjA2R1NDaFFva0pKOE1xRzJhVUFKSVVpUWF3WjUxSWx4WjA1UlZGSkFpczVDT3dxekVWRkZMWXVPeWVocW5EVFFPcEpnKzhaUElwQmdGTm9CQUxMR1NLWVphVHM5OERneGpmb0FXR0JieVhSYmdhVlZORkd1Y0R4b2lBb1EwV2FPS1ZETkNUMXFROW9XTWt1NnUzbUVTZVNVOFpZVUEwc0xVYUZOVkRNWkl6VTBnZFArRGw3MHFFQWh1QmtlaGcyUTJyK1ZpbVdCVlF4YlNRalQ0QU9LdG13d3pPQ1FsMG50UU4vOE9QVTBBVldsbG1qUnZyRGsyUkhxWjJDRTgzczN2SUZtY1d6cDZjcklsVTg2QXhDUEtObUxYa2FGa2xwVFZ4Sk9jbkZSZ3dnR0FFZ0o3ZUlhRGpxcURUT2dkbTdnNDhqS1dWdThBcUlPY2dlU3lKVkpTbFNZbGc0WlRWS2dNVDFCQ2FjdkVyYS9OV1oyU0JnN2h4ai9iQzFsRzZBRGtYZEJwQWFlUXBDRkVuYmNaVHVQUGJhZ1FrYUhVd21wb05RUmp4L2l2QjJLM0dlRHNWdVAvZGYvOW9BQ0FFQkFBQUFFUDhBL3dEL0FQOEEvd0QvQVA4QS93RC9BUDhBL3dEL0FQOEEvd0QvQVA4QS93RC9BUDhBL3dEL0FQOEEvd0QvQVA4QS93RC9BTVM1SDMrdnY5ME9CT1EyUjZmanhoNnV6a2lmL3dEL0FQMHREZTcvQVA4QS93RGpFeXh2L3dEL0FQeDRaZEcvL3dEL0FOdTlvbmYvQVA4QS93RC9BTFFQYi84QS93RC9BUDhBbnQvL0FQOEEvd0QvQVA4QXovOEEvd0QvQVA4QS93RC9BUDhBL3dEL0FQOEEvd0QvQVA4QS93RC94QUFyRUFFQkFBSUNBUU1DQlFRREFBQUFBQUFCRVFBaE1VRlJZWEdCRUpFZ1FGQ2hzVEJnY1BIQjBmRC8yZ0FJQVFFQUFUOFEvd0FxanR4WVNCM3VBL0FTS01obUtRR3QxZ2RCbEltN3VnMnVzNEFRYVBralYrbk5rUjBQdTUvc0dqRTA2TGMwNUJKUEl4UHZuTmtSMFB1L2dKLzhZMjJzVFY1Umo5K2pvQ3h2RjlSa1FWbVRLQzdTY0dKWEdWNk9MaTBzRHdBQ3A0REgxaXJaa1pvb2MvUlcwekc3S09neUE0RXB4SWdaaEM2N0xnUmVJOS9iOVA4QVlOR0pwMFcvMEc3RU5BQlZWNnpjVVdpbmhGQVkrTVlCaFdkT0Z2ZytCUlN4UkU1SDhSNEdxUTBYUkdEOUhMakE5YkVLRWtiZFMvVlFVU0QwSmY1L0FTVVgyRVZHS251YzRHK2tONEQ4S0hoMHlKWkZCeW1LTmNpK1RoVExZbmx0V0wvMFhOZ1hNN2JqOTZRUWtoekd0SU9KL2xieWNKandhbnM2TUJ3SUhFYzIvWnh0TGtINVJSYXlIb2NwTWo3Q1ZZSVF5aGlYd0NrWmNzK0JEN1U1RDhUSmNUMHBUZmd4cDVRRzZpRFR3RjZNYUdsdTdKWkxhY3pCY2lkTEdUSVZ2WmxnL0ozOXBBYkZzNFpaekdUbUtUL2c0UDRsZ2ZlNzNYeGc5S1hRbHR2UWVKb0VENmhCN2VqYm13SEViSXNPbExIaE13VmNzT0pveXNuZ2VHUzBLdlBrZUlHREd0T0FuWlJtbFRkcHhqLzJ2T0gyMTVsZW9RQjY0dCtaV2RvRm1SdkduQ1NBWTJ1S3AwUGdvT09zQ3VRakR0TzAzSk0yZ0E1aGtHdlFRMFkxY3JwemVvYWFMWUxaTW53dXNNQkYzREs2c2ZMdDhhbDI2WWhxWkJCSUFSdzJPV05RalUxQ0l2MjJKWVdKRjFpT2grQXg4T2dIK3BXUmFwdUdWRjlzU0F1TDloMkd5Y1hTWUZvalRhYzRVS2d5bldTK21CeERYMTBDVDZnWmhablFTZ1cvcGdhUXZXQmpaTmFvYVBBNERydko2Y0IvclVzenIxRGdZQ1Y2TUVuMkQ1WUNEZEFoeUVpUmQ2d3ZxK0FCYjAyUHZZS2E0RUwzYXNzTzRhVGtUTTFGbHJrN0dUYVZndzllZTVqcndZVDd1cVU1RmhnTTdKZzRpRGtwUW9hbngvUkIzRFY4RmFpZzhZUENwbVNtVXBLT0dOSzgwdUp4a2FjTWlnNDVoU1NDN3J2V05rcFV4aEpZb21CbEsxQjhXVXVDelVKWTZoZVE0SWk2Y09CQUpySG1FbEZDck9LOE41eXErU0lReGpNT0JXNllPNlZKS0JKMWQ1NW01RTlBbmNyZk81dHRFZ3gyMFNzTzI4NFYvdjBjTGRodjdNWVdFUjRNRG5RSW5wejFuUFVQNEJyMVdQZ2FyQlYvUjdJQ3pPYnVnODAxS0s1eXUwYVRFaWRDY2dkUGtYS1NFdXJLNHByeUtzREJOSXUwNXcvTENTVTZXQkFDS0NFQ0ViRmFOYVhENElyOXFUUmNyZ1BzenRUUWgzYmlwcHlGaEdiUFZoVmhjMndzR21TN2Ezc1Zrb3FJMWpaRHd4NjE0emZiWG1pdnRMU2M0dXhoUVViQ0lLd0d1K3ErVW1EUnl4ZHRJT0xYdHF0ZUhHQXJrWWRYU3FjRm1GT0lwWktjQ3ZJdks0MFlqVENBUVZQNXByTDR4bHVVTEU0UEdoQXd5NGxSZUUyM2JFcWlxVjBGTnZaZVd1OEdyMXUwWjJWUkRqRURUU3RnaWlxRFBuSVlUc0VLdEh0V2lhTDc3M3Uya2txcmI3aUZsSkJpbEhrQTdjQ2tTRnByZkpXU2EwWVdCV0lxdHRBMGVYTnpkN1B6QVFwRG9Vd2VLRW9KQVhRSE9jMlVJWXUwdDlqakhUZEVFQkJBQ1BKcGpDRkp3ajZRNjZtbXNwaGZqK2tYUzN2YXpIaWsyQ2FJcUlZOHJCS0I5K3dSZUVHajg0aEN3QklBVUJSNlpLdkFCTUFBUzY4K3UyVy9mTUJkV1krVG9ZVzlhZ0xEdWlFNzRIT1lIcXJUZjIvNEdjMmR0UnpPSUswdlN3MWswME50akdIQ0dRaFJPM3hPb0xaK0ZnTXIrQ0pRUlVqMGhZUElkZW0zcjNYL0FCZU5Wa0l5bDZxZlRNbVhDcU80VWo5akJ2R0hxaVVYQWVuTExnd1VrUHdxT3NDVm53bHBjZHdmR21KL3JOa1VVSGt6QU1rWEVCbkVFY091bXNid2R0NFcyV1F1MjR5TXd5YXBtRmRiOHppaE42a2tYSWZSbVlueEdhQzZLaXc3Y09KcGhBS1lFZVZ3bEhDaEFxRVBXU2ZGNmRacEE0RmpXT0FJb1BsVTdobkVGY0xVVjlWMGRxbGZ6aWNSQ0dGQXFzd0d2bTV2dTFFbklwVkpoMWltRVFnSUlra1U1MGVYTjFKTlErd2l0bkc5VzBOSWJBcVFEbHNSYkJ1T1p0MFE0VzRrM1RJVkpTYW05Q3N4WmhYYkVJQ2xtRFRWTG1jTVpFejUxa2FpQzJtempLTkd3bUFXc1VZUisyeHZwZzdRQ3FsR2hSaGxVRzRBV09UOGh2V1BOVXlsaGRVMEkxdk9hbzlyclRkdkVSOEdBL2JabEVNN0h0VXVBSmtYeVJiQ0crU1RzeXdiUjF1c1FFOGpKT3NYSGx4cGpwNEtSRG9DQ2pSWHZ5SThxVzE1Uk5kWWszUm9adk9JdDlibFF0TDlSYW16RmdKRllIV09CT1VKNVV0QWVuNWx3MnBKYktZMHdLbzEzT2NaQWI2ZFp2RnRDUXRKUXhzL2t4U1kwblNrNWhQdXdjQjVVMGFVVWpIaUhQMGxibWlIV1pPblhiZGd6M0p3VWFObGdPNzF6WEVXZ2hkdGhzK3hNY3N3bUJWcnE0UXhCeGxpYTBzZExzd0FMZXlCYWc0VDI3Q1loQW5Semc1U1ZOeDF6ZHVJa29rK0l0K2VFaUZXMHh0a3A3d09oaFdHNkRkWDdERXBoZlQ3Y0lSSkpqSmJVWi9ZdHBCNHd1NDZJZGYxb2s4Rm1XV2VCZ1RHUjl2WUt4ZDlXQWpJcHFpREJrN1NQSmVrT1JmTks4NDJrVThNTytDS0FDRUs5cUdVRWY0cFZZdzZCQzhLMXVlT0NiT1VMU01RcTBRYnczbDFnR3lkdUVvd1U5Q1c3QllFL0Q2bm96Q05la3V6aUZtbG41bG5TQ0wwUUlzd0xTUWdHdWk1WlJoVHNVemVRZ0NlTk9kZ2s2TEdRUy9DOWNEQSt6dUYzaUJtc281Q0pJanJ1OTFnUHlZdWFsSVNEVkM3NFRJK0YxeWR0QVNoRm83Y3VPdGVzNkZHSzN6aG9Ha3BDM1ZodE1RV1Vid3VXamthS1dNZk03WW55d29IZjMxbDRVZE1IanVVYmc2ZUp2QzlLdExzU1VrSjh1V3h4cWNrOEU0dWpLdUxGZmlET0dLWGc0cHc4ZlVnTkFRVU0xQ01KZktGVVd5cEpHb1R2bGRkWkwwZUI0VEtVaFZ5aXdGZTIwQVNNT0hmUVg3WU1jSHlHTzdZblE3V2llbXRPd1dtU3RxeFMxcFJLanh3MkVBMTJyVlcyeUlqdHZlUEpFbUJXellaWFhBM2NReUNjTlBuR0RZdTBFeXNxcWFMZHRMMTM1UVF1SkU2NlhoaVd5aHlWSmV0RjF4K2huaE8yK0FvQW5aaCtwTVI4WjNhQTNTQ25IZGIyQ0ZBbklDdFZpWEVFNUFLTUV3OXMyUmlBYUFJM1E0V29TVEFxVUZvTzJBRm0rUzJBUUJDblRBV20rVklOQUsxQUR2Qnl6dEFRNVlSbkNIQUlNckYwcEVCMHlkbnFFU3ZFdUVQVEV1ektHdVJCM0VtL0RERm1rS0FBRlQwamhjVkxKdk1DTWRPdmtNQzc0TWh6WnhOQWViR0ErR1dzTzJIS0FsaFMycUNjaVA2RzgrcTNKMnEyVk5wa1pKVkJjWTdITDYvTFJlY0ltMDhCQjJQakM1b1BBTmdMZDYzNFdWSXZWd1hDY0xqdzNxT3Y1YnRnQ01ieGNPQ0JvYjJHUlFWNVhxZ0ZHOFNjZ01SRkdscGhKUFpxK0hxbEluWGFrTGM1YTlNOHlkMy9wT0ZwcWU3em9rQTdnM2xrNExrM3pzT2ptTHJCYWZjMnRRc0VOTkRMdXRqcUlmN0tVUTRhMDk0MjJwbC9BQ01xMGRRSEMwWnRQNm1LZnlVdld5anBwVWdMc0pEOUsrMURPZXk4elB0UXpuc3ZNL3ZYLy9aQ21WdVpITjBjbVZoYlFwbGJtUnZZbW9LQ2pRZ01DQnZZbW9LUER3dlZIbHdaUzlZVDJKcVpXTjBMMU4xWW5SNWNHVXZTVzFoWjJVdlYybGtkR2dnTVRnMklDOUlaV2xuYUhRZ01qQTNJQzlDYVhSelVHVnlRMjl0Y0c5dVpXNTBJRGdnTDBOdmJHOXlVM0JoWTJVdlJHVjJhV05sUjNKaGVTOUdhV3gwWlhJdlJFTlVSR1ZqYjJSbEwweGxibWQwYUNBMk5URXpQajRLYzNSeVpXRnRDdi9ZLytBQUVFcEdTVVlBQVFFQkFTc0JLd0FBLzlzQVF3QURBZ0lEQWdJREF3TURCQU1EQkFVSUJRVUVCQVVLQndjR0NBd0tEQXdMQ2dzTERRNFNFQTBPRVE0TEN4QVdFQkVURkJVVkZRd1BGeGdXRkJnU0ZCVVUvOElBQ3dnQXp3QzZBUUVSQVAvRUFCb0FBUUFEQVFFQkFBQUFBQUFBQUFBQUFBQUNBd1FGQVFqLzJnQUlBUUVBQUFBQitxUUFBQUFBQUFBQXJzQUFBVjBleDlUMEFBRHptVitlUzh2dTJBQVF5Yy9MdTZmRjl1VmJMdG9Bcnk1S1k3dE9IWlBteGxzajBRREJSQ3JzUTl4NnJKWXVkZjA2ZHdGV2JQZHFxOHB1b3RuZHlkK1hacUF4NWVqQ3FFTmxjSzVUdXM1T3phQmt3OUtGRkxkWmlqRzY3Mml2cUFZOGZSelE4Nm1BMzg2RTl1Q1BWQXg1ZWhsejlUTlppMlIwWW1uTlgxUU1tUFpDcS96elhsVzU1enlUNlFHU2p5TlduUFBiamFxNjlQUDM2d0txT2JPUHNOYzZmYllLdEYyc0VmTWROZDJtZGROdW1jT2ZSMEpOQWMxMGNPZWNyUGNzcFZack4yak5IbytqTmoxb1lFcmZJeGcyemxrODNhUmd5VmRUTDBNTm1heE9XakhxNDl1alpvR0ttNnE1T3FSN2RSNFJqWnRHV2QrUnkxdGsvS3FwWGFOMFBKU0FVVTBScm43UnBzdDFnQUJUVlpiSUFBQUFBQUFBQWYvRUFDa1FBQUlDQVFRQ0FRUUNBd0VBQUFBQUFBRUNBQU1TQkJFVElTQWlJeEFVTURNeFFDUTBVRUwvMmdBSUFRRUFBUVVDL3dDMldDLzFXWUtPWXRQbE00RU00MldaV0NMYXIvMGd5eHRYN2IzUERUZk1MbGgxRFZ6bFcxYW03L0tlcHUxMHM0ekYrUlUxQzF4MzJScmJHc0QyS3cxTGdqZ3ZOaUd0cXdzRmhVL2lKQ2pibGwxcHNadmhkYTJkVjBneVFEYjlGektxUTFLU2RKbEtyWERNZ1ZVY1dxQ2FUK0ZGNVpxTFozUks2enNxckt1bFg5cjl4djRjNHFpNHE5YXZWUzVyc1lDcHEyNUVxR0QrYnRnbS9GVnBremV5bmtlc2dxbnEyL3lkMnRjdTFTa28yOFl6cXRXcmZMankwOURrTi9Hbzg3dTVxbk1SUWlMWnV4OVNUdVMyeTFwZ3R3ZGxmYXpUNzV6Y2s3NWwzeGczMnZHTjFoMy9BQUgvQUdCNzZsbnhMNDRia1FrQ0dwN1FsbThzeXgvODhiS005eGtTYTlvTE1qcStrYnJUZWQzck5QM2VIRFE3S3g2TlM4bjB1V0xidEtGMitsdGZhN0ZlakN3V2F4c3RJcmNqZWR2czFmV3JkUXdQVVlad25GWDFHQ1pNSjF5QnkwVzdKVVlPdUpEanFWcUJOYi9yYkJSNTJmdGIwMURJcXpzU245OXZjSzUyN2N4MjYyNGlueDJWallYanNIZUJkNXFjVkxEL0FCZk8vcE5WWGtCZld5blVKdFZlZ3NheExZYndMRTFLcWVkWStvUmlMUksyUUM0Z25OQkF3YU44MTluYmViakpGK1doZW1MZC9HWU1kZ2hEZ2tBNm9ZOHZYQmsvQTg0eXB3anVVWFRWWUFlMS9rVHRDTnhrYUpxYXBXeGFIdWNGYzRrbkhYRlZXSVJZQUFJZjRhb1ZyVXBzWTJZeXRDa055SzNqZFZ5T2pCVEYrRnJxY1pYWmxPYkdmZEpQdVZtMHgraE5qUW9GR0J0ZHR4RVFJTDNtSUsrTmZ0QzFkeHlaWWJLMkh2WExRc0JaSUhWejNPek1JNmlzRWd4QU12WWhHclFac1o2QzJyVkZyYXZHejR5MUhhTWFsb3M1cTd5cUYwNUV6N2ZUNUQ3YkdDbDl1Qm1sZWxDRXQyaTRMcWpqTXNrVzJ5MDBVMk5VV0FsUUFUd0xBV0p0YTdCekZiaUhDQ3VicEE2V1FVWVRlMUp6ck1yR25Gdk9xMTVzb3FaTmI2UmM5cksyWkJZVE5NMjlmZ0tnTFZyQ3RMQWN6Wm1GRnRjKzRMUXVxZzJBQXVCRGIzeXJoWmFsY2UxbnVwUTF3azNmUWpjS29RZmhhdGJKeE1zSyt3NGtpNlpNVG92UTZaUmNxVWdJcUpBcmdMU04vd0NpYTFhZmJWUVZJSUIvMi8vRUFFQVFBQUVEQVFRR0JRa0hBZ2NBQUFBQUFBRUFBaEVoRWpGQlVRTWlNbEpoY1RCeWdaR2hFQk5DWXJIQjBlSHdJQ016UUZPQ2tsQmprNktqc3JQQzhmL2FBQWdCQVFBR1B3TCt0MVA1V1NZQzFkR1R4TkZlMXZpdGJYUHJMVmVlVHFyWXRkVXFNY2orU0QzYXpqVnJjbEZ4M1JyT1ZHUGoxbldmWXJtLzRqbHNUeTBwV3ZiYjFteVBCVkVqZWFaVUUyc1FjK24zTkg0bFVaZmRUV1BMNHJiWm9tWXQrcjFaYm93M3dsU0NLM1NnM1dEemtZUWFTK1lyY2FvMnJOS1YxVlQ3dlNjS0tkSUpINmdIdENwOTI3MVRRcXkrQk54RjNSeWFCU2FNd0dhRFcxbTRlOHB3Z1BlYUZ6dnFpYTlzV21Wcm5sd1FkTGhTNU9aQXNpa0loald0YkZjeW52QUV1UnBmZW5RUWFXUktob3RNM2NsYjBldG83eTBZY1FyTG9kSTd3ckxxNlBCMlhSV240RXdGQXJoRzhWWkJ0YVYyMDdKT2E0RXQ5TGp4VWdDdmlyTzdSUEhBRkYyY3gzZkphTVpsRW9ESkd5MnMwd3FuRUcwUFMrS0JhZFI1a0hJcTdtRVdUTFFCSFFGMlNhUFN1N1VkSmdOVm54VndMTVFxQ09HU0xNTHdwd2VFM2xEbFFiTlVBNjVqVHJacGxxS0MwNU5BdmNzZ0UzVUJaTjN4Vmh3RlJXRkRyOWwzTmRadnMvOEFlZ1kzTXFCZnNqbVVHaTRLeWFIMm9sdGN3c3pld29rWGJZOTZqSEZRMkszMVV4eGhUZzZ2WXZXZDRCU2RuRGlzemtxM3FnMng0aGFKNHVuMjlBenFuM0puTnp2Y3FpbWFrM1pvVjFzSFlGSDBSUDhBQW96OTIwKzFRZHNYaGFzVHhYbWFoMTN6Vk5kdVdLa25yY2VDbU5mTGRSSUpkeFdxSkc4bU8zWGdxTjEzL2JvQnBOMi9rZ2Y3WVY5Y2wrbWZBcUlBbjBEY1VIbW9HelBrdDExUldGT3NXOWljNkt1clcveVcyMy9YaW92RzZQZW9kcmVvMVZLMGlMQnZTN29ORzNNcXY2ZnZWUmFWNWJ3ZUpDR2pHeSsrREloVGtwSVdzQjJMejFMTnI2S29LY1Uwd2FpNElFWEZPWUpzbXNDaWlRQnU2TUtiTUhpbm82VVVJUGgwR2lQRSt4YVBLMFc5OVZSbjhhS25uRytLZWNnSzJZVFdieHFvTnphcDA3QXBHYWpCTmlqTG95UllMcndpTWt3MHhGUkt2ZDJOaFhPL2NWbzJ3QkxyUjdFQmk2UEhvTFc2WlZMemR6Q2FhMXJlc2Y1RmFRbkdNeXFFeUtnMlNwMlhYR2JpaUNIWHpkY3IvQlgwQlJkaWU0TGJCT05VeXVPQjRLcjNEdGxiWjdVY3RqNHBqZU05QVFjazA0a0FxekVXcWlzUWNRcW4vV1VuL2xXcTJmM0swR2kxbTZzSzRUZVRWVUJubGNvRTJnTnFDdk9NaG81S3NLcW8ydk5YVk5HaTFpdVZBbkhkRWZYaDBFTFdxelBKVE5NZUJ6Um1ScEczaWZHOURIdCthMkFlYTJCM0tMSUhZcVdUa3F0RUtsM2xsMEFDOHlyVVdjaGtQaXJMUkp5eVRwTWttVlpMZ0haVDlyZW9EQ2FXMGFkVXR5UGtzbllOeHk0SUVhdG5aZHUvSlE3VjBtSWsxNUlDZThGWTl5dVBjcmozZkpYTzd2a3RrL3grU3grdjJxMCtHamtKL3dCcXFJeERNdUpWaG0xaTdKUUZadFdjemtGTm15MEF3MzdUbmNZVHRheVFZQnpXczN0YW9jUlhCeS9VYjRoQVdIRnMzUkVjaW9qem1PVC9BSnFBN3NkdEs0OTN5V3ovQUpma3Z3eC9INUxXYm8yOHo4bHFhSVJ2YVFRRkpMaWQreWZESlEwZWJadkZRMHoxYXFqWTR1UXYwbWxPS2cwQnB5ZGtuTjNUSDJjU0gzZ1lJUDBWbTZBVXpXTExJTG5TcElVTUVhVENLSXRPS3NhY2NuWUZiM1hFcWdjM3FhUmZpYWJ2Q3FkSWVzK1BZcUFONUJSbzlaKzlrZ0UxOUtaaGF0RHh3VFM4YWpoWVRRUllpSE5PU2Y1cGxvNG5CQ0RNMW43Skp3MVFpV2t0cFhtcWhqK2RGWURMTGpjRmZyWDJ1SzFtMnZXYXJNZzhGcU9jM2hlRlZvZjFhSXpRNVlyVmJaNnkxbkYzZ0ZnMEJhZ3QreFM4MmlNQmNGNXdZWGhRMWdZT0tNa3VPV0MrN2FDd2ZWRjJrZlpjL0VweEhwWCtRUEZZd1JzUmIzWEtCTTJyUjQ0TFIybWg5cXNRcU5lQVhXUlpjbm56ejlVd2FCQW5TWTJac3FQTzE2cUxyZWtmR0YxNk1hTzA2OEUxVHRHSDJkMDlpWS9aRm1IU29GR1lrNCtVQVhEb3FpVnF2bHU2K3FsMmhpSTJDbUMwVzJhaTBJUmFOSUhCMFNnMjNkT0M4NFhZKzVBSFRBM0NuQmFyWHVwWnV3VkFOSDRsU1pjZlcvSlZhRDJMOEp2Y3FNYjNmMXoveEFBcUVBRUFBUU1EQXdRREFBTUJBUUFBQUFBQkVRQWhNVUZSWVhHQmthR3h3ZkF3MGVFUUlQRkFVUC9hQUFnQkFRQUJQeUgvQU8zQVFFc0V1WC95eFpGcXNVWVZkRjYzOUtBcnEyQjlWdmFtU21UVzd4dDJveGNhQkErZlduUEhMNG1QZW1FTWF3aDhQL2hXQ2FaanFQZEhCdnUwOWxObzlpeDVhaTNXbE5lQk5Ma3NiUDdhakdjUG9hV3d0VS9KUm1ESEVJZHk1NHA3YUU0YitmUDVrRlZnTHEwU21YU2NjbkI2OUtaaGNzUkxubDdxSjFZVkpPV3o1YlZyZVNTR0IxQ0pmRkJBRGx3WFN1TGVBRWgwbGk1UVNZS05ZZ1p4UWxtRUx5NWpLYlVaTWlZbHlucVdhaFR2NksrZjNIRk5nbkJKY0xjMGZlaGQwUmxPT0g4YmhBQ1ZXeFFuSERkUFU4Y1VIWm0wVTlqWTFwTWkwdWN6dkdHZ2EwR0VBMExNeHdEOVZja1NHWVo1THp6TlBpeTRyUkEvTlNEbGxaZ3V4MEVvVkZGa3k0UGlsQkRmQnVNZ2ZCVGpYN0JZMXdaNXAwa2licFJwQzVtOEcxWkh0eGhYb1BGYTRBR0xiMzdLblFwa2J2WjQyZnhNbEpoYVpDZzh0cWV4bDhQU2RETDQzcXhNV01ja21KL1JVN3JWY3R4b2VZdVVDZGNxVTZ3L0hUMGlyTjU3ZytLUnRvYk9qNVZmdFQwdjhWcjQ2RzdvZWE0TlJOTU05NjdCWVpxRmhDM2txTU1OTTIzQ2paRzJPbTlIRkJNd21STkhVcFJra2xkSm0wN1dQd0cxZ0xVcll1Qnl2cTBEc3MwbTJ2YzBnU3VYV0pkMjE3VUV0UzFrZEZUL0FKNTI3UG9sQkFOQnRjK1lueFJhbUlhbG9iV1BEUXBCYkE0TlBFbmVzcU1DY0xROVltZjdVMUNEeEI5WjhWUGRIWVExZnVxVXMrd3RLdkRTdHZmSFpmN2VzWkdBWXp4M3JYSmUxTFBjOWl2dTd2d0xzdU9laGY0anZVaHpnK3hvSHJXRlFBcVlIWjJHNVRUWER5bThiKy9pb1dFVHJkejdwMG95K0ViYTVoeC9Xb05YeVc3cTBqS3dpVU1jV3FjT0JCV2hOUGlnQlVTU1hFY2VmbG9rY1hyL0FIL3J4UkR0enQzYi9yejBDQkV1QmxxMHMzUmlyMWVsUE9mcWd6RWQrQW55Zmd2TFNUMSt1OWFwaFJ2REQycUNrdHd2SFdrNXVsaHB6SjcwcG45Tkg3MDJvcEszek9kL28vT3pRSnFXTHlJWTJHZGI1eFVYRC8wT2xYUFM2S0VuQlJZc3NPWmVlOUxVbXpNQ3d3R2lmM05BaXlLV0Rkb1Q3NzBaMDhJNTUrNHZSaWdMZDY5T09sUTNJeXQyM3JxbU9rdys5WVl3QnhGbnQrQ0hYKzVuNGUxRlkzbnFzMVpqcUxQaHJBcXJxZnludzFKRTNxUGgzK3hyUU1iMVZHN3Z4Ky84TUpZRU5XUG5HT2FoU3NMTDhwck1RdTZDTEMvR2svNGJaOGdUSnFod3c5cUlnU1hHbFp2TDUrelRsNTdGanIvWU9LeEFUaWRhbUFJUVpJbTVXMGdjV0U5VDhFVmNTcHZCUHZGTzlaZzlvVXBoaGNIZWxCdHRmVkg5cEVSTkpLTXhxYUcxNkpJV0V3VVROTFNUaDhUUzBzbENWTVBpZ3RIQzd4RjNwdEY2bFUwS1NvbnBhaUZaQmdtSkp6V0VJa29EQXNiQytaYzUyM3BBZ1E2cU9yL3lwQUpjdHk5NkVnWllEcXBTRDVNZVF3ajRuOEE3SzlYNnBTb2dONWhEMW9TWjNwWHVWWWlFZFBkTFFsZ1NMSVpuemdycDBmUkN2Nm95YTJSMFdXUEVWYnM2eHFNenhwRlJ3RmtScFVTS1J1WVRpUGFPYU9vcDByM0tMZVVIVEo3MEU0VTlVRTRNNHA0UVppSVhxVWNwMk1rOXBvd2MyQXlDV3JtQzBSM1JQdjhBZ3RvVEIyYStrMGpTZ3ZjSHpVeFRIVS9lOUZDTjJqOEUwL1NBaEZ5SjNLTmlaNkFhbk1pTEI0SVkwbHlhMEdSZGxXVjd4elhPOHFBU295eUpmVG9heTFNa0xBU3dHbDljNmZFMUdwKzZCZG9kRXcyME9YN29pSyt5ZlpOSFdEb2g5U3JGTWlEenEvRnU5VzlyTjBQN0g0RHdSUTFOeGlXYk9mZXBKTUdpUGtoNlZFb0Iyc3BCbEYxeW90OFBWOFU4QjBGNEtoZDJpRlNrY2Y4QUtpTGl4Q3U1dGlyQkFnWVNHNUhwNjFaSXdrQ0U4djhBeWhBbHpoYVlnVzRZbXJHVTJTVDRxYTVVQ1VyZTFDYktna2RieXZkOUFyaXdIcTNmOXdpVkRyVTJGSnRKcFFPSEhBRWg2dU9hbXpDUlJwWStMeDBxRWJ5c1BDd2lvNWhLRjVhMGtDWUdJVEhtbEJGUjBoUTFpSTBoRklDSDVOcW1KQkZtTGVhTm1BZy94bUVtMk42a09CUC9BQlZPU3M1VzE2dmFpMGR3c0RuYXBnVWtnZ3dIeFExczFYZjdhU0lBc1dibmY0b29aVmxHMWJUYnVVa2xTSE5YdFh3MjhWZG1OM3NuNmpwVWk4Qk1wMVhYS2pHV2JpdmU5UUdyZ1ZTU0d5S29XcHJMQXVpcEQraWsyaXgxVmpaTE5JWDNxbjVYY1BBbWFBSVFYWmI1UEZOZFhkNzlUdTdGZDFpdDFkMm9XRjBtZU9oeTZkNms4a0lqSmRUN25tc24rdmNtT2d4N3k5NlBqUEtFdm05U2tSRG05TSs5SUxXaHNUMmF1NGQwYkh6NzlhVUFzQVRsV0pUR2xxU1dobEVCMVBkVGkrTlpQQ0tJNDd6YUljTWgzb1JlODZZVWtvemlJWHRVT1pLMFhzRVMwalJQSm5vQWozVmN4ak9kM2dmZDhOUWpiaTVPN0ZPaVAzc2ZNVXBzWUpuRTV3VzJ2UU9VZHFXTE10YW1HaEE2UUo3L0FPdHdSSmFpeTZWWTF4ZHNhVE9zQkFiclE0aUZpYkxZWjE4VW9HR1VRWkxNVUJLaE1wZE1FN2t2dlFZQ0lZcUlDVE53N2s2UEZEQk1OQ3g3NTlhMnNONzJhMFk2clVUc01La21TM2tmTE5GTWpDNUhVL0ZITXpHcnE2dExHRkpJa0pTM2VTTzlDZHc0QVpjMUZzV2d3ck4rTVJVSVFscnIxRXR6NXBOM09aTEVQRThIZUtTSXZVTTYvd0Nzb3paRGRWdXg2ZUtHMTVJRzVMbTVGUTBESWtHSHY4VkdNUXJNaTVibWhOSkUyR3dYNWZ5alFicStUUGlhbCtTZWU1UWVxWG9QeFdNSHVwZUczclJuRUxUSDBhOXFRWU83K0Q5bFRQYUQyRDVtZ2prRjBDclY5Ymx2TDlUU1F4RW4yVjU5cVNVRkJhMU4rcFFFaG1iNVRzZnVuSVNUb1NhUnM4eldPbTBZbmpSYWlHOWdGb3NMSHAvcm53WWRQc0hpczN6bncvd08rZ2p1SGJtMVFxMU5pT3BVVUNtbmNDTXVidFJpK2IraGJCMmx2dFFSZUc5SEV4bzFFeUNrU0h4VUFzMjl6VTlPbFhjd0ZHTGlDZGVLdmEyYVU2SWdLZnRJQm1RM3k4VDRwZkFraExEZER2Ti9GR1FrY2JZVERVaWFsaFliQjgvNG1pVWtpVEpSbHdFQlFCZ0Q4SmdIREM1T20xWVZtaUQzWjh6UXdjcEJrTFRGck91MVhkTnVTck80YnRNa0lSTXlqTHJyU0pXRWc3bHQ0cUY4VktOaEdFVWhEQzhMbUJRRWFQTU11WTNxTUYyOWo3bWdpTjNGVEhRd2R2OEF4ZXRzR2wyV1hwcGVRTzRLQUlBRGovN2YvOW9BQ0FFQkFBQUFFUDhBL3dEL0FQOEEvd0QvQVA4QTcvOEEvd0EzL3dEL0FIVC9BUDhBMG4vNk1oLzJ3ZS8rWjIvL0FDZHY2NGJ2L3dEK1gvVE12K2JISC9OazMvcFVYODcvQUZmZFU2L0ZVdVA3VmVQUnkzL3MxYXY5cVgvL0FOZi9BUDhBL3dEL0FQOEEvd0QvQVAvRUFDb1FBQUlCQWdVREF3VUJBUUFBQUFBQUFBQUJFU0V4RUVGUllmQXdnWkVnY2VGQW9iSEIwVkR4LzlvQUNBRUJBQUUvRVA4QWJqdjBvakd5MENDT3Rpd2xzcEdaSWV5Z0UwaGt3cHAwV015QS9LbTZmUTR0eldHNnFYYkZuQVFJMEMwK3lnRG1JTkk0WlRJa21qd0hvd2JOZTNYdWVBV0FqTVgrT3pySkNHQ0FYbG1qRUtIcTdTbXQ3TGtRQUNwRmtDaGxERGNNMUFqWVUwYks4M2VaQWlXNHFiYWdEYW1XU1FLbW9MSElVdUJvQWhsbFR1b0JmRUlNd29RR0tsWkxMdzNnT28wVjF4RmxVRWhha2FtNEVDTlVxd1JaUjRRNWdHWmNXRERTZGdCQVZWeFZ2RUI2VmtSY2dHdEtQd3NUTlJtdHdKZEdkeUg0SFNFVjExeE1BVEZvK2VmMEd3SnRnSG9BdU1iQUNDSFU4SkVUODQ5Z0VjKzhrQjJoejc4Rk9XMVRkTE1GZnBnM0NOM2F0SUZpb2hobGdaNXhvZVZYaG1kbUFoMEdheTlBVjV0aFZGRFhlK0JBaklGMUlzRVlNQzIrQW9Fd1FrdXo3d0JoOFhBUXhDcE95R0RpeUlmYzdnRXlOekVvQWd6SWtjTTRZUXBxUGhDQThQb3hZaG50eXR6dWdyTFplRnpBZ3RpOFNPS0pjNHA2RFNBaGJIYXBJNm5pY2JHSzBvRUtBRUFUTTZmMndBT20yeEhieDdoZmU3V2dKVGM4L1FqZGtCUHVCbWdXYmdBMkxScUVDOGpUdWd6RG9vaXYxT2ZnRWVOeXN5Tm5nR3dweHhHbXExVFhBSjZCY05DeHFPck53WmhBUXVPNFgvd0JBWTNWRjMvQUZVV2NTS2lLRGx6a1B5QkNhd3JEMVFySXdMSVZUQXJVcTRoM0NERmhweEFlb0VxRkxrUHlEWEFtQkFNMjlBalFMVUJnT3JnV09KWjBKc1VKcUhMYkFCMjArSmtkMnRDZVdRRDZMNSt5Z1pGNEo3V0NFRmZjRWdESE9zZytRVkdqWVdJL0lZQlYwTlYzZ2dBeE0zU1FCQ3QyOU1DQ1piaU1BU0NCRU1iNkhvR3VlTktJVlFFeW1FRXF2Qm53OEVDb0NkQUFRRTlUN3BRaUpnKzBEbnQyTWNEcVNVZkNGc3RRRlE4QkpTQnYvd0JnQWRLc0VCc3d5QWdDMGswVytBVDlCSUZKVmhrYWpMb21PVGZKQW9TTXl2Z3ZjUE04QVNtS29VK1lqeUpsVVRvRWE1Y3VoOGc4Y0NIeHhiaFZBdWtvVUFzU1VIQnI0S3lKaitubEN2TExRQUp3Qm8wemdqMW1ib01xcWRwa1NOWTNMUEV6SFJFN3dIcEFxNldFUnJ0QnJ3RnNvWlVDQlRzSks3eERWZ3hGc3JnR29BYnBmZVpkSk1BaEk4QVBGaG9NOHlTbVNFN1dvaVV1anQyQ0R6VEoraW9oZ2tDTTAyUVJzeE1aZmo5M0dUamYyOEpYVUhubFFERVpweDFjRWxpREEwQll3Qm54SlVpc1FKclNOU0wzaXVTamdZSGVjWlJ3VjBNd3FRQ0FXVTlrb1NTMnRDSmd3WnVyWjdheEtQa0VCYXd2Q3A1TUNBNlkyQXFPdUlqRkNKZGdZUVlDS254a2FXNFNKa1pwQmRCZ0pwaHg2d2l4aEQ0M2E1dkJEa1FDaFRFeTdqS0JGRUd3b0toSktLUFFFTjVEVkRPQjVoalMwR3Z0OU1US2JkbUFhK0hRQVcvbnp4aHZtMERHR3FpQjRoOEJXWTJ3d0kxWkxqdDV3SWFSaHdYN0Q4aE5UMHVtdXRRU3F2MGdDbGk5VFFVQWlnWXlMR0FvVGVXaUEwWUdCLzRRb2EvbFVRVDBLc1pydkRPaWhTb0Y5UVlXUm1vSHdmWmZiUndFVGJpeEltY0FteHRBQWcxcVA1QUxIT1FFQUFzeWJUTWpVQS9UNUJtVVFRRlVkU3NzT0FKb2wyVEJ6MzM3QUlrSkx0QThCRjJFSlBrV1hBalF3VzZBbWVCU2tSRFpUbFNKWkp5ZFM5K3FCaXlNOTF3Q05EUi96QUQwTGlpQ1lhcUVUVnJucGN4YkROUWlBTS9FZjBvcDlFQUFEbGJVYW9JaENFNlJIZnZDNUs4Y0FBWHpDUUNHRzZKWUlrSm1LcEFzQ1c0SjRDZ0lzdkMvd09kL29JVXVIV0VPdWZyZkNCQkQyTUJ0RkdpWTYyaEU1anE4RGlnWnhZTjVvaFhhRUZ6RmZ6aUFxcVRxZitBQXpsd2VFczlLZnlFQWdPbDdFTUZBMWQ5UjlnSWJtdVJnUVBzbTJOZmV3QnNGRGRqbkx3Q1pITHFxVUNwZUpxRVNhRUZVQ0tsUzJoa1dLaEV1NFJKa0RvV2I3UDYzZ21WamdzQklHd0lBSVlNOURvMzRXUXFCQ2JRU3drMFJDMzRBa0lpRlNpQ0IxUXllcFlybkNBamVJd2FHNnpLQlRuaGJTa2hLRjhaQ25XMWFYMFFFeDhTNDlSYllLTC9jRUEvLzJRcGxibVJ6ZEhKbFlXMEtaVzVrYjJKcUNnbzRJREFnYjJKcUNqdzhMMHhsYm1kMGFDQTVJREFnVWk5R2FXeDBaWEl2Um14aGRHVkVaV052WkdVdlRHVnVaM1JvTVNBNU56QTBQajRLYzNSeVpXRnRDbmljNVZsN2VCUFhsYjkzSHBJZnNpVGJrdnlRN1JsNS9FUzJaRnUyd1dCYjQ0ZGtHMk5iZmhIWkFTelpraDhCVzhhU29SQlNrMWRoRFJTYUpUUUorWUJrMHp4b0tXT1NOaVlsaEtiZEpOc05KZjI2K2JMYnBvVG1RVWdiQXQwbTdYNXRrZmZja1V5QVRkdjl0dnQ5KzhmTytNNmNjKzY1NTU3N08rYytOQTVOVGZ1UkNtMUhOQktIeHIyVFltRXVqeEI2SFNHY05MUXB4TStOdjljRTlBV0VxTUhoeVpIeEF0dlBQMEdJYVVSSXlZNXMyREw4NHJYYzB3akZyMEpJOWNTbzMrczdmdWRJR1VJcFY4Rkc1U2dJRGw0N3FrQW90UUQ0bk5IeDBKZmVaWFl4d0lNK3l0c1FHUEwrTVBWTUJ2QWh3bzk3dnpUNUFDM1J3RDhLUEQvaEhmZFBiVHowSHZDbkVJcnhUUWFDb2JNb0w0eVFpZmpJVDA3NUp4OGUrWFlXOENMNDlEVElNTnprVWdHcElEeEZNNnhDR1JNYkY2OUtVR3UwaWVqLzJjVytqckxRWGF3RDZWRzcvTHpwWXBZakhkcU0wTUxIaFB2OEdiNXQ0ZmYvbTE3RXlFK2NodlBRYjlCNVRLRzNNWU8raGE2aS8wRGZSOGZRVDlHNUc3VnhQdVl3UmxkQjUzMzBLWG9idmZiRlZzR2VDdWZLNUUvUWVmUWhlZ1h0KzBLOU1Ib0MrdndsMm9udlE5L0YrM0UvQ21JZCtqbG9IOFZHZEFpeWY1bzV3dndBbS9ENytCTjBESy9BcGRRQmFnS3IwYnZVM1RmYkN2Lzd3aWRnNlJPOEQ1NGY0WWVJNSt6ZGRCcVNxRnEwZy9vRzFZditHWHoyVUh1b2NiU0FYc2ZMb2YvYjBRejZldFJBRU4xMWkzdDU2SDUwRVBsdmxrT3NWRlRid20vUmQ5RVo5Q1AwTTNRUDJvME9vQ1BVdlpSdDRWUG8vd3A0Z0tnMHJNZHgwU2FuRjlzcW5xRW5xVk5VekxXSDBkZmdib1BiaDN6NERmUVc1c1BqNE4wWjlDQjZBMjNCQ1hpSW1jTUZXRUR2QUQ3ajZIRzBBVDJBdm9PT29uL0ZQVEIvSGtIN2NTTjJMQlNoZzVGcGhXbDBrWDJNdlFmbTF4RTBoaHJaUlB3TVFxS2p6OTNiMDkzVjZlcG9iMXZWdXJLbHVjbnBhR3lvcnhQdHRUWFZLNVpYTFZ0YVdWRmFZclVVRnhYazUrWG1DTmttTGxXWHFOV29FK0xqWW1PVUNwYWhLWXlLSElMVHcwdDVIb25KRTVxYml3a3ZlRUhndlVIZ2tYZ1FPVy9Xa1hpUHJNYmZyQ21DNXZBdG1tSkVVN3l1aWJWOE5hb3VMdUlkQWkrZGJSVDRlZHpmNlFaNlQ2UFF4MHVYWmJwTnBwazhtVWtBeG1TQ0Zyd2pkYlNSbDdDSGQwak9UYU96RGs4ajJKdUxqMnNRR3Z4eHhVVm9MaTRleUhpZ3BBSmhFcEN1eFRKQkZUaVd6MUVvSm9GMEs5RzVEcTlQY25XNkhZMUdrNm12dUtoRlVndU5jaFZxa0UxS2lnWkpLWnZreDRqcmFCYy9WM1JtZHZlOEZnMTZ6Q3FmNFBPdWNVdTBGOXJPMG83WjJSMVNvbGtxRkJxbHdxM3ZwOExJL1ZLUjBPaVF6TVJxYTlmMWZsby83eEpMYks1VzRHYy9RekFjNGZMSE4wdThVWWtpVi9zWklxUVQ0SjJkZFFxOGM5WXo2NTFmMkQ0bzhGcGhkazZsbXAxMEFNTEk1WVpXOHdzdjdESkt6dDE5a3RZemlwZEhCK3ZzYXBXU08yOTNTMVN1a3gvMWdnVCs3SUpwbWRHVTJMZW80L3B6MVFpQUFEZ0FVNU9KREh6WHZJZ0dnWkcyZDdvalBJOEdqU2VRYURYM1NaU0gxSnhack5IM2twcnRpelhYbTNzRWlHWnJ0M3RXWW5KYmZJSURNTjdsbGJZUFFqN2RRVUloYUNYMTc0d21ZVFlwa2EreTlzbTZQSGpWNGh2akpUWVBZSUZXTnphQVRDRk5aclV5by81ZDVIWFpDQjNrSlNieFZRS1lJWFljZ3NNVC9kczBtZ29HK09JaXFka2NDWDJQV3hJYmdSQzkwUmc1NWtxczBNTHJnUkNOTmNyaGs2ekNwS1FUNnEvSGs3amxHT3QyeTAyaXpTUmRnNFE4UTlGV2t0WFJTSHJtSGJPZXhvZ0x4SmJRNlQ2SmJBc1g1c3A1NDdNMlZJNzZHb215b1FIeUtzOHg2L1lOUzV6SDZJT1pOc3k3alNaSjdJTUE5d2x1Zng5Sk5FQ284QUowWjVKN2xLaUdIbmRydDlEYTJlOWVGblVrVWtITU1ibU9XOHdJYm1QRURLU2NGSk1idzdzcEk5MEhpbG9ROEU0Z2hQcHFlRXJLM0Jnb1dnQmNscEpVcmEvbTNiQ0dMMnFERzFJaDcvQTNSdlVJZjVOUmxxUlRRL09pTlFWaHdVNURzOUhVWjRwY3hVVVVWUFBSanFGRkRBRzFlYkdLem9XVkFHUVVtSkZGQk10VWt2TzhXL0FMZmNJb0w0a3VOeGtiZ1VkR09RcUdqSGswVmowM2NUZUFCVEFoRTFRdk1nUk15V2syM2dpdTFDVHoxOW5tVzZwYkZxdjUyUmlodFh1V0dCZWlCbUdueW0yUkVFbGhjVm1pVVo3OVpENExUaTlNWXBqUjhueWVuUk5GTXBkSHliU2RGVnA4czBLM3UxcldoaFhrTHVOVzBsY1Nhc1d0UGZYRlJiQ1kxYzhKZUdmbm5JaDNkdmU3VDJyaGVMYXp4MzJDd2xTRHA3NXZMZ2ZxM0NkNTJDdGtLVVdrUkVnWW5qREVVaGN3TWJLKzhhU0kwSGE1bHBFRk1qODBqNUVzaTFtVVlUUTBUMFZrMmtVWkJUSW1JaE5sR2JrZ1NxbWpnREdzM3c3ZVIrS3pyVzkwMXROSGNod1pBQkg0d3hJV2FnRWRvWFlPVXdxVkZDZjQ2NlY0b1o3STdVUnVqOGdWUks2RXpNQUdYRnkwZFZickVENUxMU2JiSTRYZ1hFejUyRjQ0VFN1UlpRNGphL1VKSldPNVhEYW5ZTit1UGtGVFFLSTVtb2haSWo2aFZGai9WSDBDRTdrdDBaU1lhMG8wTlZKOE9BYy9GQjVsZS8vd3pVYm1yR3gzQjV6VnlDbE9oVkpRblppbWk4ZTZPR3lrc1JIMnpYNCtvU1NCU2toSTAvVXI1aGZPaUtwWWRiTWllVUJKNndZVVNjaCsyWDRaVzgyWGs2cXNheStYbHFDMWNHRWRwY1lDOUZXV1JiSGxGc3FNRTIxbGxjeGRyb2Qrc1R0OE94NDc5T21UdmVHM2l2cDJycWtaZnZ3UWRlenBCWFRNelRyYUgvL2pzZWx2akpYKzZkNFBpRSsraFkrWk1hWWR6cGVGeUMwbURlZmo0V3c4ck1KcDZlbGE1NUZjbkV1YzRlTFZ6Ym01NXB6RUpwNHRZU2syTGMyUTJKbVRZK0E2NDdRR0Z6TEkvb0Z2bHhPcnJCZzhMQVBhREMrckxlSXJtMjJoS3NwcktSdTRtb2xOdWl5Z0twZXlhcHJPVmxOS2s0V21wcVpmbm0zcjIvL1M4UGJ2YmF1K2xzM1ZyS2xaT2FYRHNVbE5vYWVDNWs1N0FZVmZaL0pyT25XT1BXL3VQZmd2OXk3dk8vTE9qcGpHNmQ1U2UzMktaZlMyS25vdTArNXoxZzNXbXlJeDNCMitqZG5BZE1DNWJCbHFFUTJqcVhoOU12YXBzUzhCYTV0S1M1Zm5LMHpPYkRLMnBGaFZjM2FleG1STUwzTHBEV3k1SzE0THd5a2pmM1lDZVJrWnpIWE1zMmk5clpZbTQ5RHIxSlFBNDhvWGRBYWRRUTl4TDgvTHgvTFFhbUd3ZVFJTURUOUtLUmlhTVRaMTlWc0c5bmxMU3dZZjlCZjNkemFrVWhpSFAxUlFPRE8vZG1XT3BiVWljOHdqdE5vTG1PWEtKZVdWK3NwV3E3N253Tmt0ZC83NFFJK3V1S1VpTHIrc01pMjhqdmw5eDUzWjE4NnYzOU9kdmFSL3o5RDhmTTdxcjhsanZRTmkrQWpFc0FJeWQ2TllFbTgxV3MxV21zM0VyQkxIVWVrVVZjbzc0N25HbWNhOWpYUmpvNU0xTktXa1ZEZHBXUkpNbXEwa0tPaTB5YzJWOFFhNDdZbWRHZHBjdTZ1WWhMV01BSkZVQlJ1ZDlxeVpSTllHTVNaSmFMc2NEUzIrSGx3N3JvQXNKTU5XNWhLSUFCTVpqYVY2TlMxazUrVUxhanBacWFiMU9vT01FSDYrL2M3VkZuSHlZZmM3K3J5bDJWeDVYaW9iL3JtcVp2enh3SS9lVWlZTEdYeFdXa0ZCY2RZZC9qaEZSbDJuNzdPdkZMZFhtV3BXVlBhc3lOS1p1N2UyZSs3dHpNWE0waFVkWlhxMXNLSlkzVFM5MnZyS21mQ1g4cW9MOVlxSEZIRUtadFJmMXJFMGs0cWxjTHpRVU5YV2Fta2R0SkZmbDYvQVBLd0N2RGhVOFN5VGp0UG1GeTZJQmtnRHJUYU80MHlHV0dlY2dlN0swR28xc1hwa3Q5c3YyN0JWVHVsRW14VUdiVjZMTFpnTVU0NDVKSUFwaTA2Ums4S1F3bFJaUjJwN1puck40VXNxYlpJQ2F4UnFWVHpONkt0NlF1M0xOaXloWFRIeGpkT1B1c01ycVJlWGhVYTZVZzFMYTJvenF0YUlRcHdTL0hwczRiZE1QTnNEZnEwUlZ4aDU4RWlwdENmUEpCOU9wcE9UVFlvNEp6ZEpiYWYyVVRUY2RtNkdPOHpSSGR3QUYrQm9UdU5LTmNSaUY4VW9HRXFEN0RhYlZVdENCeUhiQ1BSYXJlei94b2ovV0tpd0pjTkNwVGNsUm1laUhDRUxVNEdibi9vT25QbnVEcyt3cHFZNmNiczl0NlZ0dFczMXR0NktqRmg2MjJtY0hyNTQrdG9uT2ZVMlRwM3dna0lWeTJhV05iYjFGQkpNSFlEcFBZQnBGWm80aWN3TEY1Nk5UV3cyRVdDcllSam5xdDZwb3FwYUVFcXdObk1XSExCZ3JRVmJMQ3ZTVk0xWEVoWVNLRmZDdm9RakNYUkNSV2RCZGxwQm1xS1QweVpyckFud1E5ZGVWa1lDWUFQb3lXQWlTOHZhdFJ2SlNuTjViV21KMlN6SElCSU9RUTZIYlhHT0dsSVdwMnFrUnNoVzZCUHhaN0c2N05TMHdnenRCNWlpOEUvSWcwcklzVGt0N3R1U3FTVHpzbVpyVFU5NXl2dEV5N2FDZW1EVmNFMTZhZCtYMjY2OVFIZG50emFVS05uQ2ltVzYvS1pLenVPenRwU2xGNjNaNTc5bWplZzk5dGkxcHdnV1pKMTN3ZHBqUWl2RVJDWlRsMG1abkFnSktYSE9jL0U0bmt3M05ZQVNuOEowR2JXSm1uaDVtRERLTWl3dm1vdkxEVmxRYmtrekdCZU9ESWhlMXJiTzFsT2RIZjRRMHpBQ0ZjWEFPbFAxcmMzdW1hNThhdjJlKzRxN2c0NXJwK2htWVdWRFJZS3FRaFFOMnlhcjFqOHllSzBUMW90bVdDL3VaL3RSUE94REpXSW02a2Nxekt0S1ZFZFV0RXFWbHRUdlVtQ0ZaaUNXMFEvUXlkR3RaNjI4OVd3RXg3Q1dmTGhKbEorWWVLaVFaM1FsYzMvNFV2Z1BjSDhJditqQkFFNE52N2wxeTVZNzc5eXlaU3YxVlBpcDhDRThpUHZnN2c4L0dYN3FvM2MvdUhqeDhtWDU1eWlhQnJ3RzJWOGhJMXA1RXNWQnp1UURQT25wU0tQVlVCcE5aaHAyVXF5QzdZQmRFbUtWN0ZKaGdEZU4xV0F5TzIzUk5GOGJTWGw1Yllwa09jQm1xakJGdGgxRGlqNHlaMkgzMFZON3dwY1dvRnRoM1JOM0QzK2oycjYzZWZsS3N4Wi9qOTcycC9zZ3k3dHJ0L25zU1hIek1mSHAxb1lsVmFjais4bE84SEVUN04xcXdHeVpxSWI5V2xOQ3ZFdlRLZnRqU0VnMXNHSEhLQVowT21YeVFDeXRoRDA3c2lYS2UwaDAzOGF3WjBRY2svZnN2T2lXdmFubXl5L2YvNC9oZjhNWGRyeHlqejM4MXIzM1BuVGt2cTMwd2R2L1lXdFRPSWQxckpnNE5EcStOand3RGs3dkpibkZ2ZzVyQk1rdFZzZFNzRnpGbWRJTnpuTXBPR1V4dDFKU1VRb3NYdG91T3JLWjJldzM1eFplektNYlpnOTRsUWorS2ZFVGtFZURkN2Z4NFV2cXZNWUtXM2UxaWNRVTFoeE1EMjZiRkNjZmNsL3Jvc1podDgyVnMreEY5dlh3ZXI2dXlwSkFjRm9EdWJVUjFvRmtKS0JXTVdYTWhJZlQ4WEFLSGtuRXFPbUM3cXFPT3FMRE91S25BUTRWT2wxdVJoTWZWeEpIeGFXNU5Gck94UnB1VERpem5ISFIwMDVrdTEwOFJyRFJDUjNaVFppTnRYZS8rbmYzdlh5M3ZYcm0xZGtIWHIyekl2eXp0SXJlNm0zamdmSGEvaW9qbGJYdHh3OTJkKzAvZDllV3N3ZDZlaDQ4dTlXenEzK0o5TkwzNTh6OXUrVWMzQVM0M2dtNHhxSXEwYVJVTWl6R3lNa09NSmhoSWh1bGkyVllwU3VHd0Uvckl5Y0VUSEtOcksxV3NpZVdsdVRDa2xvaFp4MmRqcjEvL0NQZUZUNVByVGg5K2pUak9rMncyUlp1Wi9xWlZ0aW5tOUJxTVdXOURhOVB3ejRPVjVZNjg5VHFqQllGeTRwTkdRU2JGSWhoUnBGbWhTdlBwRlVvVUlNck9VVWYyNGt5Q0RnMmdndzg1ZE9KeldvamZYKytIWk1UU1c0V2xyZllhcnkwc2tLQVErSU51S1hZZ0ZocVVtTTlDWGJ5WXZRak1GS2pRd2NEamdTY3BsbFh0NlIxR1k4eFZmcXQ5UU5mWFdjcEhUcmdzL1M3R2xKWm1tRXBPRlV3alRQZjllWFhyQlFzcXlvek53d0lyVFVGNFhaejIzclJWTGNxc3lIUW1WR1RucFU1dHE1OXp5dGI3dnJSdm5hOXBjV21YMm9yVU9iYzAvT25YMjQ2SGxwT254L2U0VElWM3ZhVmRkOStKcXRqQjRsQkhwelpubVNXbzN3MEovWVg1dUlWT2JnOEZaZW40THdVWEtuSHEzWERPcXBKaDFjazRjSWszRWZoVmdybklhekRYWVlzd3lxOVRxZlg2eER1eXN2S1c1V1BkUG41S0NZbXF6SUxaOW55c1RhZno2Znk4d3YxTThETEFHdVNtdGtzZlJhVkJlMVFRWDZlUWE5UmQ3TkdHV0N5M1JCWTE1bzNZckxwcjExYnRSWmVPN1RtSGVZZjdraVZYekNaMTk1NHNaRkRUa1VXVFlDMFkyeEt6bUpUYXRtbHlTYnFZcTVyY0t1cnlGc1laOHd3eGhXSzVjWDZwTENJQzA4emlYcURUazFUNmtSZGtvWjVEdWRWRGV6cUwxSW9YNk1vR2ljdGNWYVVNTlpydjRrdmIxalpVQjRmYjZ0cnJxOVFVY2x5dmtKSi9IWEx1dHVlSDlCVWY0YTR5TGZaYzN1eXYzckRWODUyNWtsWVZUR0tnZHlMZmtRbDN4V3ZQWHpqWjlWYlA3UENiNVZHMk1GOGFEZTZBMDVLajhIT0RzRkJ6YkJLNzRUVlp3M01sRzF3cWlaWEVkRHZZamUrU2xWVGo5QThQUW4zUEJQSHRET0htRCt3UmV3cFJWZTBoeVJvSC9HQlFscGtoUjBIMFJZNkJYNWhFV2tHWG4zZEQ4OTFuekRTQUllanJSZ1VpTkkwckgzQktNMGdIWG9nU3JPd05qOFpwUld3L2p3WHBaVm9LM28xU3NjZ0hhNkwwckZJalh1amREejRNSFQ5dnc0V1BCT2xFMUFBSDR2U2FsUkxaVUR2bUlrRjdnelZINlV4eXFMVG96U0ZZdWhsVVpwR3RiUVlwUmxVUUg4NVNyTW9nMzR5U2l0UUh2MXlsRmFpVCtsTFVUb0dGVEJ2UitsWWxNRXlVVG9lTFdQNUtLMUNhMWgzbEU1QTU5bm5vclFhYlZNODBCQ1kzREkxTmpJYTRndUdDdm15a3BLbGZKZmZ4emQ3UTBWOHk4U1FoYS9ic0lHWEZZTDhsRC9vbjlyazkxbjRWUzMxanE2Nm5wYU9kbjRzeUh2NTBKVFg1eC8zVHEzbkE4TTN0MTgxTnVpZjhvYkdBaE44VzJBaVVCL1k0S3NMRHZrbmZQNHB2cGkvcFpZbjFWOGtXKzJmQ2hKQnFhVmtxYVg4Y3cyaVVIeExvNy9pRUl4aVpDd1k4aytCY0d5Qzc3VjBXM2lYTitTZkNQSGVDUi9mYzcxaHgvRHcySkJmRmc3NXAwSmVVQTZFUnNIdE82YW54b0src1NIU1c5QnlmVFFOZ2FuSlFNU0g3cEIvazU5djg0WkMvbUJnWWpRVW1seHV0Vzdldk5uaWpTb1BnYTVsS0RCdS9VdDFvUzJUZnA4L09EWXlBYU8zakliR042d0NoeWFDNFBpMDNDTjRjeU9DenNBRUJHbERSS2VJRC9yOVBERWZCUHZEZmgrNE5qa1Z1TU0vRkxJRXBrYXNtOGZXajFrajlzWW1ScXlmbXlGV292MzhiYTFSQTh6RVNiUUZUYUV4TklKR1VRanhxQUFOb1VKNGw2RVN1SmNDMVlYOHNJYndNTys5b0ZFRVZBdWFBQzBMVUhWb0E5ejhEUmFDTXVlSHR4L2VtK1MyUkhNVnRLcUhGYWdMMnZRQTNZSGFRVG9tNjN1aGhFRGJDN3ArTkE3dktiUWVaQUUwL0JmN1h3WHRCK1YrU00wWTZFOUFiWnY4RGtCdkFmRE5CLzBGUWRzUE1wK3N5Nk5pMlorLzFKYS8zdnEvcTdkYTFnbGUxeWdGL3doK0ZsVCtoVFlXTFJUL2xaNytOb1Fpc1JpUnJZUmsyeEhOTWRsMkwyaDB5MW91dVNYQktDVDNOaUZyOVh4Qmp4M1E0ekMwSjRoK3Jqa2sydzRCSDdFY0FIbzBpdllkc045TXlSNzQ1SGFMWXd0Q3ovODFOaVFucHlBckF6ZmgwQzE3dDBudXMwMldoK1FjSTNXak1qZUpsc051WkVXYjVkc0NPamRiSG9yYXRjalVPR2orVDl1RllNWk15amo2NVhpUGdHNGs5aGJaNWpoRWMxVVVvUWw1SGhDRXBtOFlZd1NiUDVlRFR2a2RtVWtiYnJKRElrdmVwTzJpOThHby84TnlQeEhVSnVFWkFOejlNdG9XV1RvaWozRU1ZamdHMUkzK2tZaU5SR1czZXJQb3k4M2orYi9zbTQ2ZWlBUjBGbjNCSmFacnIrSGZPS3U1cTg0RnpuNGxjSVhxK0hqZ1k4cjZhL3V2cVJld0dkWGdKYy8xL3FybW85NlRlQWt1UEZITjhkL0RoZVNBZ2d1Znh4OWRTdWNtTDJGeXFreTdGS3R5U2gvaW1ZdDdMeDYrU0ovN0FJc2Y4RG5PSysvamVWd2dWcjJuNVR6djRYY3ZwSE8vdkZEQXZWTnp2dmNYTlhUdjhmUDRiWHFCdS9MbXdwdlU0WjhlL3luMVQ2OVZjK0pyeWVuT0gvNGduUk4va0p6cW5NZW1FeTlYYy9PWUYyUFBWSE9hbDdEbkpUQ3BFRE5QRjNEVzAvakZVK21jNWhSM2F1YlUzbFBNQ3lmVHVZN25aNTZuTktjeGl6Z29oNkVjeDZ3WXo3enhMTlk4aTAvUVpXREwrT3pSWm82clM4RVp5QXFGUWgzd0hJQVNnSEljeWt0UXprRzVBbVVCU2d3U2NZYW96OHgzU3NlcXVXOURjUjN6SEx0dzdPb3hScHpIV1NlMHljNlRDMmR3cHFoWGFaemZQQXJWUnoxSEx4eTllcFI1cHV6cFhuQXpIKzJGY2hqS2Nad3Y1akRvYWUzVC9OT1RUek5ISGkzZ1hJYzloNmxEQjFNNS9sSFhvOVQyZy9zT1hqMUlsOVNwY1E1MG00TmNVR2h3VHdEWVorVG5jU3lJbVZqN3lQWkg5ajFDNzNzWVAvVDFBczd6ZFJ3NGNPN0FPd2ZvZlFmdzlqb2oxb0ppQnp4bm9GQ29ST1pma3ArVDhOd25TOStRZVUxVTZ6aldpZ1phODZEOVFVcXpIMnYyVy9mYjk4L3NQN3oveW43RlBFNFNNM2ZuYzMvL1FENjNEOTVYOW1ETmJtNDNSUjdXM1lkM001cFRPQkVRVDBRVUpFUGNyQ2JKMmJFREQ5d0RvVW9Ya3pjWGNadUNCZHgwTUkwTFFRbTZrcmdYY1JvMndBVGxjQ28ybkNqaVpsNENkaStVdzFCb0dMZitSRm9HUkY4bmxqaUx1RWxuR1JlQU1nRkptbzVUZTlOc3FiMUtHOTJyZ093WkhNamh2RkE4VUFaY2FkemtDemdPYmNkeDM2SFdPWE80am5tY0xLYmhOYzQwN3ZiK01xN2ZtYzRsbHlYMXNwanVaY3JvM25rY0k1cU1QS2VoY1RkNDFRV2wwNVhGdFR1enVGVk9DemZUaWx1aDVUeFdQK3NzNENEVUtuRjl2TnE1MHBuQlhXbFphS0ZjTGJqRkdjL1ptenVhcVdhbmdXdHlKbk1hNTR6emluUEJ5V1Q0akwyR01uMXZJdGIwYXNzMHZSUkd2YmdNOVhJYXUyWkFNNk5oTkJxcnBrTVQwT3pWdktOWjBDanRJTHVpb2VHdzM0SHdkZ05tQWJ4OWN6M2RablBydkhLaHExV0tkZDB1NFoxU2JqZDVpcDM5a21LbmhIcjdiM2ZQWWZ6VnZ2djM3RUgxbWExU1diZGI4bVQydFVvK0lFUkNiQWRDbXpsblFQVjl3VkF3TkcyV0x4d3ltMFBtSUR6TnlCeVNSVUZaVGdnVW9SZDV1UXBGMkdBUXFzRU9FWWFDd1dBb05EMDlqWW1BTU5OUUJ4VFFvRWxNUi9TZ0JERlVtV1V4TkllbGhWaEd4S0FzSmh5cE1jdVdTSHU1THhRa1dzSFUvd1JuSHNuNENtVnVaSE4wY21WaGJRcGxibVJ2WW1vS0Nqa2dNQ0J2WW1vS05qSTROd3BsYm1Sdlltb0tDakV3SURBZ2IySnFDanc4TDFSNWNHVXZSbTl1ZEVSbGMyTnlhWEIwYjNJdlJtOXVkRTVoYldVdlFrRkJRVUZCSzB4cFltVnlZWFJwYjI1TmIyNXZMVUp2YkdRS0wwWnNZV2R6SURVS0wwWnZiblJDUW05NFd5MHlOaUF0TXpBd0lEWXhNeUE0TXpKZEwwbDBZV3hwWTBGdVoyeGxJREFLTDBGelkyVnVkQ0E0TXpJS0wwUmxjMk5sYm5RZ0xUTXdNQW92UTJGd1NHVnBaMmgwSURnek1nb3ZVM1JsYlZZZ09EQUtMMFp2Ym5SR2FXeGxNaUE0SURBZ1VnbytQZ3BsYm1Sdlltb0tDakV4SURBZ2IySnFDanc4TDB4bGJtZDBhQ0F6TURFdlJtbHNkR1Z5TDBac1lYUmxSR1ZqYjJSbFBqNEtjM1J5WldGdENuaWNYWkhQYm9Nd0RNYnZQRVdPM2FFaXNMYXNFa0xxYUpFNDdJL0c5Z0EwTVYya0VhS1FIbmo3eFhhM1NUdUFmcmEvTDRudHRHNlByVFVoZmZXVDZpQ0l3Vmp0WVo2dVhvRTR3OFhZSk11Rk5pcmNJdnFyc1hkSkdyM2RNZ2NZV3p0TVpabWtiN0UyQjcrSTFVRlBaN2hMMGhldndSdDdFYXVQdW90eGQzWHVDMGF3UWNpa3FvU0dJWjd6MUx2bmZvU1VYT3RXeDdJSnl6cGEvZ1R2aXdPUlU1enhVOVNrWVhhOUF0L2JDeVNsbEpVb202Wkt3T3AvdGF4Z3kzbFFuNzJQMGl4S3BkeHNxc2c1OFc2TGZFOWNTT1FONXpQa0xlZHo1QjB6ZVF2V0hKRWZtRS9JZStLY3pqbndYUTN5STJ0MnlEWHhsalJIemo4Z241aEozekRYa1RQSlhDRHorNHM5Tlh2ckN0dkd2ZnlNVTZpcjkzR1V0RHlhSVU3UFdQamRyNXNjdXVqN0JtMjJreVVLWlc1a2MzUnlaV0Z0Q21WdVpHOWlhZ29LTVRJZ01DQnZZbW9LUER3dlZIbHdaUzlHYjI1MEwxTjFZblI1Y0dVdlZISjFaVlI1Y0dVdlFtRnpaVVp2Ym5RdlFrRkJRVUZCSzB4cFltVnlZWFJwYjI1TmIyNXZMVUp2YkdRS0wwWnBjbk4wUTJoaGNpQXdDaTlNWVhOMFEyaGhjaUF4TndvdlYybGtkR2h6V3pZd01DQTJNREFnTmpBd0lEWXdNQ0EyTURBZ05qQXdJRFl3TUNBMk1EQWdOakF3SURZd01DQTJNREFnTmpBd0lEWXdNQ0EyTURBZ05qQXdJRFl3TUFvMk1EQWdOakF3SUYwS0wwWnZiblJFWlhOamNtbHdkRzl5SURFd0lEQWdVZ292Vkc5VmJtbGpiMlJsSURFeElEQWdVZ28rUGdwbGJtUnZZbW9LQ2pFeklEQWdiMkpxQ2p3OEwweGxibWQwYUNBeE5DQXdJRkl2Um1sc2RHVnlMMFpzWVhSbFJHVmpiMlJsTDB4bGJtZDBhREVnTVRBeE1EUStQZ3B6ZEhKbFlXMEtlSnpsV1h0WVc4ZVZuNW1yTjZBbmlJY005NG9MQ0N6MEFJRXhHTkExRHlHTUhZbG5CQWxCTW9pSEgwaEdNbzZkcFBZbXp0ckdvWTZUMUp2bjJuWFRiSm8yUmpocGk5dDBuYWJ0YnJ1YmJ0Sk4ydTV1NmphN3liWk5HOXJzSTIyM0NXalBYQWxpTzAzMytYMzd4MTV4ZGMrY09YUG16TytjT1hPdWlNL3NENk5NZEFReFNCamRHNG9LRlp1ckVVSXZJb1QxbzdOeDdrOTlPOHVCZmgwaElveEhKL2FXdTE3N0JVSVNEaUc1ZEdMUHdmR0Yzc0F3UWhrZ28zNTFNaHdhKytrZFdUQSsvMzNRc1drU0dKZFd6OGdSS3FpQmRzbmszdml0SStRSDBGOFFnTFozVDJRMDlBL0Y3NVJBK3h5ME4rNE4zUnJWU2ZzWmFNUDhpSnNPN1EzLzdNb05CZEIrR3lIRjhXZ2tGaS81YlBZcVFueWM5a2Rud3RFdktkNzlHTFFmUUloNUUzZ1lQdlRLQkZKRzI0U1JTR1Z5aFZLVmtabWwxbWgxZWdQNmYzVko1MUVPZkRjaERZcEltNlRicisxbFBvZnk2VFA1OXRYZnEyK3Niay8rOW4vVENzVWE4UVJhUVBlanYwVi9sbTU3a0I5Tm9UdUFjL1gxVmZSTmtEc0FmWDQwaEo3NlNMV2ZRMHZRVHk4L0NxSTcwVU1mSWZlWHFBNTlIMlFlUWMrdTg3NkZia043MFR6TTdBY3JBcmdhZTlBL280dG9GL283OUEyZ2RxVEVrbStnUjlHclJJMVdVMjFBRXFGeGtSeEh6NVBYMXZVOVNNNmhiWVRHNEVQUTR4ZDVMYWdGUDRrZXhXZGhobyt2cjdqeFEvYmRnVTdBZHcrYVJMUG9XSHFlRnBJcjdTRXE5REVZdVFjWURXZ0F0YUVKRkdYVURJM3h6K0REK0NROEUralRhUzBEeUw2NmZSVjJwOXpMN0NKZklHVGxmdUNlaGpHblVRZ0R3bVNlMlVvRmlTT3BoVlY5SFRtVGFIVmlOWUMvaGI4SDZIblFUL0VNSURTTjVsY2ZSYnZ3VTFJZGZsWm9Id3owOS9YMmRQdDlOK3pZM3JXdDA5dmhhVzlyYmRrcXVKdWJHcmMwMUcrdTIxUmI1WFRZYlpYbGxyTFNFcjdZek9abDY3UWFkVmFHU3FtUXk2UVNobUJVMmM1N2dseWlMSmlRbFBGZXI0MjIrUkF3UWxjeGdna09XSjVyWlJKY1VCVGpycFVVUUhMOE9ra2hKU21zUzJJdDE0Z2FiWlZjTzg4bHZ0M0djMHQ0cURzQTlId2JQOGdsbGtWNmgwaEx5c1JHRmpUTVpoakJ0ZWROdG5FSkhPVGFFNTdaeWJuMllCdm9XOHhRdGZLdFlaV3RFaTJxTW9ETUFDcFJ6a2NYY1hrekZnbFMzdDZ3U0pBaWkwNmJZRXJiUTJNSmYzZWd2YzFrTmcvYUtqc1RhcjVON0VLdG9zcUVyRFVoRjFWeVU5UjBkSkpickh4KzdwNGxMZG9adEdhTzhXT2htd01KSmdSajU1ajJ1YmxqQ1owMVVjRzNKU29PdlprSEt3OG5Ldm0yOW9TVmF1M3FXWituNjRNcGNVSmFxdVc1dVhjUkxJZGZmdnRhVGlqTmtaVnEzMFdVOUFDOGMzTWVudlBNQmVkQ1M4a2pPM2xPeTg4dFptYk9SZHNCWWVRUHdLaWw1SmRPbWhLZWV3WVQydUFrYmtndjF0UFRsVEIwM3hSSWtGSVBOeGtDRHZ5NWVmTm1rMWszdUNiai82aHVCRUFBSElDcDJVd1hmbkpKUUR1aGtUalNIVWkxT2JUVGRCRUpEdXRnZ2dScHovTnJQVG45dE9mSVdzLzY4Q0FQM3V6cURjd2xKS1dkWTN3N1lId3lsRGl5RStKcEYzVUZyMDJvZjJVeTgzTjZIVmZ2R0JSbE9iQ3FjMnlLUzBqTEFCWVlkZlVBaUJRNlpFNHJOdFMvU2oyV1RUQkJtVTdQMWZPZ2h1cHA1OXVENmIvWnlUeFF3TmtxRTE1cnl2VjlnWVRRQm9RUVN2dW9mZEhwZ0JHaElMaG9xazEwWDhMQlJ4UFpmTXU2UDZsWjdWTzlBWEZJZWxnaXV6V0JncVBwVVFsSGV4dWRtV3VmQzdhbFRLQzYrTzdBSmVSS3ZyNVl3NW1lY2FFYU5OaEdoWTJ0RUZkbDdYT0JzZkVFR3pTTndVNGI1d0ltYzBJWUJBY1A4b0h3SUEwMFFLamlkWmpPTE02WUlLMTlnYTVldnF0N0tMQTViVWlxZzZxVGxMWmZwNFlQbUZKcUlPUVNpbElGRnlBbVpoQUV0Y0RnUEVEd0xZM3duWkNYS3VEV0F1QWlsNFpxU3lNWHdDYTBKZzFtSkNxNDluQmJXbzYycjFFcXBlSFU2bDNUSnFOTjBOUHFOWmtIemFuTFZrbWdtMHRQRENNVUZGVHZXaGRUQ3BrQWVBVFVpQ3lLWlI2TmVTN0FoL2xCZnBKTENQNEFYUnVGUjBRNURZYUllZHBYZmRlMHJnSUxZRUptNkY1clVEQVRIcXZwYW5BVEhXSjd2ZW05cnJ0enJadWJVL0JkdlhOVU9aOVdpTUR5emdTaUlTeHMxcG5FM1UvM00rOEp3U2FHSFMzdTU3bEZRYUI3ZVpKdTJ6bStjMnlPN3cwMGl0S1FRZTR3SGFKejZWRVg3dXByc1ZWQ01tdFo1UEh4N2tVQkgrOGRDbHpTUXVsMXZDOXdrV0RTR213WlhDeUJ2c0FsRGlGQjVCTEtwVXphNEdpRGF1cUJoa0tVTjEwU0VEb2k5a3BFaHRnZVhjSkk1Q25XZUJpTkxwRVVUN3ZHSThDVHBIaUN5S01YZUNsdkVqQ0cvTjNPalZILzNENDRPUmNjcERHT2pJQUkvT0VFNXBzQkhiNTVFUk5aWmtMRmgxc1NHWHdMNWJzcDM1M2l5eWhmRHBHQmpkaFdlV2hPMjg2L20yY1REMDA0ZlJFWmsvWkRwU3hIOWtXTUhJMFg1WklmTDFjdnlxUS9hTHpJRUNEUklrUFpVc3ErS0pjVnZkOTRFVk8rUzJmV2xacDE1amJDclpiZ0IxY25wZjIvL1d5YjVOdFViL0pkcUtjWG9LNVFvRUowVU1nWkxKZ3FJREtqMFVnT1NrNUlTTjVORE1PeVM4bm5oZHI4QnU5QjNRa2QwV20xR3FobzVYTFZrRVlaZEN1d1crRlRIRmFjVWtnVWdpSGZxMUJvdENQeW9KNVJhVWF5OU1pOVhPMWVYdGJYTzZ6RE04dllzVko5eDdHdmYxMkhYVHJYc0ZYbnluTXNWem5SOFBBd3J0NVVXMU5teFl5Y3laV2IzZGhncVROWEY1R2NiRFhoeWRqWHZucjZ2Z2VpV3Q5cnFwVVhWT2UvODZTSzVCOTRhdG9sblBqZUdUTDV6TVZUeDFidUhscHRNZFhXbWlSL1hGQmJNM3lYYit3emg5b3BiaGoxUXAzSk05OUFSdFFxRkRKTVhqSVA2M1VabVIxcUljdWZSYkxVUHEwbUswY3Y2MEZTV09VWGxKbGVxUlJwa2J2YVlkV0M2VzZ3ZWRpMVhGMWRQYXh6T2FxY3VOcVlLK2N0eFdvaVozaHFwTHlaSWE5bU96TXFyV1dWZ1o3dDNPNG5IcHBWNEJ5MmZIRG9KdVliVXVaWGgwdWEvTGFWQjVueGZOdXJqVU1OaGRTWE0yRFllMUFOeTVFSmJSTUtOWVZzb2FPUU9WdUlGZHYwZWpueVNqUU15NUN6VEpJaERNVmVDMll4V2IyNUVvbFBwa0UrSmdkZ3BSOE1xTzRENjF5TzVlRjlWYzVTZ0k3YVpLQ29GZHRKYlUwemNRR0t1T1F4eGVxbGgvNUFnYTNOdXFKeW85RlNwTk1WV1l6RzhpS2RKOTlHVGNPdXE1a2dKR0xYQ2RoOUZyQ3pvSWxMS0JjTXlWYnF2R3grUi9FNWhHOUVtS2xESGJDYXBlU1NVSnJSeVNBRElnU2hDbzFhb2V6SThLdXdpdlVWNTJnVVRFKzJOc09uMWlqQmJHcDFkZlVIcUFLb0k4UFc0WkZoMnF4eVduRk5HWDhOdUs1MEZJaHhZUUN3LzhWWnN6SFE0OG1iRm9FMm1zcDZCNGVkOXE3YVFxbENJUW5jcFZoOVpWeWlrRXZJMjdiTmxtYWZaV1dPbWNpM1BWL2wzOHptMWZqck1pdWNMdU1xenJNUmo5RnBMNE0xRGlYZkpqc2xmNEJZdEZ0b0c4dU41eDdOWmJJRVdLZkd6SnJKWWZNdnpVVHVMOENhQWx4UXNDRWZkV2lNbXV4c2cxT0R6UnFzME9ScGlNYXd3WitmbDJmTTE4aGtUTGZLQ0w1eE9kd3Vsd1BpQjVZSkszTTVkQzVvZ0p1Z1FSMWxIUzdOTnJxcU45WGxxbkhLVVp2cURMeWJ1T1F1T2Mrb01WYlllS3UzTk1kMWNNZEd3WnFqa28zZXByajdoRkQ2ZmUzM1F3clZCWnROcTNhVXVFek8xdkxDYmNYRVpyTjg5N3Q5SzY5VmVHaHN1Wk52TXlQZ3N6TGtndjFjRWE4K1drM2lWVWVyU0QySE0vSk4rZFo4Wm9DTUU5Sk84SWd1QXR0Wmg3eUhLM0VsamJNeVpaYTNzckwyNVZwc1VYZ2pKbXlTK2l3V284TmZyUFZwUjdRUkxhUFZablViVXlzY2R0TmRUUjI1WEwwUDNHaUZwMk80eWprc1hwaTZUSTF6c290SWFwMU1PaUFsWWtBMk03VXBSek1qUFkvOTVCT1lNVGg3M0VNUHRoUnlBK0ZvUS8vSCtqYVdlOGYyMzlVbWhEMmxLNC90Zlh6dnBxYUdMWk85RGVRM1crUERicFd5cktEcVpxKzF5YkxSMU9Bb3FocTZzM3Z3VS9PeEhodGIxN1c2cEtqZE1lTGE3TzJhdlYvTW04M0puMHVrOEI3S29tcDBuMURmVnRWWE5WYkZERmpHTGFTMERNK1c0bXdPZGxkR0JnNG9jWWNTSzFYZVRYS1BuTWhsQVJtV1ZYTnExSlNGSDh2Q1dSU2ZjcERNeXFweDF5elVYSzU1cVVheTBSc3hIallTSSs4dkJJLzA2SXdxWDFhT3pBZnZtNm45bVFyMDVSUTgrMXowZ2pRQ1FBMVRvS3dpVU0yTUcwT28wL0N1VzRzR2lwSXgxdzR0dFdRTlFrYURaUW81WTMxWWdkdmUyYWRZZmFPdzcrR094cDBlUzVsbjlQYlQvdXJ1REg1YjdhWmIvTzdLM0EyMkxlem11NXFZcHpOdFZYYk52K2JaZm5zcDMvWm9ZTkIrNDhkOEE1KzY5OENOenN4WWJvSGR0K3ZRbllKN3NMNmdzd1hPZ2JlUzcwdWZoSE5BalVyUXVOQStrSXUzWkhabGtsTU0zczNjeGhBMzQyT0lsY0ZpWmpwQmNQWk5ISElDdktnc1dvWnY0MC95a0hHS1pmSWhjL0dJTEZqQ21FZFVRWlptZjBBQk1LQm5rR3VZcHREaDViVVFnYlhYMkFtay9DTHNxbTdHZWl6dWRDS1RVQXlzV0R3REpOL3ovdUhsMmZNdk5oNzFQdlNUUjI1WWJUai9teWNIOXIyeSt2TGwrdU5IOTFzK3EweTgvQ2RLUm5mSFlyVG12ZHNZNmM3UFk0WjgyM3ZQaTNjL3UvcmFkMll3d2FrVGdjWkJVL0xuekRQTTExRVI3SXU5UW5rNkRpWXNlTUNDSVJEaXBWaEZBMEdCY1JIeXVsaEpFNE1mWTdDWWZndHArbVZxSzd5UnpNT1pKTE5RVytJM2FDWDJIcmx4UFJlRHA5M1UxZXVlcHRrczVlSGgwZys3ZGxOZE02N2JWT2VTMnhtNkMxSStiaVoxVE02YVordDNlaXZLT3NadXY4L2ZFbkV4RWtZaFZXVnUrcktodUxTaW9PL1lMZFhnWXM3YzR0NVM0QkU5YSsyN28yZmdVNmNQM2xobHpDWU1ZQ2hYSGNqU1owcEhIM3NoU0QyY2E2azJBUVlua204UUJmTThKR29MS2hPTTJXZUtpdENaeTZxWFZEOVNNYXI4UjNpdDVoSHBPWlE2V1laaGo0T3ZTcTg3U3o1MHR0eG00R3o1QlpXY3djQlZGdVRiT01QODlZeWI4eXZOQm9PNU1wODJvSlA4OVhVTWNaLzZJRy85V05xRGNsQVY2aEhxaHB6NG9BTUhISGlBeHdlS2NZYmFwQ1lWbVZqQ1pET2tER1BEOUdGSVR5WlgrYlJDb0Y3allscTVMU2JOVHh0dlhiNHUxSWF4akZBWGxORlV1MG5mRENGbnpNbVd5V2tpc2hQeHlGbkxWczJFZWJGbzVQZ3orNTY0a0psVkZEeWVtSDdpMmF5dktiSVVFcU9qbzJyYmRKODdYNStSWTJ0emRrYjczZVR4SjFmZlg3enBwVmUzbk9wNkFxTUxROTk4cGVIMExjNlJ3STZpdGoxZGx1NkgvK0hlaVQvdUVIWjFWZHp3Uno4VTF5bUZNL1d2cFcxSWhmUm9XbWpacjd0YlJ6cTBtTkZydFVRM0lzRklnaVVTZUlPWHk1VktQRTJUMENtQ0R4SzhtK0FBd1JyaWd4SVhTZllycERvZDFzcGtPQThPVlJka1locHk0bkZEenhoSXhkVzYrbnFkZU9Mb29MdWVRb0hoVkRYWFlSZmprak5pL0dFeitlZTY4M1Vybjg4bXZ6eDM3aStNdjVhcTVRcmx5cWZ4ZDNETjZvdTQ1bGJtd2ZkbjdpUm5DOXE0MHJLVkFsb1RKTS9EZWZsZHFRZnEwQTJDSnBjV0FPUkJCajJJaVFSS0xEZHNnbVVhTnNPNVBIWnBwOG1mNzhtV0RxSDBMNlBNSzFEemxLQkRnbVcwR0h1SzhWRXpuakhqVVRQdU4rTXlEbyt6V0ZLUVhVQktaUGd1S2Q0bnhWSmFXWlJwT3Nja3VLUmt3N1RTWU1BUjVXRWxVU3BwQk9nTXhHQ0FSQ1luL0N4RmdlNUJXQzkyMEZVRElIRGlPdGIzWVBxcXdIWE4wdlRSbzhHOGdjYUJXRjlJNUdhbTl2MFhDeUovOGZROW81dmkwYUttK21xRDBHTHovOUZBNkhUUTJiajd6T2YvYWk5NTZ2N2VVOGVPblhscWN2ZE9wY2FnZWh3VGZYN0Y5bDB0d1UrZk9YbnlYdjk2elZRaTlZSi9hNFFpRlpxK0ZUeW9rZUlGV0k2UW9mWktaVXJ3ckZ5S1lpUmxzOHVocjAvVmNjTTBaNVJLSVZtVUdxUjFwUzVpeEdyVmlrT0ZjNys2K3JvS1g2anhpeFd1SjFUN1E1am5WcWpiUFdMZDNpbFk4eEhPUUZnK3p1QWhCbmRDMm1KVXgyQkNtUlBESlpQbVNSU3pCRkdheUJETU9LeGRyZ2RQQWFGemlVa1pva1FNRUlnUE9lYXhHZXRiTmpQTjZ2Zi84aVJUdVBJVkNjSk5POTdUU2g2bi9sK0JmWG9KL05pTUhoR0tON2s4cmdFWEkzTWFuYVM4QU8vS1BwUTlsODBNYW5CdGJuV2tzQ0dpMTlQODJhTFJlN3YxbU5NNzlZS2VzZVRxOWJrV1JucXVFQmNLV1ZwdllhRWdGZlQ1WG1tdE1aYWJhOHRDRnEyRldDeGN6Q2JQaXFFZ3dDZEQrYlFnQjZ0RkQrdG8zVUV4RTVPdFByZmU0WUFWUUxtdVhkYlZwN2U4RkZLVXhlREtMV0xvaGdhUE8rQkFXYTg2Uk5lblMwdVp2SWloQlNZT1Y0Vkhlcm5TbGt4OVExdEhVZWo0UVBtSm96SDE2UjI3dG02WWpCUTFiaGJqb2JpMXM3ZDY1UDZ4bW9VdnRrZDlHM3Z2KzBhMlNtZk14QVhQcWZOek1pdTZEL1hjZmtTbDZGRks3VGZzM2pvZFNVZUpVcHNwcStqYTAvcUo1d3BVenE2eHBsM245bXlpc2NJQmxsOERIMVpDcFhiRHlVSjhheUhla290dmxHT1BQSlhwTE9WUnZvU1hSZ3A0K0dTVmx0cXpCRDNyeldKakdxaG55Rm4wRXZvUlNpSUpRam1XMlJKWlRreWxVYitrSm1xMUtqL3RackZJRzk2M25FSUw4b0FEOW9WWWphNVhhbXV2V2NWbFZ3TkdrNkpNVHVQQnpEUXorR2U3SHAxd2Raejg5ckhSOCs2eWxreXRxM0ZyMGVpeDNwSzh4ckh0V3lKc2NEOTUwclJ5c2N0UTRSSVlyVzNnMEk1OWlVT1FKd0VYVmJaR3VYbHN2cjltMkZPdVZaQ0hIbHJ0Zy9wY0t1NFZ1SFUvLzhkZi9OdXZSelNON3lJMjlUdjlTL1BGcDlaK21vWnM4d1pVSmZPUU54VzAyRUNwZHpva042KzJveHZYZjhFZWczZlhxeTh0ZVJ1MVNkNUl2c3NVb2w1U2oyWUFvVTU0RGpIenlBMTBNMVVsL2ZQa1cwQTNrYWZRQ1hqNjRKYVMrdVI1U1dvWDM1cGNRUnlJVmFKSDBZOXhBLzRjeVNhUE1rNzRuSk1VUzZLU042VnQwcUQwVlpsQzFpYjdtWHhYZWozWnlKMjJrOEJicElQK2Y0RDVqdVFzWkV2SzNZQUgwdjhoUWlpWUhrRy90ZERDNlZFeUZFM1REQ3BHczJsYWduTFJnMmxhQ2pYYVFwcVdRZEw5U3BxV28wUG9sVFN0UU5sNFI1cFdJalVPcGVrTXNDR3kvbDhxT3o2WnByTlFCRjlLMDJyQXB4eG14eElsdEo0bjQya2E0cFVwUzlNRVpUS2VOTTJnTnFZblRVdVFuVG1UcHFWb0E5UmJLVnFHS3BuWDA3UWMvYXNrTTAwclVEazlFRVZhaVRaSTErYk5RSnZoakV6Um1laG02ZTFwT2d2OVVQbzNhVnFOYnBkOW9UVVNQVGd6TlRFWjU4cEhLN2hxcDdPTzZ3bVBjZDVRdkpMcm5CNjFjMXYzN09GRWdSZzNFNDZGWjJiRFkzWnVlMmRMZTgvV3ZrN2ZEZHhVakF0eDhablFXSGh2YUdZM0Z4bS9kdnoycVozaG1WQjhLakxOOVlabnBzWTc0NkU5VTZOYlk2UGg2Ykh3REdmanJoZmdVaElmd1I0SXo4UW9yOHJ1ckxQWGZDQWt5dGcrTlBRL01BNVdOREVWaTRkbmdEazF6ZlhiZSsyY1B4UVBUOGU1MFBRWTE3YyswRGMrUGpVYUZwbWo0Wmw0Q0lRajhVbXdmOWYrbWFuWTJOUW9uUzFtWDE5V2EyUW1Ha2xiRmcvUGhya2RvWGc4SEl0TVQ4YmowUWFINDhDQkEvWlFXbmdVWk8yamtiMk8zOWNYUHhnTmo0VmpVeFBUQUlCOU1yNTN6M1l3YURvR2h1OFhad1Jycm9iU0U1a0doKzFKeVZSeXNYQ1lvK3Bqb0g4OFBBYW1SV2NpdThLamNYdGtac0p4WUdyM2xDT2xiMnA2d3ZHQkdxb2xQYy8vYkRScVJSSFlsd2ZSREpwQ0UyZ1N4U0UzbEtOUlZBSFBhbmdSY3FJNm9IcFFHSElSaDd3b0JCS1ZRSFdpYVpDeUE3VVY3WUVQZDVXR21OZ0t3ek1NejFseExKWGNEcU5hVUR0bzI0cjZnUGFoRzRBN0pjcUg0STZEZEFoa3cyZ3ZQR2ZRYnVCRjBQanZuWDg3ak44cHprTjdwa0IrR25wN1JjNFVqTzBFYmdqc213THByVERUS1BSTWkzUE1nSnhOdE9yM2ErQ3UwZkZma3g0UStiRjF1U3F3bUNKcVJ6Vy9VOU1IZW16L2lWbi9aOGlsZkRRaGFvbUx1bE9TVTZMdWZwRG9GYVg4NGtpS1dseWNiVnFVNnZzZE0vcGd4bkhSM3ZCVmtxT2licnFXbE9ZSTBKTnAvSGVoL2VKNll5Qkp4NjJ0TFFZemY5aGJORlpuSUZvajEyRkdyWnNWNTl3aDh1Tmk3TkcrU2JFVlJRMXdZam5RQWZGakI1bHJOWSttOWRwRmFpOUkvbmZIeFdFblJVVWN3NkxYSjBBMkZRRjJVZWRlOE9mMk5FTFQ0djZnQ08yL2FvMHBiRDRxS2ozaU03WEQ5bHlqaDNxV1B1bllOZXRqYWZ2SHhYbFNxRVhoT3dLNGgwVzA3U0ozUWx6akZQaHdDcWlyN2FNZW0wanpycmRtelpacjEvTi9PVGNEZGRVdm4zbythWVlaZjhkMUdmbXhIQTU3aC9pOWdDV0NEcis4Z2krdllPMEtqcnlIaGZmd2I1YXdSdEJYc0w4MkpkbGYrY3ZaZC8yTjdEKzkwOGhld2dhc0Y0NDJzcjlZYm1UZjdraXlQL1ZYc0QrQis4ZHZOckwvNks5bDM0VDc3NTkxc2E4L1c4RCs3QzBYKzZNckx2YUhqSXQxdkRYeTF1RzNGdDZTYUlCWWVBc0tNeVc2Z2hzZFY5eFhEbCs1ZkVWQ0NkK1ZCU0JmdXBLOEl0ZGN3VCtBVVgvajM4QitIKzd2d2YxZGY1TDkxamViMkcvNkd0bXYrU3JBbEl5VWpZNFhzUHVGVXkrUXIzNHl5VjRHVTVadzFzVU9QVHd5dndpY1A3MmxndFVzWVpXZ3hGOSt1b2I5MHROSjhaOGRya3NsNVo1TC9oTFcvVVg4QlJoMCtWbXNXUmhaaUN5Y1haQkVMeHk1Y084Rmhydmd2Q0JjZVBuQzZ4ZmV1U0I3R21TZXd6clVoTFdvSDJzdm1ocGhBclZncjJENk5aL0NqdlA0MUhsNGM4YkI4OUh6Ujg0em45RW4yU2VaSkh2T3BlOS9GRVkrMHR2SVByNnRVWnc1NTVQbUVzL1pUeTU4a2p3TVZqNjBMY21lZ1o3bmNDSE9oY09HeFhuUDlGYXc3aTlCeTRkemhXM2tFdzgwc3BvSERqOUFsUGY3bTlqNzRENE5TTng3VHhON2FyNkMvZmg4RTR2bThSYk5QTDRISmpsMlp3Vjc5TTVHTm5ybmtUdko3UDVHOXAzOU9CN2J5TVpFWEhJRVU3U0NqVXhiMmVtT2pXeEJocWsvMzVYWEwzY3gvVEl3OWpsY2dMTkZFL0tmR1hHeHdoTE92bGhpOFlETno0U3NUdm9VTWtNczd3bU9DT3dJMVFlTWg0Y0xpanczZDNEc1RVTk9kcWlqZ3MzRytuNERyRnFLbVg0SktOWXdEc2JOakRDSG1RVkdGdXlOOWg3cFpYcTZIV3czS0hqZC80NmZhSHlzeitGanVqcGM3RGJBbzdPamtmVjJiR1kxSFd5SG8rT2xqaDkxL0xKRGRyWUQwREgxYi9DYStvMnVuSDRkMXZSclhacCtnc0VWTHRUdjBDUTFSS01aMFJ6V01CcGFuaDh4WWlsZXd2Y3U5dlZhclYxTDhtUlBWMExwdnltQmp5ZEtlK20zMEQyVWtCMVBvUDZobXdLTEdIOTg4Tzc1ZWRSUzJKV283ZzBrZ29XRFhZa3hJQVJLSEFGQ1c3aG9SQzJEc1ZqY21ycHdiRDk5b1AzQWlNVkVqdGkyZm5EaFZEc09zcFRZZjBzc3hZZG5MTlViV3hzQWV2ZUx2ZkRBTVdRVjZWaGFBY3lKMXhXRDVDMnhXMFF6OE5wb3NUY3RFcU1YaGp2djN3SE8raDNOQ21WdVpITjBjbVZoYlFwbGJtUnZZbW9LQ2pFMElEQWdiMkpxQ2pZMU5qUUtaVzVrYjJKcUNnb3hOU0F3SUc5aWFnbzhQQzlVZVhCbEwwWnZiblJFWlhOamNtbHdkRzl5TDBadmJuUk9ZVzFsTDBOQlFVRkJRU3RNYVdKbGNtRjBhVzl1VTJWeWFXWXRTWFJoYkdsakNpOUdiR0ZuY3lBMk9Bb3ZSbTl1ZEVKQ2IzaGJMVEUzTmlBdE16QXpJREV3T0RZZ09UZ3dYUzlKZEdGc2FXTkJibWRzWlNBdE16QUtMMEZ6WTJWdWRDQTRPVEVLTDBSbGMyTmxiblFnTFRJeE5nb3ZRMkZ3U0dWcFoyaDBJRGs0TUFvdlUzUmxiVllnT0RBS0wwWnZiblJHYVd4bE1pQXhNeUF3SUZJS1BqNEtaVzVrYjJKcUNnb3hOaUF3SUc5aWFnbzhQQzlNWlc1bmRHZ2dNekV3TDBacGJIUmxjaTlHYkdGMFpVUmxZMjlrWlQ0K0NuTjBjbVZoYlFwNG5GMlJ6MjZETUF6RzczbUtITGREUlFLbFhTV0UxTFZGNHJBL0d0c0QwTVIwU0NORWdSNTQrOFYydDBrN2dINjJQMXZPNStSUUgydlh6OGxyR0UwRHMreDZad05NNHpVWWtHZTQ5RTdvVk5yZXpMZUkvbVpvdlVoaWI3Tk1Nd3kxNjhhaUVNbGJyRTF6V09UZDNvNW51QmZKUzdBUWVuZVJkeCtISnNiTjFmc3ZHTUROVW9teWxCYTZPT2VwOWMvdEFBbDFyV29ieS8yOHJHTExuK0I5OFNCVGlqV3ZZa1lMazI4TmhOWmRRQlJLbGJLb3FsS0FzLzlxZXNjdDU4NTh0aUZLZFpRcWxhc3lja3E4VFpFejRzME9lYzE4UXM1WnMwYmVjRDVIM2pKVC9vRTRwWms3NGpYbDk2elJ5SS9FMlI3NXdFejZJelBwVHp5blFxNDRqN3RweFl4ek5PK2ZiWkY1L3l4RDV2MnpuRXk0dlJidHdIdjkyQ3pOTllSb01SMlZ2RVZYZXdlL2QvZWp4eTc2dmdFd0lKZHpDbVZ1WkhOMGNtVmhiUXBsYm1Sdlltb0tDakUzSURBZ2IySnFDanc4TDFSNWNHVXZSbTl1ZEM5VGRXSjBlWEJsTDFSeWRXVlVlWEJsTDBKaGMyVkdiMjUwTDBOQlFVRkJRU3RNYVdKbGNtRjBhVzl1VTJWeWFXWXRTWFJoYkdsakNpOUdhWEp6ZEVOb1lYSWdNQW92VEdGemRFTm9ZWElnTVRrS0wxZHBaSFJvYzFzek5qVWdOakV3SURNNE9TQXlOemNnTlRBd0lESTNOeUEwTkRNZ05UQXdJREkxTUNBM01qSWdOVEF3SURNek15QTFNREFnTlRBd0lESTNOeUExTURBS05UQXdJRFV3TUNBMU1EQWdOVEF3SUYwS0wwWnZiblJFWlhOamNtbHdkRzl5SURFMUlEQWdVZ292Vkc5VmJtbGpiMlJsSURFMklEQWdVZ28rUGdwbGJtUnZZbW9LQ2pFNElEQWdiMkpxQ2p3OEwweGxibWQwYUNBeE9TQXdJRkl2Um1sc2RHVnlMMFpzWVhSbFJHVmpiMlJsTDB4bGJtZDBhREVnTVRZNU9USStQZ3B6ZEhKbFlXMEtlSnpkZXcxWVZOZTE2Rjc3bkRQL3c1ejVIMllZNWd6RFlZQVpHR0Q0ZFZSRzVHZEVSQVJVUUJGUUVJZ0tDR2cwU1NOcEU0MGtWdHVtdVVuVE5qWTNiZFBFMURHeGpXbnZiV3hyODE1L2JMdzNTZTlOa3pTMnQrMXJYMk5OMjdTdlRRSzh0YzhNcUdsdTczdnZ2dTk3My9jT25MUFhYbnZ0dGZkZWUrLzFzOCtaNmNsOVE4UkFaZ2hINGp2MkRFejgwMWRPUFVJSStRRWhZTm14ZjFvNkdkOFZRUGd5SVZTMWMySjRUMzcwMWQ4U3d2MktFTFV3dlB2Z3puOTY1YkNURU4xYmhJVENJME1EZzV0dUkrV0VWR1loajhvUlJPeWVQNmhHc0JQenVTTjdwZy9jWXRSL0hQTUhNUC9BN3ZFZEExKzROUFlpSVZVaTVsdjNEQnlZMkNmY3oyRytIL1BTMk1DZW9WL2svUmJicjVvaFJETXhNVDQxL1cyU3UwQkk3VnVzZkdKeWFHTDNtV09EaE1TeFBsMkhPTUEvZGhrUVZMRTg1WGhCcGRab2RYcURNY01rbWkxV205M2hkR1c2UFZuZWJKL2t6d25reXVULzQwczRSdXhrWEZoQlRPbm5EUmQzaW1TU3B3aFplSlBscmozbld4YmUrYi9aQzQzeUJBdjR5WGZJWHlBS2xOd0dWdEpEQnNrNHVZM01RdlI2YW9oQkM1WjlpTHlHNVdQa0dLZy9tQ3Y0SVErTXlLRkhvZnNRdVVoKzlvR0VlOGszeUZzM3RvRzQrOG1qNUJURFF5UHl1ZysrRFMwd2lEd1k1eFo4YlAwZ1Z2UW1mQnpIK3dBKzkxQklZNi9panZsWHNwVitnLzZjbkNCZlR2Y3ZnN3dKOVppdXhSNCtrMmF3bG5UOEZkTnoyQXNkR1NZSHlXR3NyVnpDaXZkK1RMUUxmMEJlemVTYmlGaERiaVhIbG1yOEdaUTJPQjFaV01KdFh1cmpJTDBIckpCSFBrditUT29GTTV6RkhkTFEzYld4czZOOVE5djYxblV0YTV2WEpKb2FHK3BYMTYySzE2NWNzVHkyckthNnFyS2l0Q1JTWEJUT0QrYkp1WUVjdjg5bE00dW1ES05lcDlXb1ZRTFA0V2pERFlIR2ZpbVoxNS9rOHdLSlJCSExCd1lRTVhBZG9qOHBJYXJ4UnBxazFLK1FTVGRTeHBGeTUvc280eW5LK0JJbGlOSnlzcndvTERVRXBPVEYrb0IwRG5vMmRDRjhyRDdRTFNXdktQQTZCZWJ6bEl3Uk0zNC8xcEFhWENQMVVoTDZwWVprNC82UjJZYitldVIzUnE5YkhWZzlwQ3NLa3pNNlBZSjZoSkw1Z1lremtMOFNGSURtTnl3N1E0bkd5SnBOY25MRHdHQ3liVU5YUTczSDcrOHVDcTlKWmdUcWxTS3lXbUdaVksxT3FoV1cwaWpyT3JsSE9oTStQM3Z2T1pGczd3OFpCZ09EQTF1N2t0d0ExcDNsR21abmp5VE5vV1JCb0Q1WmNNdlBYVGp5b1dRNFVOK1FEREd1YTl1WDJsbDdyVWxJQ3JJWWtHYi9TSEE0Z1N0djNvZ1pTR05Vc3ZoSHdzQkdGTy9zYkdOQWFwenRueDA0dHpDelBTQ0pnZGt6QnNQc1JBTkttTFIxWWExekMxKzd4NU5zdkxjN0tmYVB3TEwwWUJ2YjF5YXRHN1owSmFuY0tJME1JQWIvYXdQK2FvL2YzTDFJMC9idkZSTVVCSW9EWmVyM3M0SGZjeTVPdG1NbU9iT2hLNVdYeUhiUFV5UWVDWFVuYVQ4ck9iOVlZdC9JU21ZV1M1YXE5d2R3TnRkMmRNMG1lWG5OWUtBQlpYelBRSEptTzY2bm05aFVCTVJreHA4OC9zQ3N4U3pWUkxvVldnbDd0V1p3VkVvS2VTZ1dySFY5QlZ3cHJNcXNxR1F5L3BSS3JuaXdnVHl6UmFvSklCdkdweUhRMEovKzN6L2lRZ1pTVVRpWkNLV212ck1yR2E5SElENlFucU9HTXlVUnJESFFqMU0wV3E5TVh6SVNtRWphQW5WTDg4bTYxVERhMGFWVVNWZEwybFluU2YrT2RLMWtwS0dldFN3MXpQYlhwN3JBZUFVMmREMUxvZ3VYejVSTG5xZWphR2U3NnhteFl6V3VxN3lHMmE3Qm5VbGZ2MmNRZDlwT3FjdmpUOGE3Y1lLN0ExMUQzV3lob1lRS0xtTnpmcVhGSkYzZDJiVzJJN0IyUTA5WGRib2pxUUxHanBjYjNzY20wT1ZKc2NFbGw5VElHcW1MZXJodUpCUVJJVFVpRUtoYmpzK2tXdGJnTGFMQUZTeGJxblhMcFM3d2tFVnE3RWF5UUdvWXFrL1RzZndOVEFXMm5GWW5Gcm1wV0JiNXJFNTQvTjMrMUZVVXBsZ3NwUnZHR2hvbTFNUmlFU2VqSmtBY1JUWUtpc25TeGRhODFCVVlDblFIUnFSa3ZLMkxqWTJKUjVGeVdoaUt6Tk56MVhsRDdqcGhvWmlJSDRzWE0weVl5Y2FRNTNyaEpwdVUvRkkyOGI3aU5ZdkYwcXdtc0xaamxqRVBwQmtTN1BtYUpHRkxPRjV0OWlpN24rM25RT01BYm1MYzBjcCtuajBUajdPOVBNSzI3V3hnemVCc29LTnJ1VUtOR3VSRG5sdFlXeGF5RnRaMjFoV0ZVWm5WblFuQTNSdk94T0h1anA2dVowVjBvZTd1N0hxS0FsM2RYOWQ5SmhmTHVwNlYwRllvV01xd0RNa3lFc3N3VHUyWTBTajBubWZqaE13b3BieUNVUEk3emdGUmNKcEZISkFkNTJnS0p5N2lLT0w0RkM2dTROaUZzK1FhUVJtai9tNlFCdG44M05ZOU10dmZ6ZFk0Y2FCRThCK1NFRmlKMGdtc1BBTlVaVWpxQWtOMVNYMmdqdUZyR2I0MmhWY3h2QnBYQmppZ0tIekxyTmdRK0tPclNER09wSjVaU0dFamVyeHFVbndHU0dUNVUycWVYQ2s3b3hKZVcvNFVSeEVrWnppR0ZoajZLYlVLM2x2K0ZEQjgxT3czeTM2enY1NUs4N253d1B5SXNQR2RKK3I1aXdwZjlGUDVMNkdQWlNCKzhsVDhicFVQanJpQlpJRTJxNGVRUURKd0tVQjlnVWlnTnRBWE9CUVFUZ2ZlQ0ZCVTNvR1N3RVRnUkVCNEt3Q21nQTlMbnd2d1ZTOEVyZ1pvSUw0aW5pZ0p0R0g1REZZWGZJd2lvdFIrQVNzdkJOU25rV3dod0JIa3duandhblZHajFYVGJ6U2FWZjIyUGdlWFllMHpXMGp0bGJMYUsxZk1OWkVyRUxsU3RxMjNkKy9rWkdpU3BRaFlFTDJ0dDdTa3R4ZktpMmtJek5HeWxSVE1UcnUvb3NvY3JQQ1haVk83TFlNR3VPR3MydUcxNnp0YWhsYTY1eDk5WTY3eDRWTjAvV092M2hFTmpYL2o0MXl5Yld4MTl0eVR3WFZUODAvTWIvS3NXZVBoOTd2WHJOaDFvcVA5Z2VsR2xFM2R3cHZjVDdsdmtueFNRWjZJSHl4d2dNN2hkdEJtQzlSWW9OQUNlb3ZIUWl1NVJvN3luSTNMNVRpM1R0VTBVVEZUUVVtRldIR2k0bElGcjYyb3NGV1JLbGpiVmdXa0tsN1ZWdFZmTlZOMXVVb1ZWd0F1SnhBZ0VURkNJMDIybkxqV21Nakp5UzVvZGJ0SjJRYWR5YUZxMWRxelc0bUl3c0MvcUNJTkhIb0lKZElialVSUkpOdDZ6WWpZMXJ2M1NqVEt4Skc2Z0kyZlNTT1l3UVZ5aW1sRitVcGFDeFhsZVlFY2xRa0NGU3M1cXpxRHM5c2MwYkxLS3BxejdzUGJ5cmZOZjhGaGpkYTFsN1dQMTJmWFR6MjQ2WmI2cHFvdGhYbDF4UjJiK2c1Mmh1TWgrL0tTa25xSis2Wjd4ZUNhdWMrNDZoSkdLY3RhdUhaNCtjQjByWTF5UnpzMisrejcvazF0MEtubW5SeTFSVnFXYld5elp6Q0hrdmdYM3FTZjQrOGdIckk1WGpQQ3dUS3VtZXZoT0QzbjRVSWNSeHpRNWdDSHd5QTJhV2NFSUlJb1NNSWxnUmVFTEsvS3RGNnZOWmljMWczRWdWS0kxa1l2WGlrem8vd2p2WHVqVjhyS01GR0dMYkJSbWdNVnRSQzFSKzBCYzJwbzlnd092cnAyVjcxMDY4ZjIzZi84ODVYaG5OWGVqTXBWVGJiYzJzMVJ1bXRWOE9XWFIrYSt1S3BPcDlxb3M1bDB5bjdBN1VZOUdIOW9pWmRNeHpmWW10dDBKM1Qwa2c1MGF0N0ZBKzhFQU5MRU9ubEo0QVFoMnhmM3RmbG92KytrTCtuamZENUkrczc3THZ1NGlLL1dkOXpIbVRKOW1UU3p3MFJ3S2sxRWFPWHNxWVZkZTZVWGxLWE1wcS8zU2xsdnROY2NmV252NUpYU0VubHBGUU5PVzNSeEtlTUE0ZXp3dkdWblA5d3gvN0tyc0ZxU3FndGNyZ0tXRnJwNlhIVjFMdnBuVngwa3JrY2pHUnRUNDhJVnJvdjdObzRvbit5SnQ5NmNlU1NUN3RjZjFsTlRyaStYaXVJSkZhZ2FwZHlTM0hqdXlkeGs3dmxjVlc1dVlhU3d0ckN2Y0x6d1VPSHB3dWNLWHlpOFdxZ05xSnN1ZWNDaldwK2JTOHpHRFE1SDl2clU0cHk3YUZFMktodUpNcUJlbkJsbGUyTDN2ZUMzMjdKcGVrSlM2N0hTbVpOQjdWSGN2UERianNQYm92TldmZWxRZDJ3aTZtenMyRnAwOE5TZXNoZS9sMXZzMGYxWXNPWnozODRmK056QmRuSDFyWDNWRnYyNmpDeTdNWDc3dVFOLyt2MVFZY3ZZNnRWakxZVnNqVldoSHV2a3ZrTWs4clZuaVdiaFV0eXJGUk1QWm53cDQ5a01Ma015aUlrTVhnOWFmUk12MmtUcUZzOHRuSS92MEJrVG9waVRtd05iY29EUHNlWFFtdW1jTzNNdTVMeVV3N2ZsQUMzSmllZlF0cHorbkdUTzVaeTNjZ1JmRGt6a25NVGMrUncra2dQbG1mVTR0OFRaUkxMRXJQTlpsN0w0TEcrcnorUVU5Vm10Ym51RzNkYU9xNFRndHEzRktTL0RTVmZrVTlhcnpIdmZwS0xMMkc3ZTFvdTZMQnBDZVlWZ0pSZGQzTHU0QnRpR1ZWL1RhdkNVcjdtOXE2aW12eUZ2MjN4UloxTmRTOHVtK2FLdFcyRVAxeVBtU2Zic3Vwdld6ajJ1cklSSTU3YWN1VldMaTRMSko0alIyU25VODFZeUdWODliSUVoSzZpdFRtdlF5aDNXZ0ZZRFZndTBhOVJXdGFiSFlyVlpyQnFMV3VnbHhONW1oMG9MV0xTOUdRSXg5V21vaGRObTlGblZCbFRRVWR5QXlxT01hZWhlTnZGWG91STNqL0FoRVpUbmhkSVNvcWlqWHNEZTI5WG13SFVxR3ZpUG5JWFhUKzE3N3p0bjV3T25Uc0gzNmNmNEg3dlhySEcvbThkWHZsZThxSTNmKzJKcWJsVkhjRzVyT0grOHBhcXNxWXhXbFRhVjB0SGd3U0N0RGlhQ1hVRnVOTzlnSHEzT1MrUjE1WEZCdVVwdWtybGdibFZ1VXk0MzZqem9wRTZOUGlNeDZqam9vQTRHYlJKM2l2dEZEbGZCNWZnQ2F0MU42cDNxL1dxTzA2Z0NqZ0RWQnByeTh5dGNUVFZXVUZrZFZ1cXd4dkppa0JrRGZRemVlVGNHdjR6QnM3SHZ4dWdYWWhDTFgvMURZbTBNdExHQ1dFMk1leVgybHhpOUVJT3Z4bUEwZGpEMllJemJ4Q29XeE5iRXVPL0dmaDJqWDQvQmwyTHdVQXlPeHVEV0dPeU1RVTBNUXF4K1pveCs3OWN4ZURVR0YyT0FaSWRqOThjb1kwTFh4cmJFYUExcjYreTVCSEptZk9tdUdQVEdZSzNTclYrelZsOW5yVDRmb3c4aTRjeW5UeVlVamc5Z2J5L0VmaDZqOThlK0VQdHFqTHN6QnZ0WjE2QXpCblV4S0k5QlhpeStBSHdNenNZdXhGNktjZnVSam01WHl2TmlsYkhHR0lkai9ubnNiVGJZNTJNL2luRVBzcDVoOFdCc09zWTFLczFqN1pIZk15cGdGUFErTnF6RFNvOVZLRGVLK0I4eC9vRGlTclUvR0FNVVMyNnNQRVlkaWpTL3RWak94bnRVRVZwOURDclRZcWxHRHY4Y0F6Z2ZnMGRqWjJQMG5oajBzK3Ixc2M1cjNidkVCZ3JKR0R3Umd3bldwM3JzSXZkU2pOV2liYkdKMkV3c0dlTnJZMEJpb0NFbFRjeEFuMmNHdXFJeTdtcXROcFhrQjF6V2lsYlpFYlZudFd1TVluaHA4N0ovdHNpdmJXSGN1TDE5YkJjcjE2UnlwZlp6K3RxN2RLVUtyeFhkZ0UyVmhLN2hRNVB2cDc5V0k3U0lGMS9EcCtJS2JPc3RLeTNwUXdhaEZKT1U3V2NxeE9IOGEwV2lVbWZEamZuM2FaYk5SYTNUMlZMSGx2NXd6YmJWdVV6RHJLckwzUmdVaEJRb3I1TnYwRFkxcTZ5aFhOZU5Pc2RwdFpkNnJtVWQ1cm5HYXpxSWtzY1cvZzMrd0oxSEhSUWt1NThsOHNKYlQ0djJoUC9jd2x2eERBUThJajZjN0dFK2x5b3lzcUo4Qk5RTXk3Rkh3SFIvSnJPOVZCQUs4bTBQWll1Nmg0ajFaQUdjS0VDRHFqaEtLZmNBcHd3VmF2b1MwazdRb2pYbDNwZUhkWUVWNGN6TThJcEFZSG1SMjEyMFBQQyt2SmZoY2xZd2VFVU93OUdQcGFpS01qT0xVbFNvcDlDWFZyZWpqblZCT1A3eWh3MHdaWUJCQTlnRUVBU3c4U0R3Y0JUZ0FFQVRRQ1ZBRUdDRUhDQzBtMEFqZ1NCcU9Tb1FHRElDR0FtMFp4Z3plbDNFNWlJdWw2V255d2ljeXVnd1VxM1RhSFJxM081NDU1YkV3KzdUN3VmY0hLMTFyM2RUeVEwbXQ4OGRjYi9nZnNNdFZFZVVzaGZjdk1rOTdqN3VacVNzNEtwYjQ0NnZxRXRjY2w5MnYrWG1XQUVsYnNuZDc1NXc4Mm9EcFZ3djBZQm0ybmlua1JwVlptMmZLOE5BOVp6VHdtbjY3RUJVaXRaWE5nTkxFYkRVOUNwYkloSmxTelBFSE5LOWUvdjJodEN0cVZrUmNhRm4ydGQ3SlJvNUVqb1N1bUNHS0RNSTBQdit5Mys5WGRBQ3N4U3BMRGRaTlc5V3pBTTF3U0U0UXQyblRzME5uZVgzdlBzL2x1ekRSN2xKdEJtelNsNmJpbWVFVjNBT01ra2V1VFBlY1REM2FDNGR6WVRlVE9BemJaazA0UnB4VVpQZFo2ZmRObWl5UWFiZFpwOXpaZHBjcmt5WHcrWjM5NWhNNE1ndnliK1VULzNRbzhxMGtYNi9uNWY2MVgxYXpnNnFQaGZQWkhDRjZRTG1paThhUC9FN0tkL2NIRDBpaG81OENDM2YwakQvT2l4UkEySzAxMFV1Vkg5cTdpQ0dKbmM4OXJPN2wySEUwZ0k3UHpiZk9qOExhcWx4Yk4yOUgxdS9aN1dYVnMrSEZ3ZGR0V08ybzNheXY5azVMM3JXMEdxNHQyMTR1V3Z1WDZTRzNhbFlNWGZoUFdFSHlrQkVHV3lOcnp5U0NRZGNrRzg3WUtNSHJYQlhCdHpLUVQ0SHQxQndiUEVSZUlPOWZSRFJjZUlJeVZmM1lNQVd5TzFUOWVkeGdUNUR2NTlGWXJpcFVQTk5zZ0gzS2o3cTB0aFNZOGptbFBpcmpFY05rL1pWUTZBTW1YZkdKaDhiYTNZRmd5SHY0T0gyd1B6c0l5Q2MyOUh5eUx1bmEyNC9zQ3Y0UzV6YXozN21YKzZzZWZmdmNmSEJxdG1YdVdqRHArZWVmWFQreXoxQUlUVmNaVXdlUXJoZjRKZzh4QWRjL0hNM1o4S0lIVVlzTUdLR2tRemd2VmxtVVJEVk9uMkdTV1VpbVM2N0RXeWNMOXRpcFZaemxwZm5SZUZ4VllZZWZYaVY2WEhSN2hJSWI0UEhxU1hieC9IVStyaXR4QmEzdGRrNGxVaHROaXFxZUkyNzFqSHVPT1E0N3VBZGZzTnAzQk04MFR5cDlXWnFzMXlHSjQxMnMvRzBFVXpHOWNhcnhnVWpYNHZBd3d6UUdyVkdzSm80UVlVQmVoU2pGZHdHRVNZemN6UXE0bHBKSjdobHlzUWY5cGFablZpSzVlSVZoTjczS0MwUmo1ekg2NitmcVpVRlhNRHF4enRRRWNYYmI0MXk3TWJZQjI5QW1QNmk1WGpML08rYlA5N3ltYTlXL0Fib21oUE5rTkY4dlBuVFQwVi9NWmVzZ0l4S2VHaCtLSFhmQ3I1YjRkajhGTHR2bmYvcHJmQ3ArWitDTDdXV1dqRUdmZ3A5THpPUnlkRjQ4VkVSamhpQU82S0J1em5naVkxUUxXbmlMVFpMcm9YVFd5eEJQbmhuOEVLUXE3MFFmQ2xJZytobFAxMnpJc0hTZUdGK0tIRTVDSlFFNDhIKzRQbmdwYUR3Y0JEaVFjaHFpdXZhZEpkMG5NNjUzaVQ2MXdzT1JZMHp2WUxtRDVVSkMvdVZLRGNkODZQdGhmUXlTeWx4aDREck1NQWlDaVhPV0VtNXAwcHYrdUwrOFVkR3k4cHUrdnpVRy84MC82cEJxaTRLVjNwMU9tOWx1S2hhTXNDckI4N2R2aXArKzdNSGJuN210dmhmZmpmdzhlMGxKZHMvUHJEOUU0TmxaWU9mVUY2RXNQZE85QnZDSXlRQXArSUxUVG5RNUFmQkJ4cVZTMFcxbkY2R2hYZGxPQ3Rma0tsSHZrZCtTT1pNTXZ4Y2ZsdW10MkxtQ1pucmxDRW13eFB5MTJWNkh3UFh5cFNYYlRMOTRmZmxkMlg2cUh4V3BucXNTSDh1QTZPbm5mSWdZd1cva2VHQy9KSk1GMnVHWk9DUjVQdnlxL0p2Wk80KytWR1podVF0OHExWWwxY1lYcFVYR0t0ZEtWUUlHM29JYWQrVkJaOE0yTTNSdDFPdGI1RTVPZDQvbUlqSXdESzdsRTRMY3J5eksxRXJBelhKUHJsUEhwY1B5YWRsVmMxVkdlUjR3NXJFSlJtZWs0SElUNStRcWN6bXNTNVVuSGlCTlhoU2hrTXk5TXN6OGx0czZEN3N1MGMwdVUzWlRkd2wxQ0dCM094QXE5OU92T3M1dDhuV0ZqZUpQakdDUHZlTUZraXQrd2U5YnVaYW9Sb3RRN3VBKzRFRjgxSFVMNzFwUDRoTk9zNzlYdWI0YkV2RlROY2NvN1FUdGUwNmVKS3RqVDdsZkFqM1E5V2lkWGZhQThGaVlHdkRDK3hnUU5IRm4vbm9SOHNIam5VN0lrVjVHUmduK3B3TzJXMTY3cmtINXk3djVPb2Jna003UHJtampCUFUvT1U5V3BObnhVRGowWkU1Qi9OajJINXdMN3pKUzhJeFZKaUY1RlB4NElGY09DekJuVDV3K29JK2lxdmpMZzVJRG1oem1sSTZkWUxNRU1GQ21PQktNZHdrSkV6Q1FNSmlXQXB6c2Jid3BUQXRDY2ZEYmVHSjhNbHdNbncrckxacm0weUZjTFZ3b1pBV3NscG1iVWFpMExBKzZIQUpiVjdSM0dvbHl1NklzZzBTNnQyTHRvZlozS1U0Y2xFM2c3SWowTWZMQmtVM28vVXgyMVRxdEZ1bzdKNjhJSDNYWGJhbU9LL0hLMjNNcjJ5TzJPWU85Y01kZ3VCWTBkUWNHTDJ2TDF3eitlUjAveC92Z3QvdFBOb1JNSnZuU2pXYXl0RlBjVjkwcnByL29qeFNZc215NjJ1bWt3Y20vL0ZvUzlDYml0TzRBZTU3eEVVK0U3ZG1Pa0RqZ0V3cmFLd2dpSGFSY2hybXpSbTFob1RtVHZWTGFxcFd1OTFzaExtbDVZbCtOMURSSFhlM3VUbm1pNXh3SjkzbjNaZmNLbUpxSWpiUlJtMU1rM2h6RWl5TnV5eU9oTTNlNmpLWmJLMFdld1paMElJMnJwNVJvYi91dnVpKzJNdU1zK0tyaDBMc1FFTHhSNWhIaVA1ZzM2S1BIQU56SUlpcjRub24rS0o3M1piaGlzcnFtTCsxcGNuOWQzTS92T1VXdUlmKzJ0dmFXREwvcGR0RmoxK2MrODQxZHhiSEcyVm5EcmdXWkhibVlGdzhjN0IreWZxc2xiT3lNd2NyTDRKV2JPTFJ5YUJ1KytLWmc5MGV6QTNDbGlEd1FWdVExa3dyS3ZPbElOK0cyckVFdFNOdFF3V1pERjRPdmhVVWZFR1lDSjdFM1BrZ0h3bENlWFo5TnMwbVdVM0VML3JQK3kvNWVYOU9xMHl5N0tLLzFXZTMyalBiQmQzLzdwa0Q4MGorOXJuRFdhQVVmR3M3dS8vcTdBSFhDL2NuVTBHNHdQVHZIa0R3cjZDMGdPekJmWk1sdEpBWWVTeWV6MGRzRVZwZUJORXcyTUlnaE1GdEFhMEZlc1NiY0puNHN1TUdVeUk3dTNTYmdVbXNTVzlPRUlPSXpxbkJzTUllV1ZHN1l2MEszR01rZnh1eGc3M2JNR3FnOWZuVCtYZm12NTNQRy9KZDZyNFBBMHdETkFCVUFmcloxa0RmWmgvNFhEeEtwUmRWRHB0L2RHUnFlaFhITlJxNXFKeWdZaFNGVG16b0lqcW9mVXNlcWpYcVRIazJGZVhGcW9yeVNrV2ZtQmYxQ2RvYTFhSzNFOXpUVldTUHQyMkp0STdWKzFZTXpSeVpHVnJ4dTErVkR2VjM1WFVYaFNmYjZnZFdacTBjdk9QSUhZTXJxMi81eHBGVk0xUGJjK0NoZjNFVlNKYkF5czNseTF1clF5VXIrKzdlY2VaWnRVSFV6SC96bkZUb0tha3ZyRXlVRjViVzl0MDlzUDJ6NDhzTk5qZkdCZXlqQk82UDNDbmlvUlB4QmNGUjRXaHdiSFR3Z3IzQzNtRGZhT2NMclhEQWNyZUY2c3lGNW1YbVpqT3ZFd3ZGWldLenlPczB5elRObWg0TnIxTXZVemVyZTlTOExNRE5HSlZ3TWxmQk5YQzhRR1ZhUVJzb0wyU3FERGE5a1RlNk0xVldHenZrTm1CaUV6QkxlSkduSm92UFFyVXFhRWRrYTZiS2xwbXBza0E3YitUWGVTdzJqOGVpMGdzR3JHejFXQ3pOUmpCNitRa1BlR3dObWNEeG1hRFA3UFJDaVJkczNsd3ZmY0w3ZmU5dnZOeDlYZ2g1MTNvcDc0VzN2YUQzaHJ3eHpON2pmUUlMMWYrS3FQUGVTMTU2bi9lc2wrNUsxU3ozY29pT1QzemZDNTNlYWUrZFdNVHJHUXRFc0F4bFRIWjV1Y2QyS1V5NCttdHRNdXI3dkc5NytUWXYyand2dk9HOTZxV1N0ODJiOUhLWTNmK1dGNDU3SC9hZTluSnhSRktsbUhoRkw4VUNMMXVRMXU2dGlmRVVCY05MWHE0TzhUUHhyQldyRXBLWFZacnhudkNlOTZyaUNKeEU0TEpYOENxZTBQS0VrcFpXS21uY1YxQ2M4SG1CZUNIVFlyUzFXdDBHakJCRmgxMnY0ajJ0R2pDbEFnME10U3pPR2diZ3VzUll0bmN2N2w0TStKY3NJT3EzSmR1NGRMcXdiUWxXWXJEbzgzdkx4TmZRNDhTVnorN255MWljRXJwd3hLVWtnT1JIVXY2bGVFUnpYcE4rWGhmRktQdUJIZUk1cTVTelBDMG82aUdvVmhJdCtPQlBvMGUvc2czaUhmTi9oc0tlZWQzb296L2VObisrRThMenYrZDJyVnJsZWZIbHpGV3I3UFBmbTYrMHIxcmxuRnZBcHdqOThEbVNpcHRWVHNXMzN4VmZoVXZQNWtHTmIrN1JFZlphZ0VtLzMwdVpYRS9pSFBGcUQrK3hlYWhIbTlsRFhmMWFMUlgxR3E3UEtIQ1pEalB0c3hFTVdNcFNZbU5QUy9vRlVsbXZPZHE3VnpsdGoxNWhoKzJsSmRHVWRzTm8wNTlPVXhyUGp5a0xPVDl4aXVhZW9wOTg4c201WGFmbVhqdlY3T2Izc1FCc1hvUzNXUHJ1UGU3bVpqZDF6djNhM2N3aUtOUnY3TXVrRERJZlgxbHRnR285NUdrcnRWUldWekJUNTFSVFdWV2hvbXFWVTBXN0tJekFBY0NBUndQdGxLUHJ0QnFiVnF2QjhXcS9vS1hhY3d1WG44NUFwY2ZXU0VLZmtlQ0lsbWc1VHVBekxtUlFYWWI0a1BoMThWV1I0OFZjc1Y0Y0ZPOFVCVDROUENwZUVIOHVxcXZLRWI3QUtHeUlubVlVeW9GM1hpQ1llRmNFUmtYN1JYVEZSVW1NaTIwaXJ4WjBHc0sxR2dTVEZxaURCZmtwNllHeWVKWUNlL0hDdGw0TVRWaGd6MnhyS3RqRjFSTmx4MUNMbHhZQ3FlTmVqNUp3L3pCLzk4SDVtK3ZncHhPL2UyVU1vdHltOSs3bmRxSmhjTS85aXJveFJkbXg5eE05R0dNRVNVM2N2ejhMOWh2QVpyVUdDMDRYdkZCd3RZRHpOZW5jNitQV0daTVl6TjNBb29PNTU5R0JkTE41N1JWL2lHNGpjM3JrYTYrNjJQa1hVOVBjdFpDZ3NvcnJjYTFhMTU1LytCc0hxcHNQUGRhNzZjRzZSS0hveXcxbEJadGp1YzVsTzF0WEhRclhXTE9zdXRXM2YzWDZqcThmcUxGbnpQLzN6eHZNZXFHbzkrT0RuYlBiSzBTajR2L050L0FTOXRWSGlzZ2o4UUtYRjF4dTRKMDJKejJzQng3L1ZYZXFLR0ZINmsxRUVpVkptcEJtSk1FaU1ma1hvZkdYcEFpSkFIdm5KMFhRQTR4Y2l0Q1NTRHpTRnBtSW5Jd2tJK2NqNmdMaWFMcUtHcFBWY0tMMzU4bHF6VFo1SEswdVQ2aE5ORHJrdHV0T0p0TitqbUxqUDlnUFZJNERGeDIrYk00TDE3MWVTcnVJN0YwWlBPaW9xRzBwdnZCYzlLWkh4aXRIcW9FRG1KMjd1bk1ZUGdTRFdTVzFnZWhtLzRhdW5rM2NiU2FQMWZETFAwOSsvYTQxeGd4OVhxakFkRkd4OHFkY2RmUGxlejYyTWVBUTUyTDI1OWxuWGlSbjRSM0JxN3hiOXBBYThwTjR3WEQ1emVWMFozUi85SENVRzQ3Y0hLRnEyU2tIWlU0YlZwTXR3YUNsZEFzeHhvM1VZbVJqdndNOVJhTXhab3I1WXBIWSt0aWgyUEhZNlppNk50WVhHNDlkamZFTW44b2NpajBjZXlIMlJtd2hwcXRPMFRMSzV4U01obVVaMFhGRXZJRDFOS2w2ckE0clYydGk4YmJPaE5yU2t4MFcrM0dmK3ZxRWZqL243TXZ1eTFvOCttQTZwSVlwRVJTdHNoRW0wMkpPbmZtVWxteTc3aXlFK1F2VzhqeUVITTYwNzMzajRVODJsNTZOQURmbUxPK0kzZk9KRlJ0S3JFTjMvZDJUSldHNXhWSGJWWm41M3Zvbm42VDNmUEsvSG93V3RReFc3VGplRzE1NTVNVlBIbmh6a1B0OVRVZVZlNzRvcDNiTDNBdDNmWGp1TWdVSytjMDN6ZjlENnFTa3NIV2lhZlh1RFJVR1hXWG4rT3JOSHgrTnFaaCt0YzAzY20raWJncFFmenc3MHdRdUkrVHBLblZVVVZDYjFjTnFLcWp0YWxvdmdJQXUrbGRSN3ZVODhNeGJYNDJ3QXlCQndLRUd0VnFGN29jYURiOXFIVElGSU5xTXpBeWFvVVlzYUFsb2lGRTBVcDFSMXJvejNRVnV6c0M1MFRVQU5wY0w2TkdCU3M2VEcrWEQ4dk95NEZEQVRmSk96SDRCRWIrVXRTcEUvRWptWHR3azM4OVNyVndnMDc4b3dmQ3o4bmRaTUF3SDVhTXkzU1hER3JtYlJjQ2dsVE5saXVYZmxWK1JxUkpCS3hRc3NxVUZjbzI4UnVZOGpBb2UrYlg4RjVtK0tzT1haTWFMZTBpR25mSitiQnJqNFUvY244QVErUldaa1hBWFpVakY2OGRsd0liV0sxRnhSRlllNnpFMFBvNmg4UXZ5VlZrejZaTnJNVmcrSkQ4c1B5ZS9JYXV2Z1F1eVNvNFBUU1NJTE1weG1hdWFZY0d6RkhleURBSXlpNWRQeXVmbHl4ZzFhOVJLUk8zdzVpZFFpTG5aYlc1cmxsR2pnbGE5anVkTTE1MjFYakVqQ09ubGg2Wi9tMkwwOXlxV1AvUkJieGdVMDgvSUk2Rm9OQkxGdUZoOGZodWEveHBVNE5Gb0wrcnRFQnFCSTh6RUt5ZXkxOTRnQ05jcmJ6V2t0R3F3SXBwZXpGWHd3L203bVRKLy9UdW96T3ZuajBsMUcwWWFzZ3BrMmJFOGxCSElMRmhSRm5KNXVYRkZ3ZitaNmpDMXZUZmVmdS93TWx4and1OXYxeHNLbS9vcWNFMnVYSGlUL2diMWFJdzhHYThZV2dhYmxnRy96TFlzZHhtbjg3djloWDVPNTNWN0M3MmNRTzNvbDNKZGxTT1Z0TkVEQmZseDBaYkl6eWNKRms0OW5lbFYwbmkxMW9GaGxXK0ZhUVZFVnB4ZVFWZkVqV0xDb05lWEpVdytHUGNkOGxGZm1WMkl0TVlMWm5KRlMydDh4bkRDUUEwenpKaWtqaUtZUFVHL0NHT0N2UmdVWUdTaytBb2hKU3BRanEwWG80TEZrNmVnT1JVZFZHSndRTkhXTEJvZWU4cndxSmpkUVFMNm02TGVqdzZVYk8rc05kYmxtY0tWSy8yYk4yWldkaXdyNlY4YnFkaDZXMVBqc2JvNnlaaGZXcG1aYVBEV2JLaW8ycjZtRUFxYjk3ZUhEV2F6QU9ST2s5ZVZzWGFaVkp3cldVeEZpWnZXMVk4MHlSYjk3OGFNTG9zK0Z2VVg1MmFMNWtqVGRpVWV6VWNENVZDK1hlaUxCeDZrOENDQTg0YXZGWFQ2dUw1TlQvdjFKL1ZKUGFkbmt2Tmk5TzNUUTFKL1huOVp6MFgwdGZyamVrN1ZpbUhHdGE4VjJLY0tvY1Z2RmRDeVRFNWU5NUhDNmZSSENUMUx3WjV5YnRpQi90Qlc3RXNXQ1pFVDhTeW5HN1Q2bzNvNnF3S01ITFNaVFRiQ2RzaUV6TG1WUGRDa05TWmt1WWdVQVNrU2k2UWlOSTFGbDRwb1NWRzhxSzFvb3Voa1ViTG9mSkVhWFdWdmswa0RjVTJiNXBLRzAyUzJadG50clU1U3NONWtGSFBRTURxV0RLTVMrdTY5MG51ZFdjVGRsTmJWaXJPUWw1b3laekczUWprZXdTRkIybGt3c3hCUFJWOTNGbFUxRkYvNlFkbm81OGIzakdNTWpBN3JIY1B6OTg4ZnpvN1dCYUxyOGdvU1JUMkRGY3dpWHYzejVMa1BOM3IwK1VWaDAyOWRkZStnVVlSWHh6N1JuZWV5MGd0NjNYZVUrWkZRcUZWb0QrMDRQM1dhUHUxeGRQYXNQZFRZWnBneG5EUzhaZUFOSWlwMDZuQVNwK2dzY2NhZHZJU1BOdWVFYzhaNXdubmUrWlpUWStINmpWb2RaNlY5SlBXTkZGTVJrUFpzWCt1OUtNN2hvN1NFVFU3cVl4OTBaMW5FR21LdklhRHk1ZWhIUGlWN3Rnak9yUjc1eWYybEw2UFpHRGRvL2dJM3p4LzlpMGIzN2ljOGE5TCt1RUNVOXdmUmVMWjZxOFpTWW9sYkppd25MVHp0TVlDeHo4UVordUxxR2RxdlkzMWdXd2Q3b25oalAwRUpBenJVS0VOMklwMWFJdlNWRjhEOG9jOW10L2ZrdmJ2bTFCUDBLL3piN25kUFpLakFPYjhyZmNMUGtjcjU1ZHlidklkVWt6VmtJN2tTLzJLb0VnNldIQzJoWFdFb0NOZUUxNFE1WGRnZHB2dnpEdWRSbGMxaHk3TnhXajZUTCtDNUFnQTNnQjZnbzRsNnFrMEdOK0Vwc1lnV2FtbGFsMXRENHlacjR2ZzZTS3dEYVYzSk90cFdBNlJHckpGcU9GcTlycVptWFRYbE4wdWJZWVVwN292VGVDSjZzaGlLM2NSazROWE85YzNSa3VXdzNHOXE5alZIbXJrMy9ORG03L2ZUWm4relg5M1FWcERWdGw2ZCtqYkxyQnp6OS9hS0YzdkxsTk43WUdGR2I5bGVTL3FFZjVJNTBlSkY4UXJ6bjFsNjdSMEsweWw1UzhlVlZVNzE0a3VVdkNENkNqRlk5TjVTdm0wVmFob296d3Y0TTJEeHNCdVlEc3BUVkE2YTZxZHFkbjltaDFSWEU5YjlORERwODFYditzeFFmcnZQQlRZcDdINzE4MCtWSHZqdUE1T1BESmQ2U2xibFdVckRQdnBNM1lyNWJ4ZEViT1hkRGVzbm13UHpyemZYclZyYlVMc1N0cXo5Y2R2QjlrS1ZXc3VOaHg3SnUybmxobHM3QzlWQ2l5bkxtVEZ6OThyYmQ4WUR5OXZDM3JMaWtFUHRqOVlYelA5anBDUzd1Y0Jabk90RTVuVG4xTlRVbmozNHdQVTB1UENtQ29RV1VrcCtIRy9aTDhQK1hCak9oV2NDc044SCs0eXcwOGc4L21FRDdOZkFzQWFtVk9EWXVtQUh1NTMwa0pBWU9oRzZGT0sxb1ZBMEhwMklubzl5cGlpSVVTbmFIK1dpVEhPMGJkaWNPQjJGRTFIb2l3S0psaUFaVjUyTVhvNitGZVZlaUM1RUtZbTJSV2VpSjZMOHcxRm93Mm9UaklVdlNqWCtMU2FkVDBkMXBlRys0dUw4ckQ2SGljL3ZFNnhzUmkra1h1NnhJNkwwNGJPaU4wS3Bidyszc1RlZXZUZk9ZVXFuNUJaRFJibWxNbmZwcUdneEJ1RVZ0YUxZVk9IMlpjYy85ZW5Fdy9OL2VtN1h5RGZCK3ZqbTQ3ZU5WZmU0QXAxOXd4VTdIOTFYbTd0eTQ4Qk41VFhUSmFmb1RSOXB0UHBkR1p1ZmVPL3pTVkNmM3B6aDhvbnpQL2l5cTlCbnJqbjZpeWVtdnp5enNjeHVGZUZPRm9zcU9xWUJsZSsvNHQ3Vms5WHhJdElqQ0FialpTTkl4aEowckNlTTU0M0NqREdKQ1ViTXdGQlVyK3JUY0VUbzQ5S2ZYTEpUaHQ2VXJyL2hZelQwRDhPbjV2WW9jZkVnYXkwVkRTdHRQb3JPL3YxQ2d1aEllVndpWThkVEgvSEZoVGFCRjFSYWRCbEZGZ0pyVlVTWTVsd3ByWVg3dzhKMlNlKzFSdFFWY3BRKytldTVqRi85TjdqbG8yT3VUWnRjM0I5YU52NUVlUmV6OENiNkM2MUNBMm9LODFjNUFTaFBjS0pxSVNJK1gxcmlERUQwNERINDBiMDJvWnNvdjZVQzgyOGNsYlgzOXBtVy81SDRVci9qZWVGWXp2SEYzNW9zdkRtL1hOMHVQS0tjcDlFMEV1dXAvZk1OMTM2Umt2NVYxclVyajc1SjZ2bC9Jd0dla0RyNk9QSFRHbExFSFNPTi9CU3BZbXlFLzBLQ3FzY1JmcHc4cGo1R0FwaG5keTdTZS9CdVJid0phZDFZcHdyVEtONTdFSzlSMVNnOFNacVhXOWhFY2pCdjQ3eGtKYmFSajdnT3hFbDRNN3BLcEIvRXNnYUVINlUxeWkrZ3d1UnJzQTNPMG14NmdwUHc3M1podS9EUHF2dlVEdldNWnJubWE5b0x1bmJkOS9UOUJ0NDRacnlVTVpaeHdkUWpacHRITEJaTGwrVm4xa3JyaEcyYjNXWnZ0Yy9ZNzArUFBJOXNZcStFRldzdWtnaHVSc0l0OEc4aWpnMDFDell0eWFkL1NWYUFsUDFwbUJLZVRLUmhEbTNmZEJybTBmN2RsNFlGa2tHK2xJWlZ4RWFlU2NOcWNndjVmaHJXWUtqUmtJYTFKQU82MDdBZSt6Qzg5TXU1WXZoSUdqYVNjVGlUaGpOUWZ1ekZOdkJhekoybjI5SXcybUl1T3cxanRNNnRUTU1jaVhPTmFaZ25oZHpoTkN5UUxDNlpobFVrbi90QkdsYVR0N20zMDdBRzUrbFhhVmhMc2pCSVQ4RjZVaTJFMDdDQmJCVUcwN0NSL0VRNG40WXp5RzJxejY0ZW56ZzRPVG84TWkzbDd5aVF5a3BLcXFUMm9VRXBNVEFkbHRhTTdTaVdWdTNlTFNrRVU5TGswTlRRNVA2aHdXS3BaVTFkUS91cXpqWHJXNlhSS1dsQW1wNGNHQnphTXpDNVN4cmZlV1A5bHRIdFE1TUQwNlBqWTFMSDBPVG96cnJ4M1lPcnBuWU1qUTBPVFVwRjB2dUxKVmIrZ2NoTlE1TlRERk5hWEZKVlhINk5SS0VvZWwrMS82QlRPSkxoMGFucG9VbEVqbzVKRzRzN2lxVzJnZW1oc1dscFlHeFE2bHlxdUg3bnp0RWRRd3B5eDlEazlBQVNqMCtQWU05djJqYzVPalU0dW9PMU5sVzhOS0RWNDVNVDQrbCtUUS90SDVMV0RVeFBEMDJOajQxTVQwOHNpMFJ1dnZubTRvRTA4UTZrTGQ0eHZpZnl0OHFtRDA0TURRNU5qUTZQNGZDTFI2YjM3RzdCRG8xTlljZjNLUzFpYjY0WFl1UDRHRTdVN2hSTldKb2FHcElZK3lua3YzTm9FTHMyTVRsKzA5Q082ZUx4eWVISXphTzdSaU1wZnFOanc1RnJiQmlYZER2L3VkcGtOUm5IL1hpUVRKSlJNa3hHY0Q5S0dESHNJQVdZbHBFUy9LdENxSjBNa1VGTUUyUUFLY0lJclNGalNGV00wQ3F5Ry8razZ6aE1LYmtoVEljdzNhL1VaWlF0V0tzT2JWRTcxdWxFZUQxcFJleW9RaitnNklKSlRBZVJmZyttazJRWDRzYkp6ci9aZmd2VzM2NjB3MHBHa1g0TVN6c1V6Q2pXclVQTWJxeTdDbHZaZ2RneGhmOGswaFFwUGZyYnRhV2wrdi9ybEpzVTNOUVNUU24ya2tteG1KUi9JSmRyUElyK2c5YitjNUpLemNtd3dtVmE0WjJpSEZWNGIwU0tEb1dxVGFuSkpEV3R0RGFtVUhWK1FJdnJzY1dkV0ovSjlScmxEb1gzTk9aVG5NY1JIa25ML0NheVR4bnJGRkt5ZW90am04S1cvM3FHMk5xY3hOVTUvajU1c2Q3dFY5cGNwK0NubGJYR3lrYVUzQVJaaHBZcFFtNVcvb3FSNWtiT085SjhpeFZvRDFMK245YWJ4cDB6b2NoeFNKbnhZYVJOelg2eHduTVB6bVpMV2tKanluNWdFdHAzM1JoVHN2bjNWbUtqa3FaMjFPNGIrTENaWlNtcnU5ajdxWFQvZHlydHBLUTJnYzl4bFB1UUl1MWlCVHVzakhFVTUzQVVvZXY3eDJac09JMTdmMjhXKzNMamVQNWZ0czJsL1RZLytUYjVnQ3RlcXYzWjVRcmZHOUhYTi80ayt0ckdrdGZiWHA5NVBmazYvenB3RzEvakhMN3hGNkh2eGFzdjB2VXZRdTIzd1BldE43NUZXZWp3OStkMXhzYTI1L3FmbTNpTyswWlRvWStjZzhnemZjOGNmK2IwTTI4OEk0eS9DNzUzcnI1RHg5ODU5QTZOdndQalh3SFRXZDlaT240V2ZFK3ZmM3JoYWU3THArcDhwc2NPUFVaUFB3WVRqMEh0WXlBK0lEMVE4Z0EzOFFEODNmMVp2c2duYXo5SlAzYlhvTy8wUitIZTlUNGZ1YXYvTG5yaUxqanhFZmd3WnNWOTBqNDYzYi9nbStwYjhFMWcrK040anpVdCtES2pybzNxS0xkUnhTMzRXRDlQenhkSEc4OXZoOHNEME45WDd1dkR1cjczSXU4OS9CNTMrajBnMnlDK1RXdHNQTFQxK05hSHQzSmJla0srU0ErUW52NGVlcUxuclI3cTZ3RnIxTEpSUUZId3lOUEUrYmhhYmowM3poM25WSnFPWnIrdkRkbU50eDVxUGQ3S3JXc0srSnFiSko4cEFmR0UzdFRZaUIweU5mbWFhRmJDczlFUnRXODBnMm1qR0RWdHBFQTJRcFJzakpnV1ROUms2ak1kTXJFRFMwSm5IQ0RBT1RoeHByTWpGRnA3VHIzUXZqYXBidHVTaEx1VGNnZDd4amYwSkZWM0o4bkduaTFkWndBKzJuM1hzV09renJzMldkYlJsZXozZHE5TkRpSVFaOEFNQXFMM2pJUFVkVTlOVGFlKzVJV3BVR2c2UlBBT2JadFM4bFBUK3pBM1BUVk5RcUdwS1lVR2I4eE1BK1lST3hXYVFnaDNGbU15QlZQVERKZ2lVMWhPcHRnOWpiaDlyRGFyNnRxRzYrbC9Ba3puckRBS1pXNWtjM1J5WldGdENtVnVaRzlpYWdvS01Ua2dNQ0J2WW1vS01URTFOVElLWlc1a2IySnFDZ295TUNBd0lHOWlhZ284UEM5VWVYQmxMMFp2Ym5SRVpYTmpjbWx3ZEc5eUwwWnZiblJPWVcxbEwwVkJRVUZCUVN0TWFXSmxjbUYwYVc5dVUyVnlhV1l0UW05c1pBb3ZSbXhoWjNNZ05Bb3ZSbTl1ZEVKQ2IzaGJMVEU0TWlBdE16QXpJREV3T0RNZ01UQXdOMTB2U1hSaGJHbGpRVzVuYkdVZ01Bb3ZRWE5qWlc1MElEZzVNUW92UkdWelkyVnVkQ0F0TWpFMkNpOURZWEJJWldsbmFIUWdNVEF3TndvdlUzUmxiVllnT0RBS0wwWnZiblJHYVd4bE1pQXhPQ0F3SUZJS1BqNEtaVzVrYjJKcUNnb3lNU0F3SUc5aWFnbzhQQzlNWlc1bmRHZ2dNemc0TDBacGJIUmxjaTlHYkdGMFpVUmxZMjlrWlQ0K0NuTjBjbVZoYlFwNG5GMlN5MjZETUJCRjkzeUZsK2tpQXB1SEV3a2hwWGxJV2ZTaHB2MEFBa09LMUJqa2tFWCt2cDY1YVN0MUFUb2V6d3pIZU9MMWZyTjMvUlMvK3FFNTBLUzYzcldlTHNQVk42U09kT3BkcEkxcSsyYTZyK1Rkbk9zeGlrUHQ0WGFaNkx4MzNWQ1dVZndXOWk2VHY2blpxaDJPOUJERkw3NGwzN3VUbW4yc0QyRjl1STdqRjUzSlRTcUpxa3ExMUlVK1QvWDRYSjhwbHFyNXZnM2IvWFNiaDVLL2hQZmJTTXJJV2tPbEdWcTZqSFZEdm5Zbmlzb2txVlM1MjFVUnVmYmZYbXBSY3V5YXo5cUhWQjFTa3lSUHFzQkd1TkRNcWJETm1EUEVsOHc1T0djdXdGdG1LMnlrejBJNGsvZ1NPUnZtbFhDNlluNUVqc1RYY0RETUc4VGx1MXYwVEpsMzZCTU9WZW9FWERERHYrQmFEWDhyRFA5aXdRei9uUHRvK0Z1Snd6OFRocitWbnZBdkpCLytscytsNFo5SmYvaGIvaWNhL2xieTRWK3NtZUZmOEZrMC9ITm1BLytNYzh6ZDN6TERQeE9HZjhiOURmeFR2aGNEZjRQTHZkOGlYelBQNGMvNHFPYnFmUmdkR1ZhWkdaNlczdEh2UEkvRHlGWHlmQU5OV3NHK0NtVnVaSE4wY21WaGJRcGxibVJ2WW1vS0NqSXlJREFnYjJKcUNqdzhMMVI1Y0dVdlJtOXVkQzlUZFdKMGVYQmxMMVJ5ZFdWVWVYQmxMMEpoYzJWR2IyNTBMMFZCUVVGQlFTdE1hV0psY21GMGFXOXVVMlZ5YVdZdFFtOXNaQW92Um1seWMzUkRhR0Z5SURBS0wweGhjM1JEYUdGeUlETTNDaTlYYVdSMGFITmJNelkxSURZeE1DQTFNREFnTXpNeklESTNOeUEwTkRNZ05UVTJJREkxTUNBM01qSWdPRE16SURNek15QTVORE1nTnpJeUlEY3lNaUExTURBZ05UQXdDak16TXlBMU5UWWdORFF6SURVMU5pQTFOVFlnTlRBd0lEYzNOeUExTURBZ05EUXpJRFUxTmlBMk5qWWdOVEF3SURNNE9TQXlOemNnTlRVMklEWTJOZ28yTmpZZ05UQXdJRGMzTnlBek9Ea2dOVEF3SURJM055QmRDaTlHYjI1MFJHVnpZM0pwY0hSdmNpQXlNQ0F3SUZJS0wxUnZWVzVwWTI5a1pTQXlNU0F3SUZJS1BqNEtaVzVrYjJKcUNnb3lNeUF3SUc5aWFnbzhQQzlNWlc1bmRHZ2dNalFnTUNCU0wwWnBiSFJsY2k5R2JHRjBaVVJsWTI5a1pTOU1aVzVuZEdneElESTBPVE15UGo0S2MzUnlaV0Z0Q25pYzNid0pkRlRYbFNoNjlqbjMxanpjbW01SktwV3FpcXJTVUNXcGhBYVFFQ3BkaElZQ1lTaEFZQ0ZaU0FLSndRd2FBV1BIUWJZWkRKZzJpVEVCN01TMEgrMDRObWtYbURnNGs1VnVuRTZXazVpOE9PNGt0bVBpSnAzMGMwaG9oL2puMlZieDk3bFZ3bUFuM1d2OTk5ZjZhLzJTNnA1cG4ybWZmZlowenEzeDBXMkR4RVFtQ0NQSzJpMzl3Ly95emsvL2lSRHlRMExBdm5iN3VQOTZrK0xIK0NWQ3FMeHVlUDJXNHFvMy9rQUkrd3NoV25IOTVwM3J5czNmdHhCaXhDb0xqbTBZN0Ivby9ZeTFtcENPWTVneGF3Tm1QSkRlcWNYMFJVeUhObXdaditzZDJ4UHZZUG9hcHE5dEhscmJiemRzK2pNaEszNkg2YzlzNmI5citIdWFGd1ZDVmc1ZzJyKzFmOHZnNHNFbmoyQjZOeUc2UmNORFkrTURKSFNka05XOFBmL3c2T0R3bjd1K29NUDBWUnpmT09ZQi92R1BDYU1hbnFaTUVEVmFuZDVnTkprdFZzbG1kemhkc2pzbk44K1Q3eTN3K1FNemdxRndZVkZ4U1NSYVdsWWVxNWhaV1ZWZE0ydDJiZDJjK3Juay93OGY4UkJ4a1lUWVFLeGtXSDNlOG1HblNTNFByLy8rMW1kNjBmVVAvdDhjaFM0VEhDTlBrWFBrRVBrRjZja1d0SklrMlVpMlljN05uKytTbjJBdS95UkpGM21HSFBnYnpaNG01N0U4QTlkSEhpYkgvd1pja255QlBFLys1Wlpla21RTHVRZkg4alh5QzVoSmZvQ2tNa1RlQXgyNWo3eU1yYjZIZWJmOXRhWW9VanRacDBiWDNaVDdCbm1NSGlRTDZXVk1IT2NsTkVZbGNvRThEcXV4NVhHYzU2RWJNLzQwWWUwajkrSnpPZGxBdG1OYy9ZZ05ILzJTNksvL0NXZDFMMWxJN2lmenlPYWJhbndMbm1BR1hMOE84Z1RpOUx0cVhteTZVSnRnZDlJWEtKMTZCQk9mSSt2eDJ3ODRkM3FJelNQTm9nM09FYUswck9wYzBiRjgyZExra3NXM0xXcGZ1Q0RSMXRyU1BMOXBudElZYjVoYlA2ZXVkdmFzbXBrVnNmS3kwdUtpd25Bb09DUGd5M0hhSkt2RmJEVG9kVnFOS0RBS3BMUWwyTnJuVHhYMnBZVENZQ0pSeHRQQmZzem92eW1qTCtYSHJOWmJZVkwrUGhYTWZ5dWtncERyUGdHcFpDQ1ZHNUFnK2VlU3VXV2wvcGFnUC9XajVxRC9QSFF0N2NUNG9lYmdLbi9xaWhxL1RZMExoV3JDaklsQUFHdjRXM0kyTlB0VDBPZHZTYlZ1MzNDZ3BhOFoyenRqTk13UHpoODBsSldTTXdZalJvMFlTeFVIaDg5QWNSelVDQzF1bVhPR0VwMlpkNXRpNFpiK2dWUnlhV2RMc3ljUVdGVld1aUJsQ1RhclJXUysybVJLTXorbFZadjBiK1JESndmOVowb25EengwWGlKcitxS21nZUJBL3gyZEtkYVBkUSt3bGdNSDlxVnMwVlJKc0RsVmN2ZmxISno1WUtvMDJOeVNpdkpXMjVmZDZLZjk0eTRoSllhbG9QL0Fud2xPSjNqbDk3Zm05R2R6TkdIcHo0UkhXeEc5Qnc2MEJ2MnRCL29POUorL1ByRW02SmVDQjg2WVRBZUdXeERESk5tSnRjNWYvOFpCVDZyMW9WVXBxVzhEek1sT3RuVlplOHF4dExzelJjT3QvZzM5bUlQL2pjRkFyU2RnV3pVTmsveGJ4UVFSZ2VoQW5BWUNmT0lIenl0a0RTWlNFMHM3TTJrL1dlTTVTNVJZZEZXSzl2R1N5ZWtTMXdwZU1qRmRjcU42WHhCWHMzMTU1NEdVRUY0d0VHeEJIQi9zVDAyc1FYcTZreTlGVUVwWjN2Y0VnZ2ZzTm45ZGJKVUs2OGRSTFJqWTZFK0poWWdXckhWekJhUVVYdVdBcENZczcyZUNLeDdzb05CbTk5Y0ZzUm5lVGt1d3BTLzd2MzFERGpiZ0x5dE5KYUtacGUvb1RDbk5HRkg2czJ2VWNxWWloalg2KzNDSk5qYXJ5NWVLQllkVHptRFRqZlhrdzJyWnVMeFRyWkt0bG5MT1Q1Ryt0ZGxhcVZoTE0rL1ozM0tncnprekJONVdjR25uaTZUcStxVXoxWDdQODFXa21xeHE1c0R5ZktTcndwWURuUVByVXI0K3p3RHV0SFgrVGs4Z3BhekNCVjRWN0J4Y3hRa05NVlJ5Q2JzTHFEMm02UHlPenZibHdmYWxYWjIxMllGa0NuaHpRcmpsRTgwRU96MlpacERrVXJxd3p0OUpQV3dWQWtxWTRXL0ZTTEJwTGo1VDJyQU92eElpWE0zbHBObzAxOThKSGpJTmpjTklsZmhiQnB1emNEeDlTNk1pSjZmNWllbldORHlKN2N4UGVBS3JBcGxQV1NuRlluKzJZNnloNDBoTlRCZXhNSElDektQWWpKckZjWm5EYWQ3ZkdSd01yZ3B1OEtlVVpDZWZHMGVQaXVVc01sU2NaOWVxNDViVVRjaENOSkVBRms4bk9ESlRyVkhQemNoTnRhbnBHOG5FSjRvWFRCZjdEK2lDN2NzUDhNYUQyUVlKam54QmluQVNWbXB0SG5YMzgvMGNiTzNIVFl3N1d0M1BCODRvQ3QvTEcvaTJQUkJjTUhBZ3VMeHpyZ3FOSE9SZXo5MjhMenRwaC9hT3BySlNaR1pOWjRMdzROSXpDank0dkt2elJRbFZxZ2M3T3M5U29QUDdtbGFkQ1dGWjU0dCtsQlZxTHVXNVBKTW4vRHpCVzFxR0NaMEs3M2xSSVdSQ0xSWFVERFc5OWp3UU5VODNuUWRrN1htYXlaT204eWptQ1prOFJjM2pIMXlsbkEySVkrVGZMZjRCdmo2ZldiWGhRTjhxVHVORVJvemdQNlFnR0Vmc0JPTm5nR3BNS1VOd3NDbGxERGJ4L0VhZTM1akoxL0I4TFZJR3lGQldldmNCcVNYNDU1d3lWWFNUWm53TWlDdFFBOWFTOGpOQVluUFBhZ1hkbGNvekd2SE51V2NaeFNnNXczaTJ5TFBQYWpYNmorYWVCWjVmWlF2WXdnRmJvSm42MHlFNGx0NGdydmpnMldiaFI0UnJvdldFYUg2Tk9sY08rWXJpaHh5VExVRnlqTGFFbXdBUXMxbVhZM0YzVmRnVmU5TE83SGw1NTY5UEtpNkhPN0VrRDBaTTk1aytaMkx6VGN0TmEwM01kUDc2NzVSWk9tUENSQ203bzA4M29hTzYrODJmTjFPVE9kOU16UnBxeTJINlhvdkp5SmpkelhTOUJLemd3OEc1UUdNbmpWVlZxM3RzVlZmY2xSakRwNzJ1cHdkaVBWY3FZNVhSbnA2ZXFQUW14akczSVZaVk5iT2lKeG9OQk1IbWRnVnFadHVLYWdKNkNMaTAyU1JiSFV5N3pxVm5uejROUitFY3ZBa1RwMDlQWFRvbjNQZmhxNTZhR28vd3BieWFqd1QyVVUzZWgydlU5RXlpNHFBRWNYdU12WXc0MlBTOFlBQjYvdnJQbFpqZW1uRDRZQWgyQVFQUXR4R0xaUEZiSmkwWExaY3NHcDNGbDllYlI1VThXT2xZNTZBT2xrTTVhaVM5S1VGcGptUk4ycTE2UzlMa0lvMVhLaHV2TkZiRm90SVBxbnBnWkRTMm1rK3JwM0ptUmJRSFhNR2lHUmFxL1hncTdqaXJvc2VpYy9JVnBWNysrM1RUamgxZzE3dVRQVDBoOW5KNnE4NXNOMHcxNVphVjVUSi9idGsyeDh6U0FoeDd4L1hmMDUvaTJHdkkzeXVoaFpVSEt1bG5YQSs1NkJ4NW9YeTNmRUFXeENwWFZiaUt6YzFibFBlWnZJZnlCSFZ5YnIwNVVaQ0RvdzBya2lzUkRqdGF5V3ovYkpqTkoxRlJFRWdzbWQwNys3blpyS3cxMzJqTWQ1U0prV1NndXJDNWtCWVdCaVFwS1ZZYm00Mm5qTXh2QktOUmxISDlZajA5RXA4bVB1MTFkUkNyaWtsWGVxSWowcSt1NE5SeHJ0RWVnZ3ZaQTA0TERjNG9wMFUxVmU0Q3FLcWNWVk5kcnFtcGp0T3FTdG1OMkNpSDRBeU55MW1nb1Q4dDZ0aXpPdGE5ZUk2NWJLWnZUVlBQWUtUNTl1N2JteVBseThkYW11K2ZHNHZrZFZVdFhSRnA2Ynlqc3lVQ3VzYU43U1ZHcXlUKzlvSDg0cVVyS3VlVmVnc0s1M2JOVndhYWd3N1RqN2E0YzVMTjVmVWxCZjRTNVE2KzN2dXUveHZzSkQ4akRsS2s1SktqeEFERUlCbXVHbGcyMEJtc2o0a09YRHpBOVJvWnZUS3pJcHdkZVdhd0JSUjJPdnhsdVhtbGZvZkRYNXFYVytaMzNKRmJHbkE0QXFXNVBJR0ZKTE0yNGo1eEVkTFgyMHI1VGhGMkdrQmprMjJGdGxhYkVNNEgwZVB5aEQwc0xJUG9kcm5EYnFabmVpdEVyTlpnRitFcmtXdXlKa2kwTU5vYVhSZmRIaFhlajhML2pBSk1SaUhLU3p2bk5TZVNVUkNpb1doMXREa3ExQWxSeUVTUFJNOUZMMFF2UjY5RmRWSVVxRCtxUlB1aXc5RkxVVEczdTBLbjROWlVjS2ZxU2tLOTFrSmY0Uk9GckxDd3dObHJsQ1NqVU5ETCtMd2IrUUxhNi9nZWhGaTA1MHBQNzhqSTZHcmNpajI5UFQyNHJGRmMxOVU5TXl0NlYvZGtQbUVMcU9pUlNBQ1gwcFpaU2d2RnRVUjB4YWxLM1M2dEtJeC9jUGlKNitmNm9COVczUC91bmZNOUxkL2R0TzNybjUyL2VNOXovVFA3VnpRNVRzTWZIMmd0ckw3OTJZLytBZnFneDUrZnZ2VFV6SnA1bjcveTdGZC9lMkNPMlpsamhIdnpaczNLeS9ERTVQWGZzMWFrZlIrSmtIR2xiTDhUampuQTZEam9vTEtuMEVQMU9iazVKVG5IY3dSZFljSm5OUHBLU1NuRUowcFBsbDR0WmFXSXd1Zm5MMHp3VUhGSHloTmhTRHdvZzB5UzRiREduOHlWTkV0dE1zY0VSOE1WbFJ0Rm95T3JlNlFmVnlKcVpsWmtKZzQzSnVpeXNBeDl6T0xrNFFYZ3N3OVVsMU1RWEkyalBRVk5UZkU4OTd6Rm5XWGIvbjZnOU1jdnRUK3dwaTc5aGRxbE5ibndlVnMwQWIrd0w5aTd2a0hVR1RTMVZvOXNWajc3alozdnYxZTgra3ZibDhIanNaWDNMRnAwejhwWWhsYzVjYitYQ2ZlaFJYeTdVa2RyZGJhRW9JSG5QRERwZ1ViUEVnODFXTnBZMHRubnBFNm5sakNKK1JuVE1jR1UxQ3Q2UzBLdk5WcGR0cVdFejZ5cXNlckhVYjYrcTN1cTFKMWIyZE16eXRtck9LT3d4aGFzYVFUa0hLNmd6U25qUnVYemc4Vjl2ZmZjTzlqNHIvOWFYeEZlNExQT3JHOXlqcTZuajVRVi9leG5IVk83NWpVWk5QTU1UcXNoTzA2MCszNkRkbjB4U2IxSXpJaGtKTVpFaWJQT1NYT2NvT2YvcmphckJMSVVPUmtCRXBFaWs1RkxFYUh1Wk9ScWhFYjRvamlqRllsWUJLUUlKQ013SEptSUhJNHdYdkM4YjBaQ0JZZzY1QVR4dFUyRWdJU2trRDgwR2JvWXVoVFM2RUxoWkRIeHVhUlEwakhEVlNDS3Vjc01FcCt2RFdlTWNxUXl1NjM1Z3VMbUhvMGlZWTlJYjNMR3pCY1Z1UlZuVTFwa3hiaVFyaXh6cmk0TTNzcXFvUldBMGZ6azdiZUhablhOQzQrbU45MjdkRVYrWTN5V2ZWZDZZTWREVU1uZXR4UkhpODFTcU1CUjBIUm4rOVJSenJqcDZ1V3JORHFqTU9YZ0taR3F3cDJTQk5MeENQc3VVdkVzOGdVbHNLa1FQTzZvbTFya3VFenRmcU0xNGJXWDJhbkpEbVliZ0FEcy9QVkxpbGR2UzZCazB1VWJaclZwYWlkcW9iY1dsRnJBeU13Mlp4SEhqODlnU1JRVkxYR0NzN0J3UmpTWm4wOW1WUzAxV0dWTlV1K2FrU1NTU3QwY0pUYWtjS1J5SkhJdXFLNXdwRWh2SXFZNGxYTUJyRDVnR2h0RjA1UWVGeG9CR1RqeVJZMFZnalZ4Y0dndHpPWGsxQUkvVWJZbXk3YWwwdzVyVmFKM1RuTlBiVTdCckFVcmVpc09XUUsxa1lvMTRSbTE4dzYrL2tEOXl0cjhoNXZYVnJMdjVzeFoyejYxSjdkc3RiVTRtQk5wWHo4MzNoMHZrblVnUEJKcHFjelBjMjM3a2NXVkxoQ29vendaVC9seWtMNzJJODZ1SVcrdEo3OVJublQ2UXI1cUh6TTZJQXIxUVBNQUROVjUxWFIzRFBhV2c2dThwcHpPaTRDUTQ4eWh1aElIR093b3R5eGcwaGhrQTdVVytBcW9WRkJnNnByWlFCcWc5bExEMVFaS0dpNDIwSW9HQlFOVzNPWENSWEpWdUJSWDBpWG9YT3VLb2FNWUhpaUY3YVhRVVRwUVNzT2xJSmZDZmdrV1NuZEwxQ1NWRmd0NTJ0NVpBTE1jd2Q0ODRnT2ZMMDhnR2VtWVlhenV1cDdwajdyOVlpclNrYm44S3N0WFNjOXEvT3ZKY2xmZ0R3ZUtUTVpaemMweTgyWkdpNEl6SzEwUHpnczZtcGZmVWJwb2VFR29ZZTFuOTN4MmJjUGM4YTlzWG51MmZWNndkQ0s1Y0ZQcmpJYTF1L2JzV3R0UU4vYlZiZkc3N3V3S3dNYXY1VVFEanBMRW1qbUoxZlBLeW10WDd1cFp2R3RWUlo0dC9SK24vQkgvN1Bib3ZKVU5wYkg2N2dmNmVvNXVxak01ODh5WmZlN0JkWGlMblNaZWNreFo1Vlp3azV2MGMvWFVwSnVMY3NhcWFiTWEvMmlrVHFQdnBBK0lUL0pOK2k3NWhEcmk4L3NxZkFyR1JjWFg1eHYycFh5Q1g0MU1JR0RLcHlGdHFWeDRPUGVKWERxWmV6R1g1cW9NQVlWV3JqWXZxZmRhTld5WjFTa2JreFlYeVpBdy8zSkpOVEtTd1dSMlE2dDhHdmV6eXNMNHRyMlpnTlZ0WE5lK292YXUycitEcWgzcFAraTh5ZHM3UTdNNkc0TjNRUUdZbHEreVN2UzN1V1VmbmNndFd5VE55TGNYTkcxc3ArdHl5OVI1SXp0bXYwYlpFeVF2dkVoMHVDRWplaWtoNkVCbjVWcWdWV296R3Q4MVV0a1lQaFVHSWV3TVh3aGZEZ3QxcDhMWHdqVE1aNU9EN0MwYUJtY1lKc05BazJFWURrK0VENGRaT012aVZLQXl6dUx5MmlZUWJaUmp6NCtSaTRnMWpjN25Ud2F0ZVpMUmw3UjRYYm1FT0plSmY1dko5ZDdLNXFMcXhvYi9qc00xNTkvVzBYRXpkNHZQclVIdWR1ZklDSmhZM3ljWVcrZnkzbzhaRzlkUE9WOWJpTFR4VzVRQmVhZ0JmVWFwV1ZlOHZaZ2UwNEZldDE5SEh4ZmdrQUFtQVhSMkVteHpSMGtVMnZDclJDZWlrMUhtUjQyRlJ3UlYxY21QbGljOGlTVWk2a25KUEpjaktaT2lwRUVLb2lXNGxLbWlUUHFCeXN0VU9SM05iS1ZwQm5aRFBmSGJzcHVtbkRWQWxoUkFGZDlJR3FybVNYOWErc0NxOUs2cU81OGNxaHFyb1JUZ1M5QThudjVMMmhkdTdxdWZlMmM0c3JWcXo2N1c0R3o0OWJadlB0QmlNaG9Sazlack9XVWZ2SmhiQmovYWVIaFZrUnNwUnFkL0hlZmVoSE0vamZ5cG1OU1N4NVF0czNOUW1kdGZCQ2Q4VUZDTTBmb0M4TWhSbWQ1cHZ0dDh3c3dNaFhtRmtVSldIUmd5ekpIbUpPZlE1SnpoT2FrNVYrY0lwVVBFNlJ3aXU3REpRSFgxekhGOWFIL29lSWlGUWlYNVl6YWZISk1iWlNiTHR0eVNNWTI0Vnp3cU1wMm9KWTI0ek5QcU9GZGRwQitvekoyekdlUXhsWnpCUUlhdlJ4MFpqUmJzeUQ2RTRJeENWVGRYR2Mzc2pFNEhxa3F1b2dtWmZkUGM0Wk1EbzA5dHFTbHE3Ujkvb0tYejRXWmtOckdxbXR6V25WMnp4YVlUcXpvZUdwd05aKy9iR1dqc3JtL2FIYytmdTRhZFd2L0VwdG5KTDZmVForNTc1Y1NXWnAvTjlydkRlb3RSck4vOTAyUGhpcXJCby9DTjU3K3liTFRObjUvN3lOdVB0bWY0eWo3Y1h5K2pYYW9qU3hRUDhhTTFKbW8wb0dVR1lsQU1WREgwR1U0YUxoa0V5SEFHY3dKRTFQTzIwNGY1MFFyK1U4MjBXVkxYcURJR1ZOeFF6cUg5R0hVRWJRRVhCQ0h3Z3lZV24zcm1QdG8rOWJ4QW9PRzJEeVhobENxUE8zSHQvaG5YcmhEbDhXbWwvZjRRT0owaFo0ZHp3RG51Rkt2ekIvTEg4MWxOemFNMVZHRHEzZzZGZDRjRkhhN1UydzV3S0dZcDRYRHN4VUhVa2xxbGxpcTFmYlVuYXkvVkNyN0tJY1A1NjFlVlVseitDajRKZzYreU1qYStkd2JNbUZHVU4yWWxUc25wZHpLbjA2b3RHbnNRclFXazkxelMyUE5YbGhMMU5qNmpuc29ZR2xrM3RGRXliV0FCQ2dsN0hLYXRLcWJ1Yko1R3cwV1ZJTGpYTlZwY1ZQYlBOUnVPRDJ6OTZvN0c1UWRmV05OK0l0NFV0S09SN1c0YldSWVRFczkyZE94YlhabGVvM1RPY3E4ZmJuNTBvYTk1QTV6YzhPVHduSlhQa3V2UHZBQ2FaNUpPNjIvM0d5U1R0dm5BeFVPRkZiRyt6NmZySWl0MmRaejZmRjdPNFY4ZFg1Slp5M080bG52RUJER1F1QktSVEVrVFRacUdUU25UVlpOQXRpcVNDRVJVeEtSNFVreUpJcEx2aEVGRHhER1dvMXJQZVQ5U0dWa2VraTZhWVNKeXA3Qk5yQWxYMFRHd1Q4WEFrZjVQMkZlZFZLMzUxdjZhWDZucnR4alg3Nnk0akpoSmdQUi96U2VoQnVYaG1HOUF6SzkwclhOUm00U3hIU1p1a04ybGdSME1MRVBJeUlOS2tDckJ2dURKNEtXZ2tET2s2QTdyVHVxWXpqRm0xSHJIK0ZKa09ZeTZpVkJUVm5kUUZNVUw1VHNGRzdWWFZkcVpxaEY5YlBxd3N6V2JueHA1N2VjL2YvTzFOOC9uMXE5ZHNMQjNsc3MxcTNmaGdyWDF1ZlRVMCttUHpuVERBSFRBYmRDZi9oL3A1dzYvODlqU3BZKzljL2p3YjU1WXNlS0ozNmo0STZqejE0bXRoSkZGTDJMaWQwcVJ4NTh3VUREUVBCcWgzNkQvaTM1QU5YcWFnN2xFaExsOWlFbXFNTlFPejE5UGZaM3ZEU3FncmR2SU4wS3NaNFFyR0ZGRWFkUWRoS3FCQWZqWE5VNnhTKzFuQitJdGhYdXVsT3hVWnU2aFlQWHJ6UW1ORGtUbVltRzBJd29MaS9PR3RpT2JvV0k1S1ZmS3FWTGVWMzZ5L0ZLNVVEd2N0UENkNk1VS2xobStNVlNZaXJhSE5LNHh3N0Ixd2txdFZyQmFEYmszUEFXcVVjVUY5dXNxTW50NE9pT3JNM3FtU3NhRlJld21uWWVybVZxK2N3TzJPSVBmREo4ZXI2L2IvdnpPMVY5WlpHd3FzMWZOVlFwNmRyVGtlUkwzcnFudjh2YlJwNmZPMnN0bXR6Q3BiUFhuQm50UGJKM3JraUh2VzJpZTZHTXI3MXF3ZUh4eGthU2p4NCtuT3dTZFZzejZ3WVFTbkhzZStiV3kwR1VPbTJ2TXpHVUttMnBNTE5mVjRscmhvc3psZHFQaUNEb2o3di9kK1VmeVdWOCtDc21PZkhvNUh5N21Rd2Rtbjh1L2tDOG8rUkRLcjg2bnFYekk1MGh4eEZzU0pGL0s5K2V6ZWdIcm5jcG5hbjc5N0RtSnlYemdjRTdvU21vdWFhaW1FVzFRbWZRNUszSWhOemZtN0hVT2NZNmdjZlRwaVFsTUptMnZub0dtVjdCblBFczMrRUxHZ0l0bDNHWW83N20wNTlvUWZrWlJtLy94Nmg3Ty9IcDdiTnlCMW5PVDk0eHJrQ3dLdHNEc0tvekMwMjlQZmZlSjArd1BUWDUvOStvTzl4dHcwTmZRNEtOZFUrOVArOC9TTC8xQzBEQ1krc25KOU1DVGlMY29JWnBjMUlQbXNtOHFlNFFhdUZ4enJZYUtOYTZhY0EwVHF1Rnk5YlZxS2xhN3FzUFZ6RmdFN3haOVdFUmZLbnExaUJiNWtUQ054ZkJ1OFlmRjlLWGlWNHRwTWM4UkN1Rnk0YlZDS2hhNkNzT0ZUQWpEWmE0eWlXRlhPQnhtUmplODYvN1FUVjl5ditxbWJyVUZHZDZWUDVUcFMvS3JNcFY1anZiODllOHJSa05CQWpRMlRVRERKTzd3dW9oNktiTUI3dVpRVzBsSmJVNmJ4bkhVUVEyT2VHdDhlNXlXeE1FWkIwMGMvbkk1RHY4ekR1ZmlGK0wweVRnY2ljUDljUmlQdzVvNGRIQUFPVjZJTllUMzRuQWgvbHI4Y3B5ZGpjT3BPTXlLcjR5dnc0YU94c1ZRSE9RNENIRzRGb2ZYNC84ZXB4ZmljRFQrUXB6dWpzUDJPS3lLUTNXOE9VNEw0MkJYd2I3L2ZxYTcxK0xzS2JYRHZYRVlqY05BSEpKeGFJcERLSTd5T1FPS2tPL0U0YlU0ZkM4TzhmUFhKeFQzYzJjVHkrSnI0clNaRHdGQjFSRlN0ZXo2cVM4bm5veWZqZE9ibTF5WmJTOHp3bU44Zk8vSDJhazRId0E3R29mZEhHUzcybDVoZkZhYzByZzlUbkVpLzU2WkwzMkJneHlKVXo3ZjdYRTIzZUg3ZkZTWDQvUjdLaktPcXVqaXc4ZG1LbmhQem5nb3pqWmN6VUtOWTNkVTRmbDhMQXliZnlNT3FmaGtuQTdFZDhkUHhWa3lNOHJtT0pPbU1YbVJEd0NlamNOaGRaRDE4VTF4NnM4MFRXdlZWdnZpSitNVTEwamhTNGxUVkxxUDRLUXV4Ni9GaFFtK2VPTnFuOVZ4OEtodDRqcFB4b0ZLOFdSOE9ENFJUOFZGYXh4MHBLcHR1QmJsTnRUV0plZGFIVG1oa2lxeE5sa2t6M0xwQW9IOFpXYUpWRmFXWlJUdFNxNXk4b2Zxc1ZibHdvanFRT0FPc3BIcGpUYzZ1dnFHcFRmeXFlemV2MUp3UzVXb21oKzl1ZkJXZ0U5WHpwWktyNkVHeU8zNlN0VkpGeVdvNzZPMk44Sy9tZjliVTZveElMdi9xa2tnL3hkT2tQemJsbldFV3JaNS9WMzl2WVhjY3RxWlh2RlErNHE4bHBaR2wrMVF1dW5naWhYNURmVTE5a1BwbFR0MmdDTmpObFRYMll2OHpsdU1oMVU2ZzFtWU5lL2p0R3BNNU40d0pqSStlZ2x0Q1QzWnB4U0xiVkVDUmdKenVza21jZzk1akFnZTBrMitTVjRoQWs4OWk1TFNlTUVJUm01TE5iWW1qS29SVVZ1Zk9Hd0VTb3lTTVdrOGFVd1pKNDJhd3hpNWFtUXFZRmxGQnRDRUNwd21xU2RFVExLc0J4OVVLMm8wR2gyVjNzellsOXduL0RFZWh2NCtuWHZ5SkxTMjN1VFdRVDJrR1BXZVMySXo2ajBXY3A4aW1XcGxiNkpHMDZKWm9XRXJOYURoS29uZGtaZVFwS1JFazlLd2xKS3VTb0taSDZYTWxEMEpzNkE0Y3hPQ3dhQ0RyUllOenA3NnFVS1RkSmllcENtcVEvTmF0R3dqaklGUnF3RlVsaHFyVUJKdzR5L2owc05JTEJhdGluSzlDUjlvVzlsUWZOWUFtb2lxOXNzaXA2ZWVvUStQdlpEK2twajJ3MitnS1AwTEtOckRqbjAwK2pDcm5PcEJIRTdyVVY0eWs3U1FKNVRoZlFCN0dOaVljeTg1aXZNYnFwdzc1SFBDL2M3UE82bFVDUTlYUGxGSm5aWE9Ta3ZCMEY3ZFVSeGdtOVNXYktQSnR1RzJWTnZWTnFGNGFML2x1SVVtTFdDeHNlRFl2SGxsczFHdmN1V0djL2ZrUHBvcjVtckx4dlRHWEdPSmNiL3h1RkhVR1hNemhveXFIbHpoNXdvOVBWbDl3VlpYRjhNZGgrdUFOZzBtVktubTFHZ0xtTXVwUWRXaHBuclc3SEtZOXRaL1NpZjdaSHIvcG00azNobXZ2L1A2NnhOYmJ0OHljODJSZ2I3UHI2MDhtTmN3c0dCaFg2MHMxL1l0WEREUWtGZmlxdXlJeDVmR0hJN1kwbmk4bzlMRjN0OTZ2TmlwM0Q0MC96dVQzLzd1bnVkS2lvOE5MYm12ZTJaRjEzMVR3UVVqaTR1TEY0OHNXRGl5cUxoNDBRaDl2WDVOVzNGeDI1cjZ1WDNOb1ZCem42cHpMWUtqdEkvR0VOdjlpcE9LRlNJMGkrUGlidkdVZUU0VWo2QUpvRG9MVm5ZbkprU2tYUkhxSnNXcnFOMkp3K0tFeUhqaDgvVktRZ1V5Qm9zU3UxQ1hKaS9DdDlTekM5Uk5PYTMyY2swQWRZQ1pGWTZhZ0dzUmRjTFI0OGVuei83RWc2anplTWhocFVUbkFwMFRkR2JRbVVCbmtMdTZiVkJ0YTdaUm03ZlpPK0M5NEdVaGJ6VkdtWmYzT2FjaHdVT2x2Q2lTdU9RRm12UU9lMDk2TDNvRmZXNVhrbDZpbE9iMDZmVlVNdXBZcjFsa3ViS045am9KYWkyVnFuTkNkVkhjY0t6ekVlSkljV3ROdTJ4NmVxcHFzbWNHdGtBMnpPdzJicmJYbno1TmMwL1RIYWRwenVuVFU3ODdQYlgvZEVZM3FjbWIrazlxNVdIbWZJL1dUTDNpcWNuc1JkUlRxQjF0T2dkUzgrUEtjckxRYUhqTThLeUJ2V3Y0MEVCM0c4Q1EyMlowUnAyMDNkbnRmTXo1b1ZQZ3FYcm5zODV2T3Q5MWFpU25VdGVRY1BvRW45Tkg2Njc1NExBUEo2MzZxaVo5d21HTVVGK1doNmhoamtjTkZRbDVpYmpjS3VRbHZWWm5idEk5ZlNMSU9ZcktVbFJYQmRmR1I2ZGU2MUhaQ256aXFJbDl6R2J1c1JVVXkzSlJnYzFXVUNUTHhRVTJBK2M3ZXlBcXZIMXpMa0o5dVBSbVA0eTZqMUZITXhJZmVVaVp1OXR3eEVCRkF4elVQYWFqeUYwT0NvOEpWQy9BYm5xRVVnMUZBa2lnNFJUd0I2Z1VxQWdrQTVjQ0FrOHBBVllmNEpPUzV5MU1QQkdBNFFBb2diN0FST0JrUU9nTGdGcGtDWmNuNUlUR2x0UkxuaVNUc3liVGxZeWpuYzlTdFp4dUNEQTBuVEtiRllXUDlsT0cwK3Z2Y0xQcDlWK2UrK1EyaERmK2VKMmsvL01QSC8xZmYrby92bkgyN0kzSCs5ZWMyRlJYdCtsRVpxMEQ2VVVzaGZNTmtBcWs3TUdOc1oweHF2SENidHNSRzlYWVlMZnhpSkV5Vk9RMUFQb1pDVXVsVWdta2NxS1MxbUVrV1RsY2VianlZdVhWU2pFVFlVc3FJU29MK1cwa0lDRVdMZ1lFcmd3a0N6emxTWWNjS1ZvcTZDV1NaTlpwUnlST1dHWEFuTUo3VkZreFBlZnNyQjNaZzk2YjdKd0M1Z1YxbFNGcjU5alUwOUZqbTBCSFhYVk5Dd3M3SDFwVFZiM2hpeHVyUnFyNGFmU3B0TEtERHN5WXQ3cStZa3RoWkYzVjdydll1dHl5Mlhhdnl4Uy81MnZieDE1OG9OVm9OUGtDK2ZwMFRpeVd3eGF2Tzl3ZHNVbFROcDMrRGI3dk9UMHNSdndVa1MxS2tVNzdvSmJxekErYXFVNFBrSXM0OFRvY1JTV2tCT0pLeVVUSnlaS0xKVmRMeEJMMVJDRlNsdWd0ZWE2RXJ2U3U4MUp2WXFkaHY0RWFjcEpPcTFRMFl5ay9DVlk5c2FxTjNETjlXamF6Z3F6dUFYWDY0UnRIQjUveVhtZE8wZGppdk1TeVZaRzd2N3ExZXY1ZC83Qm02Ykg0N0doNFk5Mjh0UzNCZ2tYM3JaM1JOci9lWGVmd09nenpKMTdjTnZIaWpscUhLZjNCVTY2ODJNQ0pUVjJmVzFjcjZrMWFYSCtpeXExRFJDSVI4ckFpR1lPZzAxbHpyTlRDQ2h3RnRJQWJCSE4weGdSSmFQMXVQNVg4cFVvcGtOS0pVbG9ubFI0dXBVcHBIeVlPbDZaS0owc3ZsV3I5YW5LeVZNZ3p0cjBkQWZYc3lZRjdKR0pKaHVVOGcwRmM2cFZzU1NkUmlWM1ZDOVV6MDhycHhVZGFRQnhFT1E0NEpySmtubDFqMVJQcHpMcG41QnN1ZkpvT3QvVFg1OHllVldtUGJLNDY4Sm1wZy9zaEJyajJaZmN0bnZ4UjllWi9HS2xZMjlkVkNGZlhIVndaRnZRbTNaUmJwL3U1VUo1VGxrNDVadGJVNUFTai8vSDdIUy90VFJqdHVWYVYxeGVoZmN2djJlYkM3WXIwZ1BZUkxWMWk3YlhTSmFRWCtTS3FITStqNVc3akIwdkhNV0l1dHRnUzlhWjJVN2VKMVJ2YmpkMUc1dEhEZ0haY2UwVExGRzFTU3dWdHRaWU9VTkJxZFJhTDJhcXhXc3l3ek55bTB6cDFPcTFGcTVYZ09jMUxtbGMxVEtNeEQrbEEwdmwxRlRwbTFlRktlQlJQbjRlZTlBRHgrREdlOUV4NkxuazBEWkluNWFHU3B3SXorandYUFZjOUdvTFJZYzloekovRURLMkhNOVpWUFFrMXZHMUZKcXlwVTBQRkVaMlpzQktwcmM4RnhDVzUvQzZtYzZsYW45MlZjTW5KWEtJelM4eVZ0QktMVm1CR2gwc0RtVDJMOUdwMzEyVlYrS2pxTWErTXFyeDVWR1ZYUDBLeUhVRk5xZ2VWSzF2VlBpa2FsUzVJKzNTVHVrbmsxTk5xZWpUS3J6Zm9RUlZVK3V4V3ZsbFA3b1Q3MXNDaWJlbHIwTGt1dld0bE9uM1BRSHJYam9Nd0UxNkdKenhsWmU3MEg2Yis0RWFPRFkvdVM3OTNreExKU0dlNmxmMEMxZHRxMGtaV3dTSEZ2Yk1GVnM1Y041UE85Q01OSm1aMnp0d3c4OEdad2t3K1dUM20wQnlrN0VwTzRoYTBlVVBGbUZYRXM4eDhiVmZxckFtWjEvUFZvcVhzTDBZSWJkdU15bkpOVUNBckV1RVpTcTQzRWVhUEdlRVo0Wng5cUtlMTFpaDVxTFRXdENkUTQvNG1BWUU0Q2RXVDdvNXVVTHFodWh2ODNkRE4rN2F2Nmt0TWRNTjROL1IxdzdudUM5MVV6ZmJjMXBFNDJRMUNOelFLM2J1N1QzV3pVMWoyV3ZmbGJvR1hQejh2a1ZERG1vWk1HSTJwb2VJb0NDUnVkRUQ5M1JYWjlzcXRlWW02K0FKdlJRN2thSUtWTVNIQ2tnbHZyZEdhOENWaUNYYlNDQWxqd2pnL21ZeEk4NU9PL093SlBsY1dlNlFmVlVwWGJHNnVSaUtqanZJN0RTTjhxYk0zRzNpSzIwOTh3eUlaVk1XaVYzclVtcmprL01pTysxbWptUTlCK3VEbUZLaTZacEVXZDNMZzQ4M0wyZHZzY2xZenUzQmFoTHRudXhHR29mMFU0Q2VrR1dZSDZ2V1hHeUtQcmZ1bkYwcVc1emV5eEN5UWp6MVNzMlB5b1UxSFYwZHl5K0loZXl5Uy82VXZWZmYvWFZmK25LcEMvVnZCZ3pNQ0phMXQ2U091WUs3RlhiZG1ZZGNESzB2U3oyL3Bkc1VXelpwOTIweFpybGhFSDNqeUtiM21BVnZCN3ZGNTkvYlhCK1BMS2dMMXM2dnpOSjdJN0JsbkYvNWl5YzZsSlJxdG5nMUZEeGVPZmZTTk9zVWVxNjdKRGRWSGNvS05LMm5kdmJzYWUrWVdGTXp0YVd6c2JmUnhtY3J2c295cCtsTVIyYXpjdGlxOE1VeFhCdFlGcU1hejByUE93L1R1VmU2TmJtYlFnc0VNSWdQUkJrWkROeWtBZHdHWEpZMytFcVdFa3U0S0oycTVWcWZQR1hNeXA5Z2JkRmg3YzRWcHoyclBGUzR6TWd6ekpoMGhnNjlwWkdrenJtMzF4RUoxdkpZRGhYQmszZW43N3orOVBoSlp6OE4xa1ovYy90UzFMeDMvMHpOZFhjLzg2Zmp4OTU3cG9pY2ZldWZrN2JlZmZPZWhnNWUrMk5IeHhVc0h6d0o5T3BsOE9wMCtlemI5NFRQTGx6OERJdkxKWE54dmYyR255UXoyNEl2RWMvM1M4N2hiOHZqZU1XTkV6aW5Nb1ZRQW5YRCsra1dsM0doTG9MaTBNVmwyZXdzS1lCa1FhUGNXT0wzZUFobVc1WHZ6Mjl5eTArMldRZFo1b2NETEc3bXV0eVc4WG5lQkh1MVpXa0lVYnlCQlFxdENHME03UTZ3OUJMbWhrbEJkaUJsRDhKZDNReCtHNlBIUVYwSS9DTEdESVZnWkFpd1BLYi85WDRsM1EvQmlDSjROd2M3US9oRHREbTBLMFliUWJTSHFDVVZEOVBYUXY0ZmVEN0d2aE9DeEVCd0t3VDBoNE0xVE9RVFk2dmMvRE1FVlh2MEhJZnBzcG1TLzJyRStCUDg3Qk5qeUwwTHd5blQ3MjdOMW82SDZVSHVJNVliZ2RXeGJIUlM5SjNRd1JQVzg5QmhXZkNQMGJvaitJQVRuZUtXam9hZENiRUVJWm9YQUdRcUZxQ1piRDhkMFZOa1RndkhRN2hCZEdWb1hvalFFNzRYZ3RkRGxFSDBoOUwwUTNjOExJUm5xQzlIS1VGT0lUbGZmb05ZL0cvcW5FRDBWZ3M5bm0xZ1hnbzRRdEliQUhwb1JxZ3d4SVFUWGVGZi9IcUxuUWhkQzlDa1ZkSGNJbG9YV2hFWkRyRHJVelBGUUdLSWg3aUZMdGlRUzN3dkJxZEM1RUoxdWtrTlNGYTZRRHg2dzc5cjMrUWhCN1h4MzZFam9WSWlOaHVCRzM1VzRLSHdFQUdxaituQnhRdTA4eEpuVkNtUml5UkNvRGVMUUxvYUFEb2NtUW9kRHFkQmtTTFNHbG9Tb3ptK3FNQ2ttWmpMbEU3ZmZUUlYzMHQzblpzUXR1YW5lM2VBRm94ZnNGZDVKTHlWZXY3ZkN5eGFvZHRjTVpYNUM5RUtMZDRWMzBMdkhLNERzWlVHU1g4RGNTWCt1VlZwcTBpRHJxK0lhcWJ2UzVxN3FHZUdpYlhYbXVzSElLSmRuMDY2cTZFaTA5Ni82bHFJamY4TzNkSlBmNmRhQ2tVL1dXSDByZElhL1poMVVQOFlSVmRycUdyalFyYXJhbHlORjkwVXZUQWVxZE9WK0s4NlpvM3JJNkkzOGFGTG1yS0FSTXFMV293YnNhUHB6L3FhbEcxcnlpbWJNY01VQ3Z0blIxdm9LT1M5OW9nL09IVW0vL3dpc1puZCsxTDMwb2ZYMVZOU0lyL1M1QzF0VzF5WFlNTXBaejlRUWZRVERqTjFRZi8wamNSdmF3eElwSkhjcEhkdHlZWnNEakJhUFpaT0Y5YkF0ak5heEJZeWlMc1NvM2tOQmovOEVMS1NieU9DV2kwa3hOQ3JGNEMrRzRlS1R4WmVLbWJZckdid1VwTUZRcjZhdmtBVjdUWDBlN3JkSFhwYzlSaHJOY2p0K0l2UHhiUS9rYzFHd1pRNCtvRklvQUJRc0lIQUVSRUhWSjRSVHk0Ny9mTSs1Z3RhRjdhRmRYeHVmUGZXWEw0UDVPK3M3bmtsUFBWZTM3LzV0UmFmUlFINzZ5TDgrMVB6aFBaUXlhSC8wVjZ5azlVc2ZmZjFVK2grN2tGbG1qT1dzL1g4VzU1c0w4NVRrdUhHM2tUYXpEbmFac2RtNk50M3RPbVlBQ09lQVRndkw5RlRiSlRDbklMQzczUWZjSjl6TVRabE9UL1ZNUi9VRkZKZ0JVYUZqMkJsV0VnU25RRTBDSjlQWlZudEM4Snp5d0dFUGRIZ0dQTHM5ck40RGdnZXVldUNjNTdLSFB1YUJhazh6bG94N2hJc2VPSUt3Rnp4TTFlaFd6VzFNK0RtdzAwUHJqbkJ0VWZGUTZrY0ZVVUd0Y0VMVkNpK2htcWhQZWs2aWVuakpJOGlHcnFUMWtwVmFYVGc2cVhlYnZFZitqY3kyNmZmb3FhdzM1OXB4YU5aZXJabGZPTDdDblJBbzNWSGt1Q3N6VG9pTU1jN1B4RzlRc1BSREpFRFVHR0t4R0hlajJPeWtyazdhSjA1TzJxQ3FCM1ZCSFNxRDAyb2daRFcvbS9VK2w5YUdGQ291ZUN3OWl6WjhMbjErNms5Zm01ejZhY1o3Y2Y4ZXNhRW1MNjFNemZEVTBLYytsNjZmUG1DcHladDZrTjZscms4WEtvQVBvOHlkUVhZcEs4SUZJT1krbWt0MUpudStmYTU5a1YzWWI0V0lBRTRuMVEvbHpaaVJGeUloSlVRVjVKNG5RNWRDUW5XZ09VQURGVlNoRkRsSjRHRTdFTHRrcDNhN2FXeWZHOXdhR3RnT21TUFdIbjZPaExOVE5hTWU5YWc4Sm5Idk1iOG4wQU9jTUV1Z0ppN1daQnpBVmdqYXBxMFZRUnRnRDMvMHl1Qlg5ZzNPRDJ6ZlcxQS9LMllQTmkxNlpPV2JiMFdUNDBmT0ROQ3pqNngrOUw3dEUwZDY3bjlRYjNVWVRnRzE1Mzc5eThzZXV1L2V2Vi9vNW5zT2FYQTVwMEhjYy85RHVkUGdPT0NncDRSekFsVzlFWHR0UjIxMFF4aE81TU9HL0FmenFXaDJvWjJhbXdQTFhNNWNaMDZYeStua2tZQzF3Z1V1VjE2WHRWZ3FCcVY0dVBoaU1RdndNelhRT0VsZkxEQ0VxQWhvZkgzOC9Nd0ZtdDRjWVpvS3J0eTQ1OHFKZ0Y5OFEyUWdMdXIyUlNYeTNYMWlab21uT1JtNStld3NhOEZyK2JMcnM5dFczYlJQdnpMMXN5ZE8wL21IdmoxYVViWm9ZQlpzK2x6NnBmUStNQlF1M2RYMTdKazdQcnQ0QmwyVUZxWlh2TEpuOS9MYmR0N1JJRTM5RG1saEVkeWIzTnlVUC9YUGdiYXRtYk5mZ2I4QmFRR1BVdEJsdU5Od3dNQzZ5SjJFcnRBTjZ1Z0tOc2dvMHdpeVFQWGE4eGx0UlpNTjRmejE3eit2TnlYMFhQRUlZY1NRMFZEMEJxZGVqeHQybVU2dmEyUFV5WERmZ2w0UEJTcWczV3hMNlBYTVlDUWVFaVZzQnBFazNJMWZUL1FsaUFSdFBLN1lpbHNUbHlRNGg1YlFheEk3S1lHYVcrT2RrWkFrdjFRaE1VR0NVMWhJSnlTZ2ZkS3dSSFdNNkF5TUpVMmlWZEdEcUIvVTB6L3JRUStVWHg1SDZUU2lDaXFJVlU3THBCRXVzS0w4M1BKdnlRaGNGSzZLcjg2Y291Z2hPRzE5cVNMaHFmUytoZWw3KytDRlI4RU9ta2ZoRHBRQTk3TzdWWTYvZ3g1VU9UNlFSbVQ2ejRoUGtnQThwNWoxbWx4TmlZYnBqRUdZQ3ZJSnJmN0xoNG1EUWFnT05nY0hnbXgzOExYZzVlQzFvREFjQkNkbWRXQ213Qi9qd1hOcWdjWVk5QVRwRDY4RzRZSUt5dFM2dkp5ZG1xNmJnZWRSVWUzQ2tIbytvVlo3WEUyYWpqMldlQ3dJNDhIZEtEVjR4c3o5aHhMUEJvRlgyeDFrbmlDS0FiZ1doRzhHZ2JlalprV0RGRE0zY1lBalFhYldPank0SWRFK0RmdHM4SnRCZWlRSTBXQTNoM1FHS2M5NUpjaDRuRTlqUENqTytUQUk1M0NNOUdRUVFrRSs0WEcxT1kwVUJFcUM0QTlXQkpQQmllRGhZQW9GMnRXZ1RncjZNVGtaRkhMTTV2dzJsdkdNVFhEUFdINGc2WE9SdkNUTHRkcVQrbDYwSUMxNnVISDVrZnZIVk85WUpYKzVBd1ZnNzdSR2tGVWJvbG1kSWFzdFJOVlQ3STlCMUJ4dUd6aUNOYk0vOGVLQWhYcUIzMWRXdCtldm4zd3l1blRiZ3JMVy9KbGxVbUYrc0RUUDhNRUhyNlNGZzZ4elpsSFRuWCsvcGRhbys5RTlCcU52M2tEcjR4MGZ2UjhvS3d0azdxcFF0SE8rZy92TkNXOHAwaWFLdG1kSldlSk82VzdwaE1TUGlYNm51QzIyUkx2WUxkSTE0cWg0djhpZVJCSDZUNm9yL3FLeURXRVBpVjhVNlozaTNTTHRGSUVWT2lHWGx0QUZkQlVWWkV1aHBkV3kwaUx3aTZlRkJpWnJDN1VVRFFncHN5K3RrdE5xbFhCZldxeVc3TDQwd3pLQkNlMG1zOU5rTnNFeW8yaHMwNWljR28xSkZFd1dNNk5nbldVRks5KzJCaHlWMXVxMm9uZzRmLzM4MmZ3RlBGQ010Z1hqSmxoaEdqUlJURCt0ckRJdnFES0J4aVNicU43RXJGWm1ZaHFKeUNHNVdlNlFtU1NESU1NNStacE1UOHJRTEkvTHUrVWpzbEFoUTBpR0Rua0FFNmRrQVpXZHVnNzVNa0l4UlFZNkljTkZ0SEM0N1Y1U211Q2hFdlA0RWkvSk1DeFB5Q2RsMWl1RFh3WWowVWdhcWpFekN6RktpSUdrWFdjRktwaXNJbmNidXF0VUJoQ3Jxa0kyWEpueHFVd0w1STh2TWFBbWk3eUF5MkwxNXBwS0hMYXFxc3gvaGkyOHRpL25aajN5QnF2SWNPL2Vub3loSDBYbEZqbUdjWnBwZUtBcW8wcUtLOU12TC83ZGJ4YW12emtFTHozKzlyOTF2UE96RTdDTzh3NjZlZXBJbG4vc29ZTlRYNkQzcVR5RWtsM3NEc3J2cWZIM3NuNm1QUGlVL2dVOVhhWGZxS2Z0ZWhEMDhMciszL1h2NjVsZVdkcVJrUFdGK2xsNjloOTYrSjRleHZXd1RvK0tGWUJmWDZGWDlFelFPL1YwemtVOW5OTmYwTk1KL1dFOXJkWVA2TWYxVEZKYkd0ZWYwcC9UWDlaZjA0dEpQWVQwMWZwbVBYdE5EeW9rN2RNUDYybWp2bGRQRVJxT3ErK1BjRW9sNG5FaVNJSmZZRHBCaThSRlVaaVF4c29mOVdTYzFHOUdyL1JNbjFuZjBOa3o1OUxJaFhrYWtWZkZndnhMeWN2eGhla21mSWdOYVIvOE91M2orMldOZW1kb0VabExVcy92blEzVm5CakhkTVpFbE44ZGVzZ09CaDZLREhUMWM5cm4wRG1ldlRWUU0rVHY5UXg1NkM3L3czNWE2dkg3UGFWTTd4cmFUdllpUHVNa3J2Q3plbjZnZnlrdVpKR2puK01aeTgrdmxFaFVpdEpvTkR4V3FaWEd4R0hEaElGYURXQXdpRGZkTGNySTc5Z1Y5Ynd3YzFxb3FuQzh0TWRXMTVPNTFzNWRPSC90bWxFTWRldzRURHNiVkYySFpUMnozSWVUVW5hZUdWbjdqWForNldqTy9EYjEwbEhwYmV2ckgzNTRaTE5uVHMvOGdvYmFDdFNBZ3EyTE9tYis5STBaaWFGRkw1eUdMZDBQcjYzT2NXUXZJSlV2SDJ0ZXZMN1J5M1RMOUpxSisrZjFLLzZzWnFTWGpOb25uMjdjMGxGbmRIMDU4LzZROEJ2RWJaUnNVRnlEK2VEeWh0SGNZNjZjY001Z0RndTd1YzJwT202NUExY3B3b2drRlpZcFpaRFhYU0VxSWhYNWV6NmlxOWRBYkdDekdZVENRbDh2dndpR0tNcHc1TXpMUFJrdmZWUzk2aS9PQ1BGelUvdXNrT3E0Y256U1JkK0lsR0JoVEhNcWZmM01IVDFuZ0Q3VmN2ZlFRRXpUVk5ENlloOS9sYWZwTTgrUHhrZjZiOHNMejlORU50KzkxM25IUDM3NHBYT2crMnFIM21JM3BOLzR4MmhNK2R5VnJ4Nzc5YU1McGZ5dzgvdnBsMDF1ZS9hZGtjWHBsMkVYK1NseGs0WnorbVBrQytxeFprQm5TNGlvZTBoOS9DYTQ1b3ZpMDBQNlhmcUhrU2I2SE1PT0NRZHpFSzYyWHJzQ1BiR2VDOUdwN050YTJocDFGWVhzR3ptd0s3QmdmSG4zQ21kQnNNRFpYSk5mWFpRenMzNW85YUtjMjd3ZHMrMjVEbnR1T0g5V25hdWtZZm91MkwyNHB3TmtRbGt1ZWwxZUt1cGN1bTA2MXFzWjB1elNNTHZHcm5IN2dnb0t4V0gxdHFCb2RYY2w0UkxhVm8wYzAzS2Z0Y0tKaXJuVktyajdBZ1VGMEJ1d1cvb0VvZ1d0bHZZS2pHUnZidkZBVmJSdnViNkY2NUU1M3VaR1lTTjgrcFpXd0JiSXJrU2cvdlRObDdYdTlDbUtMMzBVZFBHdG5ZM1d1aWJIaHorNTlkTFdOWDVwYStvdGhvbS9wTCtrMnJ4UFh2ODNlSVI5Vi9YclBmbjE2cExta280U3BwNzJtT2UzSmtpSlZFTG52bFlDUE9jRmZvTWlFMVVLeWlvU2wwcmdYTW1Ga3RkS1dFVUo2Z2tJNmk5aEowdFNKVlFGc1p1bGhKTWNMZUM3OUxDQnBYQ2ZjaWtSS0V3WVZBK3Y3RWs4d2QrOEE1MGg5N0dnbEgzbExuTnhuVy9QVWRWTE82SzZhVWN6RjlvKy9TS2U3Wk12NWozaThKZCsvR0plSnJ3bC9ja1g5ZWhQUHk1VkM2YjFnRjlyOXlNTk9PbXJ5bG10RmR3V3VNY01uV2FJbW1HRENEa1VSQUFkRTFFcW00eGRHaEdsc3BnUjEzZHdjVzB5WndSNVYwYVFBeXlUck5JZEJKelk5bDRUYUUxRnB0bW1IU1pCZjd0MXZaWE9zclphS1JmZlJWWm1tQmJNUlA2QkROK1U0U3N5UENiRGZoa0s1Wlh5ZHBtOUx2KzdUTS9KRjJUNmxKcDlqd3pydUh5R1ZobjBjcTVjSXJOM1ZEbTgrUmUvU25DUlRmZktzSXdMOFdxVTgweEdvUzNEZXpKY2x1RjFHVTdKdkNtMlU5NHZVMnlnaE44L0xNUnU5c292eUtKZWhtZitRLzdmTXBXVmYzZzY4WXI4Qm8rZCtHSUN1OXpJKzFzcDAwSjVGa0l5VlFFNC9FaEdBUWp2TzVod3lxQ1I0WDBaWHBPQnQvWTltYTJTb1ozbnlsaUZqYW8xTmcxbFZZWjFHeE12eW5DL0RLZzJ3QUN2ZFZtbUIrWEg1R2RsTnB6UlBpaXFHMDZaejBMdFRTbEYrandvZ3lJblpkU3RxbVZhZDQzajZ4V2VjcUt1d3B5b3dmREp2U2FMYW9VYXB6dkJMOTIzeTB6RGxHQnhJc1lhMlJMR1BBek1ESmhpeWttVVlHZzJXeXdTNml1OWRoMnpta3dxS1NOdzFsSG5OQUhsLytwcHR5VW5VVzFxUnVWS1FISndjRnNHclptb1NySFRMMktnVWhPclVwMXBVWDRqWXlUckFJdE9POHBReWVHYVRGYnJqYW9BR1hLLzVSN1phUFNUdmpmcGV4K3JROXhFLzRRTDdaTWEwSTFYTmJtdGRKTzVWSlU5dG5LbUY5YWtUNlVmcTBrM2IwTkpENDJ3c1F6dWdJcWZ3TGVFUDN6d0ovYjRSd09pbVhzblBsckNudnhvTlR1RGNiNVA3SVN3MzZLKzdJSHZLRE8yTzQ4NnFlalo0NkYzNXQyZGR5S1BpWG1nWHROVWIyWnVjNEJkdFUyeko0MW1qQmpNQjh5b2k0Sk9ueTNSOFpJS2ZoT1VWMkg4NFhFUWpVWFU1bW1kRG1LMmlDYVh5WU14aHdiamxoWUg3SEdBZzh1L2h3cExFZ3RGT0lCYXQ1aURjUmNzd3pydEpoZnVSaGZ1VTZ6U1poR2RGb3ZvV3BnSGVYbE9iTmVNRFl2cW1aYUJlTDFLLzBCQzhEcTlOSFBWWmNDNzIzdktlOEg3bXZleVY4L3pRNWpKczg1aDVtWHZOYStoanVkV2U4ZTlSOVJjYlRVK1hzTUNRYjBrNHcxa0xzbFVXOTJKcEJlbzVGVzgxTEdHMjBSYVlwSk1maFBUbVJ5dVBHWkphc3dlcDJCd1MxWWlhcGtweVF3dTBwaDVJVDV6T3BsOVMzTmsrcTRNOStKR3BSOXk4OWhlVjhlL1dNaVBKejllYzRqMjhodCtJOUsreWNuTWw1OWEzamk3ekJqUG5NK3FncC8wWks2ekdUT25sL3FiSGF4YVlEdTNwbGZlKzR2MGZlbC8zQUkxNmF0RDhNeTlYN3Q0SHl6Ym5QNUxrNnVzekEyM3BjOWdLTUV4K0J4WGt0UHZnWVNoSy8wTXlwanJMNmNYd1g3MTdLZ1lTcFFmSTBVWUUyVGhKc005Qm1wUUNnS0pEaFFOK2FHMlRVNHdPc0hoakJnam5naE52eGE1SEtHYkl2ZEVEa1pZS0FMUFJ0NkkwR2NqMzR4OEdHRkhJbUNNd0kramtVMFJHbEhPZmkwUlViNzhUR0tBNTNvaTBRajcwcnNJUlM5RVhvdFFUNlNkTjlETlFhc2p6UkhLRzZDNzFRYTJxR0R0a1c2MWs4Y2lZa1RwN2sxVTg3SjdJcnlyTnlMdlJqVDFKeU5vQmZLWFZQMlJpa2dxTWhtNUdORWtJMzJSWVV3SW1YZFZVUnBhSTZEalYzM0N5V0pySU9uTjlhZ09lQzdQTWtac0wxKzB6R0ZqejBpV0RVUXo5bTRteFYzQkkxTS9mQTE1ZzNwaDRGTVhnYkxxYXNZTFBpdnovdHArZnVuSG5ibjg0K2FYZ0F6UkpWdWFTcFZ3ekJPb3JKOTdDS28rZFRmb2c4dDNmcUd2MUtEN2x5MzVuMzJJVFdiZlorTit1R01vN3h6a3BCTEwwWFpxNld3dDJIRUw2YlJkRHJ2VFlkYzY3bEJ0T0pQR1JWelFxTGpBNzRLVHJrc3VmbjNnKzBxZFRrcllkZm83K09VK3JpMVJSa1RrbjcxMmFtTjZTKy9QSFBDQUF5aFgyZWhTQjh4M1FOaFI0NkFPclVuOS9ZZXNkWFlsK3dzUXZSbE5xREo2dzBjK1ZibFBKV3IrZ202R0tHMDMvd2dFQ0ErY2d4K2M3di9vNWV5dlA5Q3p3aC9VaTJCMjRZVVBUOXo0OFFlZk9sZjM5VitML0QwSEN5aktVMjFHR0RDTUczWWJXS3NBZHdzSEJLcm5YdjZkYkQramd3em04L2NvbHBtTXBqdHdBU2hsUm9OK21hRkxGSnpJTndRREZuSy8rUkVqVzJjRXdjaC9HS0hES0JpTm91a0pDanZwZmpUTUtPb0t0WlJ5RHptVmZGS3ZSSzFTbzdSRTJpVTlKLzFSMHJ3dFhaY29rUlQxK3FkUWZ4S2ZreEx6U3hQU1lZa1I2YUowaVY4SzVSNjI1MHRqQ1RXVW5HcW9XSTJXaEdGSUJGRjBvYTV2VlMreGhvclZTNnd2eU41RTlnS3NZalBiRWtaR1VhOFFleTFhSnZBMy9EUDJ0cjFPZlg5RituRlBUK1gwblFmMXFtQkdWcWl1TjM0WHIwZTFycVBTclFiMUNMODVETWdkYm5LOWlhbEhwbjVUTmZYMkYyakJPVGdLajZhNGsvdURQMlVsUjVpOWtmRnJweGZSRGVJaDFQTmJsSndpRjFRNm01ejBMaXZjWllScXNWbWtSU0k0dEtxT2FMQWt0T1M5aDgxZzVxYU0yVTUwbnN4N0xEMVhmaGl0ekx5RG94NFJDMjVYT2MyODlxUytxKzdSdWNzV2JtN2YrL0lEaXZMQXkzdEhkcU9nK0VQSGw1OTQ5SUdSYUVmYmw5K0EvRzkvR3p5L2ZLcXRZOTZMYjcyZjhVTUxBYVFKRTJyOXA1UjdUOW5PMmFqb2d6MTVqK1pSTVhkUEx0WHh0MjJveGNCZjVDTmQrVUZyTUJZY0N1NEtQaHdVWThIRzRCSk1QQkY4S2ZoMlVHc045bUxpVll4ZUQycHFlUmJsd0x1d1ZMQUdmUWk4QzBHZkMycDBXa3RYRXFXWHJzOXN0b2w5emw2WldSeTl0dXpMSGVyOWJYVWZySjYramNJdmtrV3pOOGx1ZGpoL3lpY2RaRjNCSlJPcjEyeFl2ZXMyZjNyeHo2WmVlZUkwZk1EOTBiR2hieHhncWVSNGUyaHFUMW5IM2VsbjAwM1R1Nk5oMCtIbHk0Nk50NnA3cEFuWEtLbXUwVzFLVFQzcVROMHlxNWZhcFc2SnRiaFh1T2xDYTVlVk1qTlJjSW1JNDcya0RpMEFIYi9tbytnRW5jNUNTR2FodUg5MlNsMHEwcXUreWV4UUR4TDRZVjRCelp6Z043VnZYbGptMWpsYWRvL3MrUjVmcnUrbEYzVkVSeDU0OUlrdmQzejIvYmRlbk5mUjl0UXYwNy81OXJmVGw5LzRzbm9ucHY3NkI4Sjc2bHA1Y2QydUtIa25LQncwUEdhZ0p5UzQyM1BBYzhMRDdyWWVzSjZ3c2lLdVRTU1FkSVJaY0tJY3hITFFsV3RKZDRsaXNTVktTcXEwemk2L1ArV24vaEtrc0c1U0pWVlZWQ2xWeWFwVWxjWlUxVkRSY0xpQkR1UGpaRU9xNFdLRDJNQkpNdEUza0lnMS9MR0JXaHVnaGpUNEVhcXZZYkpCbkNNMUpQbUw0NGNicmpZd0JlUERXTzFpdzZVR1RibTk3eVMzL0lLNWZiWDJRSyttTDhqOHZRVjIxZGJCZjF6bGtTdDFvQzV4UmtLb1o0STlmT0d4TEhyRlhyZWFjNzNNcS9nM0w3c2pFNVhWMzFKQktyajFWSUpmaFZZRlJwQjlKN2o0TTEydnZ0RnpkNXQzc0t6MzZNYXI1WlhSRFZXcjcxOGEraWpuOUdrNmVPaGJveFVsQzliTnZmM1FtcHI2ejM3dm9lRmZyV1ovcWUrczk2YkZvcmFCcVF1dDYrWUhwbjVJMGJ5TjNMWTEvUzhaYW9rdTI3YWdjY09TR3JPK2V2bG82KzJmVzErbjRYU3pFQVgrR2x3YkkvbU9NcHQwT2NXUWVFUThoYnhTM0kwUlpoYUh6UlBtdzJiV2JPNHdENWlaWlBhYnFXQ0dTK2FyWm5yT2ZNSDhtcG1aMVF0ZVNYNWxhVks1dlhsQm9zL01LNmxWYUlVWkJMUFRIREt6ZXNGY2JXN0dSc2JOdTlXS2w4MzZpK1pMWmtwNW94WG1wTG5QZk5LY01rK2FkUk5xY05Fc0dEVzlPaFJNdlN5N3h5cEJmVHQ2ZGNibG1ORzFZNSs4M284czdnVit6NWpmTjA1K2ZFeVhzUlB4YTN2MzdCdnZyK3UxenYwejhXVitRL0xWUXpQK2J2cDNEbEg3YVVWTDhrbkNmMkNTWmpPeG5qYVFiaUczMy9pdFJQakVyeTAyME4rVFpnNnVSUnFuejVBUzVpVWRtTjRuL2d2cFlJZElrdFlScDBDSUUrTUpZWXpzeDdnSHZ6SDhMc1J2RTM3MzRiY1R2K2Z3dXhqaENZWTdFTFplVTBlaW1DN0JkTEZhOWd4WmhPM1dZMTZVcC9FYndIWjV5T3NVOFhaNHZ4am1jamoreFhpWHVGSU5DZFp2eER6S21za3VUSy9CZkQ3V3hjSy9xVzArcVQxRUtPYmJhZDMxbDdQMTNWaW5pNDhGd3liZURvWklPNlFVLy80UlRQQVUvSkllUUdIVnlmNGdQQ2d1RXIrdjZkTDhYSHVYOWdYZGF0MVJYVnBmcVU4WkZwa21UTDgwenpILzNoS3huTFFXV0k5S2hkSlJtOS8ya1VOeG5IT2RsU1B5Qis3TjdvOXluc2s5bC9kRHp5TFBCL21qK1M5NFM3M25mWXY4cXdNVmdhZG1ySnVSQ3RZRzk0WTZRajlVVjZDQmRDRi95ZHdHa0VpTW44QWl6ZFJoSGwrS2ZGaDVZNTM2YnF3WklHUmZOazZKbGd4bjR3eFo0STVzWEVDWXoyZmpJckdRSjdOeERiR1NWRGF1SlhlVGw3SnhIWEZDWFRhdVJ6M2x0bXpjaUdQb3Z2SHJzZVV3M2I2WkRNRS9aT01XRXFkTzdCMEVQYVltNmJKc0hJZ2Z5VDRUcDhUQ0tyTnhSbVl4SlJzWEVHWjdOaTZTZkhZMEc5ZVFBblkyRzllU2EreGlOcTVEK3JtUWpldEp2dkQ3Yk54SWFrVmRObTRpZDRqVDdadkpyOFRIczNFTCtZem03dmxEd3p0SE42N2ZNTzR2WGx2aXI2eW9tTzFmTmpqZ1QvU1BsL29YYkYxYjdwKzNlYk5mQlJqemp3Nk9EWTV1SHh3bzl5OWEwTlN5YkY3SGdpV0wvUnZIL1AzKzhkSCtnY0V0L2FPYi9FUHJicTIvYU9PYXdkSCs4WTFEVy8zTEIwYzNybHMydUg3YjV2N1JlV05yQjdjT0RJNzZ5L3lmaFBoa2V1WGc2QmhQekN5dm1GMWUvWEhwSjRIL200SGc2TmR2SEJzZkhNWE1qVnY5SzhxWGwvdVQvZU9EVzhmOS9Wc0gvQjAzS2k1WnQyN2oya0UxYyszZzZIZy9BZytOYjhDaDNybHRkT1BZd01hMXZMZXg4aHN6bUQ4ME9qeVVIZEw0NFBaQi8yMzk0K09EWTBOYk40eVBEOCtKeFhiczJGSGVud1ZlaTdEbGE0ZTJ4UDZyc3ZHZHc0TURnMk1iMTIvRm1aZHZHTit5ZVJFT2FPc1lEbnliMmlPTzVtYXN0UTV0eGNYWm5JRXA5WThORHZwNTgyUFkvcnJCQVJ6YThPalFuWU5yeDh1SFJ0ZkhkbXpjdERHV2FXL2oxdld4ajV2aHJXVDcrVCtyVGVhVElkeURPOGtvMlVqV2t3MWtuUGhKTVZsTFNqQ3NKQlg0Tnh0ank4Z2dHY0F3UWZvUm9oUmpDOGhXaENySEdQOFYyODBZZnR6Q21Kb2F4SEFRdysxcVhRNjVDR3Mxa1Jac2JSN3B3UGdTc2hoek42cncvZmdkUitoK2hCMGtXekFjSlpzd2I0aXMreS83WDRUMTE2ajk4SktOQ0w4VlM1ZXJPUnV4THErNW5tekRFZklXNTJGZmF6Rm5xOXJMS0VLV3FlUDZyOXY0NzhwWHFyR3hHeVV6Y1Z3Y2IrV2srcS9XL2U5YS9qL0RTQWIzNjlWV3h0VzJNNUFiMWJaWElNUnlGU3FwMXVTNEdGZDcyNnBDZGZ5VkhwZGdqK3V3UHNmY3g1QnIxYmJITVoxcGVRampHN0pZdlJNeFBxcU9ZRUN0TnoyM01lejUwMnZBYVhBVXFYRG9FMWppbzl1dTlubWJtait1MGhRdjI2Q21oc2tjbERveGxCdjhyeHhoYm0xNWJiYmRjalcyQlNIL245WWJ4eDB5ck9KeFVGM245UWliV2ZOeXRjMHRTRitMc2hqYXF0STl4OUMybSthWXdjM2ZvclZXTmN6c25NMjN0TU5YbG9lODd2VG94N0xqWDZmMms4SGFNRDZIRU8rREtyYkwxZHoxNmh3MzRocHV4TmpONCtNcnRqNmI5OG5SVEkvbDF2bjhmOWszeStxR0FUSkEvc3Juakw3dk82RGxOMVRVNTBzZ0tLdmcwaFM4T2dYK0tkajFJU1EvaEluM0RyOUgvL05xaWUrNXF5OWRwVXYrMlB2SDUvN0lLdjRJMWorQ2pseVJyaVN2OUYwWnZuTHlpc1pnL1QyWXlMdGcrN2RMdGI2M3E5NWE4YXVxTjFlUXQyQnU4cTJKdDFKdk1hNWxkNzJsTTdhK0JXekZtMHoyU1pQK3lZcko0Y21KeVl1VGx5YXZUdW9tdm5QNE8vVGIzNHI1ck4veWZZdjZubC95L0s3bldkL1RZSDNhOXpSTlB0YjNHRDM4T0ZnZjl6MGVlNXlkT0Y3dU85NVc0UHZDMFNMZnBhTlhqNm8vakZsejFHeHI3WDBVZG4zKzRjL1Q0YjBUZXcvdlpSTjdEdStoejIxL2FUc2RTNWI0aHJaR2ZWdmJJcjdjcXB3VjJpcTJRc091cXkvUU5hOEpGN2YyOVNxK1hnVHE3cXJ3ZGJXVitCeFY5aFVpRGxaQVFDdnpxVjc4SWZZd2U0bHBkY3VTQmI2bCtMMlV2SnFrMWlXK0piRWw2dStsOWJjSHNLR0Z3d3NuRnJJRnJTVytSRnV0ejlybWE0dTF2ZHIyZHRzZjJ6UzliZkFFL3JjKzEvcFNLMU5hUzJLdFNtdEJvRFUvNFZraFY3bFdTRlhXRlJUSUNxZ2lLMkxXNi93M0xYcXR1Nno4SlJMQ0wwR0ljQjRPbitsWUhvMjJuOWRlWDlhZTBpVzdVL0JnS3J5Y1A1V2xYU25OZ3lteW9xdTc4d3pBMzYzYWMrZ1FhZksycHlxWGQ2YjZ2S3ZhVXdNWVVYaGtBaU9TOTR4TW1sYU5qWTJyN3h0QU5JclJiZmdrMFcyWXRYb3NrMG1pMDhVa09nWmpZMlJzREtLOFRJMWlEaG1MOG15ZXcrc0ExbHc5UnZpRGwwWlZLQjRiRzh0Wi9YOERzMG13dEFwbGJtUnpkSEpsWVcwS1pXNWtiMkpxQ2dveU5DQXdJRzlpYWdveE56TTJNUXBsYm1Sdlltb0tDakkxSURBZ2IySnFDanc4TDFSNWNHVXZSbTl1ZEVSbGMyTnlhWEIwYjNJdlJtOXVkRTVoYldVdlJrRkJRVUZCSzB4cFltVnlZWFJwYjI1VFpYSnBaZ292Um14aFozTWdOQW92Um05dWRFSkNiM2hiTFRFM05pQXRNekF6SURFd01EVWdPVGd4WFM5SmRHRnNhV05CYm1kc1pTQXdDaTlCYzJObGJuUWdPRGt4Q2k5RVpYTmpaVzUwSUMweU1UWUtMME5oY0VobGFXZG9kQ0E1T0RFS0wxTjBaVzFXSURnd0NpOUdiMjUwUm1sc1pUSWdNak1nTUNCU0NqNCtDbVZ1Wkc5aWFnb0tNallnTUNCdlltb0tQRHd2VEdWdVozUm9JRFE0TlM5R2FXeDBaWEl2Um14aGRHVkVaV052WkdVK1BncHpkSEpsWVcwS2VKeGRrMDJQb2tBUWh1LzhDbzZ6aHdsMEZ6UmpZa2djSFJNUCs1RjE5Z2NndEE3SkNBVHg0TC9mZnV2dDNVMzJvSG1RcXVxbnlxNXNlOWdkaG43SmZzeGplL1JMZXU2SGJ2YTM4VDYzUGozNVN6OGt4cVpkM3k3eFNiL2Jhek1sV2NnOVBtNkx2eDZHODdoZUo5blA4TzYyekkvMGFkT05KLzhseWI3UG5aLzc0WkkrL2RvZXcvUHhQazJmL3VxSEpjMlR1azQ3Znc1MXZqYlR0K2JxTTgxNlBuVGhkYjg4bmtQS3Y0RDN4K1JUcTgrR0t1M1krZHZVdEg1dWhvdFAxbmxlcCt2OXZrNzgwUDMzenVWTU9aM2JqMllPb1NhRTVybk42OEJXdWRpQlJibXk0SUlzNEpMeGIyREgrQXBjS2JzUy9NTDRBcnppN3kvZ0RkbUFYNVZMcmJsbHZPYnVHS1AxMzhoYVo2OHNxOEFtSitOY1EzOXhZUG9MNmh2NkMvb3k5TGQ3TVAwRlo1bm9yN25SSDcwYityc3RtUDRDQjBOL1FTK0cvbGJqNlYvbzc5RmZQYU8vbmt2L0NqNlcvZzY5Vy9vN3pOblMzNzJDNmUvUW82Vi9nVHFXL2hYcTIrZ1BOMHYvUW5QcEwxcVQvcVV5L1N2MGErbnZsT1A4OVN6Nlc0Mm52NmduL1F1dzBOOWlQa0wvQXZPVU9QOE5tUDRsYWtxOFA1aVAwTjlwVFBUSGZ5MzBMK0VqOUxjYUgvMHhONkcvUmU5Qy93S2VFdWUvMGdzZmJ6YXVQbmJ6ejBxbDdYMmV3enJwQXVzZVlZUDZ3Zi9kOFdtY2tLV2YzN1JlOTZRS1pXNWtjM1J5WldGdENtVnVaRzlpYWdvS01qY2dNQ0J2WW1vS1BEd3ZWSGx3WlM5R2IyNTBMMU4xWW5SNWNHVXZWSEoxWlZSNWNHVXZRbUZ6WlVadmJuUXZSa0ZCUVVGQksweHBZbVZ5WVhScGIyNVRaWEpwWmdvdlJtbHljM1JEYUdGeUlEQUtMMHhoYzNSRGFHRnlJRFl3Q2k5WGFXUjBhSE5iTXpZMUlESTFNQ0E0T0RrZ016TXpJRE00T1NBeU5UQWdOekl5SURRME15QXlOemNnTlRBd0lEUTBNeUExTlRZZ05UQXdJRFV3TUNBMU1EQWdOVEF3Q2pVd01DQTFNREFnTlRBd0lEVXdNQ0F5TnpjZ05UQXdJRFUxTmlBM056Y2dNamMzSURVd01DQTFNREFnTXpNeklEY3lNaUF5TnpjZ05UQXdJRFV3TUFvME5ETWdOVEF3SURVd01DQTFNREFnTnpJeUlEVXdNQ0EzTWpJZ056SXlJRFV3TUNBMk5qWWdOVEF3SURNek15QTNNaklnTkRBNElEVXdNQ0EyTmpZS01qVXdJRFl4TUNBeU56Y2dPVFF6SURVd01DQXlOemNnTnpJeUlEY3lNaUF6TXpNZ05UVTJJRE16TXlBMk5qWWdNek16SUYwS0wwWnZiblJFWlhOamNtbHdkRzl5SURJMUlEQWdVZ292Vkc5VmJtbGpiMlJsSURJMklEQWdVZ28rUGdwbGJtUnZZbW9LQ2pJNElEQWdiMkpxQ2p3OEwweGxibWQwYUNBeU9TQXdJRkl2Um1sc2RHVnlMMFpzWVhSbFJHVmpiMlJsTDB4bGJtZDBhREVnT1RRM01qNCtDbk4wY21WaGJRcDRuT1U2YVhoVDE1WG52a1cydkdpeExXOHlmaytXYld4c1M4YkNHSU9ObmhmSk5nYmtsY2htc1lRdEw0QXRZUWtJWk1HQkpJQ0RBMlNobVVuVDBEYVRhZEltUE5Na21LUVRTT2RMTzlNQ2dXNXBtelRRTm0zVGFWem9mS0V6WHhQa09mZEpOa3VUZHI3cGZOLzhtQ2U5ZDg4NTk5eHp6ejNidlU5MmFIU2JEeEpnREZpUWVvZTlBYWt3VHdTQXN3QWtxWGQ3U055MzRkSVNoQzhETUN2NkF3UERCYlozZmcvQUZRUEU4QU5iZHZhM252LzJnd0R4aXdBU0FvTStiOStSdXpiWUFOS2VRUm1MQjVIZ0RlK0pRZnhkeEhNSGgwTjNodUlTSklCMFJLRnhpNy9YcXpHNnN4QnZSRHgvMkh0bklGUDFDWWQ0QUhGeHhEdnNHOTk4NzBYRUR3UEU5Z1g4d2REYnNHQUd1ejZpL1lGUlgrQ0U3aittQVV3cEFPeHZrVWJ3UTY4RUJGVVVaMWlPVjhYRXF1UGlFeEkxV3AwZS9wOWQvRm4rTE56RDN3Y0cyS2s4YjdtNHBaQUNPd0JtUHFUWWpXZjRqdjlkTFdLVko4a2dlWEFOZm5kVHh4dndmWGdWWkhqclptNHlueFJTNzVFa2VCOCtnbTk5bGxTVUo1Q1ZDbmdKTHNLYjhQSm44REh3SExrT1B5WVpHT2NuRWFJME83eEQxcU0renlOdEcweVFUOGhPWW9KalJLZjBMa1RaR3NKOWlxeHFNZ09YVWJ2SDRESThSdXJoTWg5a003RGp4OHliOEhuMlB1WWNmQmQxWHMxTUlHMEczb2F6cEpRNElBZ3Z3Yk9LZ0NET04zR3pSQmJnUy9BRTdMMUI1VjhNZjRPL2oza0Y5RE4vaEZmZ0c0b0Zkc000ZU9ZR1hTVy9KNGN4SnpOSUxKbjE2ZXV6blRHTjdDYm1GWWE1L2lnaVIyQUFieS81Q1hKUHNEVzNMZWY1c0Q4OFNIaDRGRFg0QldtRlF5amx4ZkNwOERPd0FZNHpQNFJPK0hmVXU1N1hrK2NBSkVlWHU3T2p2YTIxeGJWNjFjcm1GVTJORFU1SGZWMXRqV1JmWGwyMWJHbmxrb3JGNVF0THJaYVM0b0w1K1htNTVoeVRrSjZpMTJrMWlmRng2dGdZRmMreERJRmloOW5wRWVWOGo4emxteHNiU3lodTlpTEJleFBCSTR0SWN0N0tJNHNlaFUyOGxWTkN6djdiT0tVSXB6VEhTWFJpRlZTVkZJc09zeWlmcXplTFU2UzcxWTN3UkwyNVM1U25GWGlWQW5QNUNwS0lpTW1FSTBSSCttQzlLQk9QNkpDZDJ3ZkhIWjU2bERjWkgxZG5ydlBGbFJURFpGdzhndkVJeVFYbXdDUXBXRTRVZ0Nsd0xKMWtJRGFSVGl1emVRNXZuOXpTNm5iVUcwMm1ycExpSmxsanJsZTZvRTRSS2F2cTVCaEZwRGhFVlllSHhNbmlNK01IcDNTdzBWT1UwR2Z1ODY1enk2d1h4NDZ6anZIeGZiSytTQzQwMTh1RnU5NVB4NVg3NUdKenZVTXVvbEtiMitibWFiNHhKWkg1UEoxWkhMOEd1Qnp6OUllM1VyeFJpaXBQZHcwbzZFVHpqbzg3emFKejNEUHVuWm9aMjJnV2RlYnh5WVNFOFlBRExRd3RiaHcxTmZQcVEwYlplYkJMMW5rR3lkTG9ZcDF0elhKeTYxcTN6T1E1eFVFdlV2QnJONXVXR0UzNnJsbWVscy9xQmpRRW1nTnRhakxSaFQ4MEpjRkdST1N4Vm5jRUYyR2o4UVJJMXFJdW1mSFFuak96UFlaTzJqTTIyek0zM0dOR2J6YTN1OGRsTHErcHoreEFHei9rbGNjMllqeHRvcTR3NjJUTkg0MG04M2lTWHF5MGRpbThJbXJWMURja3ludyttZ1ZIM1R3QUk0VU9HZGNwaU9hUGtXYmFpQlBrNjVQRVNqT0tvWEljWm9jbit0MCttSTRDeEpKaXViRW80dm9PdHl6Vkl5QjVvejV5VEpaYWNZVFhneTRhcWxmY0oxdk5BVG5GWER2blQ2cVdZNmpkclF5SkRwTlQ2bVR3OUVaSHlWWkhQWjFaZEl4NzZpTXFVRm5tVnZjcHNNMWNubHdrR3I5dWcwWFFWVStaVStzd3J2SWQ0KzYrZmxud0dQc3cwL3BGdDlFa1MxM280QzZ6MjlkRkF3MHRWSGdacHpNcE04cE1YWWU3dWQzYzNOcnRYaEpWSk5KQnhYRjVqdHZFbU4zR2lCZ01PVGsyTDFaME0wYTJDeGwxU0JDZENKaHJxL0FweCtURjRxMURneXRVR3FxMVZhS2JHR0dXRzlXUUMwV0hyejdLUi9GYmhQSTBuT29hWjZXcEtJcHk2aHFOcGk1VDVDb3BackJiakU2TUkyS3BVUnRudTlnOHJBUklZMUNNUXFLMlRLY3hMN3JOUG5PWGVWQ1VwUlkzWFJzMWoyTGxxREVVbTBkOTFYRUxkcE94MEV4Z3d1NVpoQnBUZGhZWmJ6YXUzS0RnYzJqamJkMU5zOTNpZUt5NXVYMmNDamRIQlFKcTNpUUREV0ZwaWQ2b1pEL05aN1BUaTBtTUdhM2s4L2lrSk5GY0hxUnBPMjV1NmhzM3Q3dXJGRzZzSVBjWWQ5RzVrcUNaTkhmVWxoUmpNYXVkTkpQOXJaTVMyZC9lN1Q2RnU2VzR2OE45Z2lGTW5hZTJheklYKzl5blJOd3JGQ3BEcVpSSUVaRWlWRkliSXJFS3YvR1VCRENtOUhJS1FjRjdwd2dvdE5oWkdvSGVLU1pDMDgzU0dLUnhFWnFrME9pRlhrb2ZSQnRqL1hhSWZkUS9kM2NOam51NmFJeERLbG9FdjBRbTV1Vm9IZlB5U2NLb0V1UTRzNjlXampmWFVycWQwdTBSdW9yU1l6QXlTQ29wS2Q0MXJuT1lyNldYMEYyVGdYcDg5UEdkdUhuSGdHV1NnTFhxUkF5WE0xMDJxZUxmclRyQk1nakNKRXZKUENXZmlGR1pQNms2UVNqZHBqZnA4MHg2VXowamhuUEpFK0ZCdnZOUFg2M256dEhEQlN5YitaQlg4VWVoR29aUElmS0JWS3VHVlNZZFBoWjBGNVoxQzRYNGlVdnVCbnQ4dHpaT2lIUEY5Y1Q1NC9pNDVESytwQ2Qzd1lKY1R0ZkQ2K0xGK05KNHRqUmVpbWZpNC9sa3NOdXM2N2ZxcHJIUlRTZFZWaExyK21uZGV4U3lJa0UzdmJDMHFJaWthQmh6am9XWm41Zk4yc29XbHk5QzBNS1hMMXJPMk1xeW1UVGVRc3c1R3NhUWduQTJ6NnVjai83cUN3ZC85SGM5QmpJdndkSzZjODNScDZWTjQ4MVZkdzV2Y016dmVQejhydkUzSDFpVkZQNUY2cjU3Vnc5VVo1WjEzOU5jdTJkN2YzTVJPZXA1S2xCZHR2SElCcXQxZGFXdzFydDBSYW1vMVdRdldObzV1bXJvYUU5eGtmdUJydmxyMXhrdDFUbUw2a29FblVaWVVIWEhuY3JCQzNiUGZNaXR3eE9yR2RaSkZrR25qb09WS2ZIT1N4cWlrWElMR2pWNWgvT081VEVCcFpIenJ1YnhWL0lJY1Y3Sm1jbGhjcVptemtnYWRVSmpUb2FxWlY1cWlpRUJ0R0F2czl1bmJjUmF0SDU2L2RaUjNYdllsaTBzaFNLaXgxWGF5cFl6NWVnb3VtQ1RoUzAzYXdnMVQ3bWVQSkZpYVNxM3RWZVo4SVRJc2lUOEVlRlpsbC95d2c3di9zNThidW4xTDlxSG1oZVV0QWNkVFAwblV6bk5kZVdKQ2VXU2xIcFhRUEkvNFdhTzR6cjJZZXlFT1JmTWd3Mm5RRHZ6d1V0MEpRYXFZaGFxYURBSXU0V25CZWFDUUt4Q2ozQmNZQlBtT1MvZ01HVDRPcTZUdGxJaU1rSkdTMEtTTGthTFozcTczVzZieHBYUUpheGZ2MVZ2c3hiUmxkajAxSTJtYk5aZ1c0NWVUVTB6VURlcURQcERoR1VZa3NCd0hNc1pGbFMyTE10WW1HaXN5Qi9heGxhWlZ6ZFVKaVlzY3pvTXk5YlhtTldxMzZuVXovL2o5V2thOHgzaDFWdzM2bTBEQjNSSXRsek5JdWNsSzdGUzQxc2JBZzFFNWVUNTVRMW5zaTVrTWFWWkpHdUJ0dEtWYTlMVnVKTFRET3BXVUtuQWlEYTMwamhVdmhpR1c2ZHQxdW10RWRPajdVa2tBSWxpL0NxQ2g4bFpzeXR4bUpwbXc3YkNwQ0VHUFlack1pNHVFcFNwZEFEVHNmbkxRVWNpeWREMnRwUzFMek1Sd2l5YzNEWHcrRVpyMmNCVFc3Wjh0WlRITjBHR3hERmMvZDdUV3d1azlnV0wyNWRtQi93TDJtc0x3cXVMVm0yV1REVXJzdXBHV3JPV3BtZGxEbTFvUGZLdk8rLzU3aU91ZFFPR0NsdEJUTzZlams5K3Z2MTRhQ243WHYvK3Rwd0Y3djBianA4d3RZK2pYUTVoY0g0RjM3Sm9MWEJKaXdudlpFNnJTRUJGTHFtSVNpMnBXOVRNTWJXc1puYXJpVWROQkRXNW9pWmpTRGlqdnFEbWVDMW5nSFo4YWJWUDIrMEVuWWNYQmlPMlpUUWNrOHROQm9KeGVJaGtoSDlETXJqcmI3MzFNY3N0L2ZoYkdCQXRtQThWM0dvUW9VTEsxam0xV3FQVGhYYlBTVzNnazExeE9sMmNUaklTb3pIZEJha29IV3VBVWdDSUZaTi9QVFg4d2xKK3pyYXpPYTR5NkREOUszZ055N1RkOThhWTVMei9qYnVHdnJ5OVNSUCtWWUxIdlhYd1p5MWJFa2xtWE1QT3I2VzBQSEx1N24zZlA3SnlpZmYrbFpyMjNsY253K08rdnNUbUEwTjJ0RWtWNmphR3VwVmpwVHp3eXNKMGRRS3NGS1ptcmtwNVdNcGlhRDFqMDlYeHNISnhXYnd6NTB6aGhVS21zRERIZWRwSlhFNlMycEJHWTd6UWtONllsbGJWd0V1SnVrYStvaTB1THNzdXBGcFRkNmNlU3VWU1UvV3RXYnI1ZGxlWmxhNnVESTJsTEZHZlZHbWxtWUJ3RWFhMTdteVpkYjFPQ2E0aXZHYlhheWZsMGVDSnlhT1prYzBZSWtsZllkQ3c1cHo4K1JoM3lURWFOaHBhNWVUQTZydldXT3BDbjNmLzFsQ3dMTjljVVpEQmg5OUprTGIrZzkvM2haR2xNY25tTERFN282Q2dKSHVUTDA2MTVQaDNEcGUwVnVjMkxGdnNyczVKS1dyZnRkcXp0eldQY0JYTFhHVUdqWGxaaWFaaDJ4cHJXZS9obnZEMi9LcENnK29KVlp5S0cvVDVBb3lhWVhBbnFselZiR25lYUVNZjM0Z3RoMVJLbktjWkVtRElKZHh0ZVlsdjRabGp2TXd6dTNuaTRZbkFreXM4R1VQQ0dmNEN6MkZFMGJwd1MwU2h4MjJSV09MUC9tbVJzbzhkd0xkTkhYOGZhQ0FEVnArQ2hKbi9sS3pvSE8xYU1KWWFQY2FBY2N6SUNVYVNFdE10eHBiR01yR3FIbXNLU1pFMHBzYVVsSmprSGpVYms0U3o0RjVDeXlqZFdNcTJZajVQSzNXVWJpbTR6K2xOYUY5K1VUNkYwWmk4cnZyZWJ6NFEvbEw0Sjh6T2ZkL2FZdysvdlhkditDMVNXZHRqejJiL2VlMXplMWFGVWFHYTdjOE1EbThOVitRc3YwT3AvUmt6djJlTzhFc2dqVlllcG9CV3pJU0VIbFFsSlU3alpHTllubmV4UGF5ZlpWa3B2N2p4R0V2WVJONkZWbzJOVlduMWtRVEE2TmZiTUJaUXk2S3RVUmlqdzJiRjJPQno4c3YxNW5KYmhjMWdNNWoxMU8yTE1SWUllZWJ1Qnc5OHppMmZPMWRsejF5UXVTaVV0TzhBYysvcjRmRHIxOCs3bW1OVkwrcjFrYjBKL2NUMW9aOEU4SjRDZnVheWxCOExxK0tjbDlWWDFZemFkTmgwek1RRWxFWTJYVFh4VjB3a005VjVJWTJrUll1NkV2Q2EySVRHdEhSSVV4c0VYUXVyb3pscnQ5bG55N3JpdzRoaGw1Tkl5SnIwc3lXUVdwbld4Qmp5VE9YWGRtemMxNWtmL2lERnNrTFpwMmpkWVBDOW05MTRkMEFLUE9HKzNzWnNtTjJqcnY4VGZ6YThXYXlwdENSR3pqVzBwanlLZVp1TXUyeXVsSkxTQUhtZXZFQWVrOWtRbCtiUzZnUVhyNWlTVnBHSW4yY1BEck5saERvYXEwaDBDK1VlZFl5ZlAzRC9kdzQ0Ni9hZkgzL2svTjdxOEUvdnZmUHUrODFTOStMbDN0b2NKdnZ1ODQrM3R6MzIxajA3engzdDZIajgzSzQzWHBSUGV3OTJGeFYxSDZSMjFZWHY0QVp4ejZmNm5JSVlrbXVYRTg1TkptbnRNckVST2NVcUczNEVrMGtKK2lRWktrc1g1aVdiaUFxUFdqbnp5MVBSZ1l2dGhKaVl4aitSL0hCSDZ4MDlmKzliV2Q0cFpkb0trOElkcFBBUGJOUEhFMisyZFNYK1MyeVNZVUYvS1dlZHpZZW5NQi8wa0FVQnFSbVVTQ002Tm1sdFBPaDFXcjJnWi9SNmU3d0xUMWJaZ1d3aVpwZG1IOHRtMDlodWtTdmxHRTdIOVBTaytkTjJweDFQNDlLa1ZCTVdNRWp0d1owSGt1aDVJNW9ueWdrTVBhbzd2eFVEY0lsTk9aVmhGSnJJYkxvWXFDL1ZaQzVwdU5id3FmQ3ptREpuN24vei9ocHIrMmdkdVNkOFpOODk0UWZKbnRxZWFxemUxMy9MMzdkcytFbXZhMisvUTNkZFppOE85SVU5UXVYcXFFOUwwS2ZaTUI5Y3IyUTRNelB6bkRvYWNQUG5GelhxQ3EyRnJzS2VRbi9oMDRWOHJyNkIxN2ZsNXFZS2JYRzYxRmJRWlpDTURLVyswaXFxcUU4OVg3WWV0K3cvMzBIbUVaUGlkbVg3WUdseE5Wa0lzMkxiYS9jNzJ5ZW0rc2RlRGkyK3ZpSjk4WnJxRlJ0U2lEcXBac3NYZzBYTkZUa01lU1oySk1VeDhjTkRULzVnNzlLdVk1ZjJ4ZFp2NjF4b3IwMnpETjVSeVU3T3MvYzU5KzdGZGV6RFdEakV0VUl1TEliMXB5QUhzeXdMczR3VjhaSFg4QlpjUXA0bGdTV2tKRXZ2dkpCRWtxSzVSVnNwQ1hNcnFjQ1ZKZXBTdFhwam1TdU94akVlUW00Nk9KVmhRRzlWRXV6R2FkaU1aeWVhWnZuUlV4U1pDL0hJWVZpSjhVTUwrNS9hWE5xenBpbFRSZkJZRmY0Tnp4STl3N01NWnp1eGJlQ28xeHAraHg0emFnb0xhdG9XTE82b3pHWnk3cnB3dERPbHBHa3hYMUMrTENQczVmNnRmVTl1VE1HaUpZYk42em9lTzdmcjFOZk5uWWVHTjAxMG1JdldQcXpVRjd6MXYzdnQ2Z2N0UGRxcWF5QkVmazk5YXlMbjRScy81WVZYWStTZVJkNVl0RVAweDBxQW1PWGgxVkIzNCtmTDIzNy9TMkkraEhwK0RTempmZ203Mlhtd0Q5c09waElPY1VGb3didUt3bmdEOGh4Z25vY003RCtFTiszVDhkK0dBd3JmTCttWkZvcmhWWkpOZGpFcXBwWTV6QzVpKy9BenhjVnlXN2lYdUEvNU5meXJxaVZSRFpMQUdkV1JBUjFZb1J1cjV5N1ZGM0dYbzlRc3NtWk9UOCtjemdTUDdKNG96QUFIL2lqTVlzME5SbUVPVXVDUktNempudlpzRkZaaC9YZ3BDc2ZBTHZoMkZJNkZGRklUaGRXZ0laMVJPQjUxNkozN1M0S0Y3STdDaWVBbkwwUmhEU3huc25CMndxa1JPOE4wUjJFQzJXeG1GR1lnbGwwU2hWbFl6a3BSbUlNQzl0NG96RU1XKzJ3VVZrRSsrODBvSEFNZnNSOUU0VmdvNE42Tndtckk0cmtvSEE5TGVERUtKOEE2M2gyRkUrRTkvcVVvcklHN1ZZL1UrUU03UjRjR0JrTmlRVytoV0ZaYVdpRzIrZnJFUm0rb1dHd2E2YldJTlZ1MmlBcERVQnoxQlgyajIzMTlGbkZsVTYyanJhYWp5YlZhSEFxS1hqRTA2dTN6RFh0SE40disvbHZIcnh6YTZCdjFob2I4STJLN2R5Ulk2OS9TVnhQczlZMzArVWJGRXZHMlhwRjJmeHB0alc4MFNBa0xMYVVWbGtVM09DaER5VzJEL29wQ3VJcUJvV0RJTjRyRW9SR3gwOUp1RVZ1OElkOUlTUFNPOUlrZGN3TmQvZjFEdlQ2RjJPc2JEWG1SMlI4YVJMVTNiUnNkQ3ZZTjlkTFpncGE1MWRUNVJ3UCtxRm9oMzNhZnVNb2JDdm1DL3BIQlVDaXcxR3Jkc1dPSHhSdGw3a1ZlUzY5LzJQcVgra0k3QTc0K1gzQm9ZQVJYYnhrTURXOVppUXFOQkZIeGJjcU1xTTNORm5UNlI5QkpXeUk4eFdMUTV4T3ArQ0RLNy9mMW9XcUJVZjhtWDIvSTRoOGRzTzRZMmp4a2pjZ2JHaG13M2hCRHBVVG4rZHRHWTIzeFF3QjJ3aWdNd1FBTVFnamZSd3FnRndxeExZTlMvRlFnMUFZKzZNTzJFYnpJVVl4UUU0d2dsd1doR3RpQ0gvRW1DVUVGODJIcnczYTdNcFp5cnNSUnRmajIyWVpqT2hCMkFYMzdHVkw0dlhpSGtOdUx2RDRZeG5ZVU5pUE5ELzEvY2Y2Vk9INmpNZy90R1VMK0VleHRSMndFNWRZaXZnVkgxaURjaTF3aml2UlI1Q2hSOVBsTFk4VzUwZjlkdmpVS1QzQ09ZeUhxUisxbmdVV2ZLbU5XUXNsZm1lbHZzMURFRndPS2xKQWlPOEk1cE1qdVJJNTJoYXRGR1VsdEZGSm1HMUc0T2o1bFJoZk8ySS9qcVVWdmNQWXFza09JUnlUN0VSNk1XbnNUYkZQaUk0aWNkTnpzMm9JNDg1Lzdoc2JrS0VhbC96WnJVZTIySzNPdVV1Z2hKY1pvMzZDQ0JXQXA3a1pXMktGOExNaHpxK1RlcUZ5TEFnMGo1LzkwWEFnekpxRFkwYWY0ZXdCNUk3NjNLREtIMFpzcm94WWFVZktBV21qYlRXdU0yT2F6WXRDcHRKRk0ybktMSE9wWjJ0S3hzOW9Iby9yM0svTkVyQmJBcHgvdDdsT3NiVkdvQThvYWg5Q0hRd2pkckIvMTJFQ1VkcnMyczdyY3VwNy95N25aeU9GaVpqNjhEWjl5bllZV0VvTWJ1VlY1SGllYzFFQXVYQ2VucnhQZGRlTC9tRWdmazdGcmg2OGR1OGIrNFdxNVlMMzY5RldtNXdxeFh1bTU0ci95OUpWTFYvaGZ2eThLdjNxL1d2akY1Zm5Denk5WEM1ZXFmOWI1WGpYYitiTXBrbjJpU3JEV3hKTnMrbktEVHhGdkNXOTI1Z3pKbGdveXNwenZzak1DdkVOK3lsVUpQL2hlbHZEOTcrVUxub3VITDU2NXlOSkdSdUR5Ulo2ZWJTOW16SE5pKzlMRnVFU25kb3FrU2xweSt2VjhRWHF0c01ZcHZaWXozemxGVEpMNWxXb0Jwc2pVeVRnQlRoSTRLWjZVVG5wT0JrN3l0RGw4OHNMSnF5ZjVLU0pLaVkzSTk3TG5aZWJZeXhkZVpwVFgwWmZqTlU3dGlaNFR6Q1FiMFRrRDdIaTc4R2JoRUQ0SmFwNGhGZVFYT29YajF1UDI0MDhmNTdUSGlYUmNrK3FFRndJdmpMM0FYbjdoNmd2TVY1OHZGNTV2eVJkT0VTUEp4T1dqT3BtdkVPMXpSUHNWOGcyU1JwS2hDZ1Jpa1BhMVZBbGZlSEsrOEJUZW44ZDc3RW55aExOQWVQcHp4ei9ISEhXV0M5ckhoTWVZUncvbkM0OGN5UmNPSFl3WEhqNllMMmduaEFtbVo4SS9zWHRpWm9LVEpwTFRuTnFEUkRvWXIzVnFEd2dIbUFjZjBBbzlENURGZTV4N21PMm94RGE4UTNnSDhTNE1FR09Bc0FIeVVZRDhLUERyQURNWUlGMEJRbittQ2dYUXFQNlJSbUhFV1Naa2t2VE9ERnQ2WjR5TjdWU2hkN3c0MXROVEp2Umd1Nkc3VVZqbm5DK3M3YjVUNkhZdUZKTExranA1d25aeVpXeW5ueVZhMXM0eVBlMUVhaThvZGtydDJUbjRTRTUzdHJVV0NLMnVMS0VGN3d4WG9ZdnBjZzI1bUNtU0pCVTY4NFFtWjRiUTZEUUpEYmpvLzNTaUVVaHFtYUZUVDdTZHVqSnRKME9nazhDTU1FWDBKNHhxYkhSU05iWTZvMlJrZEViUldHb01HRGxCYTlmMmFIZHJPYTNXcW5WcC9kcEQya3ZhR1cxTWhIcEZ5K0h4dVFmSVdDcmh5UlE1UE5uUlhsVFVQQlV6MDlZc3g3U3NsY2wrT2ErZFBxWFdibG0xWDRiTzdyWHVTVUllN25wZ1lnSnE1elhMWmUxdTJUT3ZxMW51UTBDaXdCZ0N1bm1UcVZEYkZRd0ZROXVDb2FMSVJTSVF6QktDd1cyVVNrbEZzeXdLT1JnTWhVSVFHUklzQ2tKUnNDaTBUUmxCRUlSZ2RIU1FzbE5wMFMraFQ4UzNGWVVVVVpReEdLSThSUlNLVGdZS2tZcFJMcHdoU1A4TDZiOEF5UHZLK2dwbGJtUnpkSEpsWVcwS1pXNWtiMkpxQ2dveU9TQXdJRzlpYWdvMk1UQTNDbVZ1Wkc5aWFnb0tNekFnTUNCdlltb0tQRHd2Vkhsd1pTOUdiMjUwUkdWelkzSnBjSFJ2Y2k5R2IyNTBUbUZ0WlM5RVFVRkJRVUVyVEdsaVpYSmhkR2x2YmxOaGJuTXRRbTlzWkFvdlJteGhaM01nTkFvdlJtOXVkRUpDYjNoYkxURTROQ0F0TXpBeklERXdOakVnTVRBek0xMHZTWFJoYkdsalFXNW5iR1VnTUFvdlFYTmpaVzUwSURrd05Rb3ZSR1Z6WTJWdWRDQXRNakV4Q2k5RFlYQklaV2xuYUhRZ01UQXpNd292VTNSbGJWWWdPREFLTDBadmJuUkdhV3hsTWlBeU9DQXdJRklLUGo0S1pXNWtiMkpxQ2dvek1TQXdJRzlpYWdvOFBDOU1aVzVuZEdnZ016QXdMMFpwYkhSbGNpOUdiR0YwWlVSbFkyOWtaVDQrQ25OMGNtVmhiUXA0bkYyUnkyN0RJQkJGOTN3RnkzUVJHWnlIRzhteWxEcTE1RVVmcXRzUGNHQ2NJdFVZWWJMdzM1ZGgwbGJxQW5SR2N5L01JNnZiVTJ0TnlGNzlwRG9JZkRCV2U1aW5xMWZBejNBeGxzbWNhNlBDTFVxM0dudkhzdWp0bGpuQTJOcGhLa3VXdmNYY0hQekNWMGM5bmVHT1pTOWVnemYyd2xjZmRSZmo3dXJjRjR4Z0F4ZXNxcmlHSWI3ejFMdm5mb1FzdWRhdGpta1RsblcwL0FuZUZ3YzhUN0drVXRTa1lYYTlBdC9iQzdCU2lJcVhUVk14c1BwZlRoWmtPUS9xcy9kUktxTlVpTjJtaXB3bkxuYklHK0ljZVp0NFh5RHZpQS9JZStMa0xZZ2w4ajF4alh4SW5BdmtJLzJWK0lIZTN5TFhwTDlIUGhFM3lJK2tTWDgxNU1WNnBDQU4xaW1wL2tLa1ptOWRZZHU0bDU5eGNuWDFQbzR5TFMvTkVLZG5MUHp1MTAwT1hlbDhBMWdGa3ZVS1pXNWtjM1J5WldGdENtVnVaRzlpYWdvS016SWdNQ0J2WW1vS1BEd3ZWSGx3WlM5R2IyNTBMMU4xWW5SNWNHVXZWSEoxWlZSNWNHVXZRbUZ6WlVadmJuUXZSRUZCUVVGQksweHBZbVZ5WVhScGIyNVRZVzV6TFVKdmJHUUtMMFpwY25OMFEyaGhjaUF3Q2k5TVlYTjBRMmhoY2lBeE53b3ZWMmxrZEdoeld6TTJOU0EyTmpZZ05qRXdJRE00T1NBMk1UQWdNamMzSURVMU5pQTFOVFlnTWpjM0lESTNOeUEyTmpZZ016TXpJRFl4TUNBMk1UQWdOVFUySURjeU1nbzFOVFlnTmpFd0lGMEtMMFp2Ym5SRVpYTmpjbWx3ZEc5eUlETXdJREFnVWdvdlZHOVZibWxqYjJSbElETXhJREFnVWdvK1BncGxibVJ2WW1vS0NqTXpJREFnYjJKcUNqdzhMMFl4SURFeUlEQWdVaTlHTWlBeE55QXdJRkl2UmpNZ016SWdNQ0JTTDBZMElESXlJREFnVWk5R05TQXlOeUF3SUZJS1BqNEtaVzVrYjJKcUNnb3pOQ0F3SUc5aWFnbzhQQzlHYjI1MElETXpJREFnVWdvdldFOWlhbVZqZER3OEwwbHROQ0EwSURBZ1VpOUpiVFVnTlNBd0lGSXZTVzAySURZZ01DQlNQajRLTDFCeWIyTlRaWFJiTDFCRVJpOVVaWGgwTDBsdFlXZGxReTlKYldGblpVa3ZTVzFoWjJWQ1hRbytQZ3BsYm1Sdlltb0tDakVnTUNCdlltb0tQRHd2Vkhsd1pTOVFZV2RsTDFCaGNtVnVkQ0EzSURBZ1VpOVNaWE52ZFhKalpYTWdNelFnTUNCU0wwMWxaR2xoUW05NFd6QWdNQ0ExTnpZZ056a3lYUzlIY205MWNEdzhMMU12VkhKaGJuTndZWEpsYm1ONUwwTlRMMFJsZG1salpWSkhRaTlKSUhSeWRXVStQaTlEYjI1MFpXNTBjeUF5SURBZ1VqNCtDbVZ1Wkc5aWFnb0tNelVnTUNCdlltb0tQRHd2UTI5MWJuUWdNUzlHYVhKemRDQXpOaUF3SUZJdlRHRnpkQ0F6TmlBd0lGSUtQajRLWlc1a2IySnFDZ296TmlBd0lHOWlhZ284UEM5RGIzVnVkQ0F3TDFScGRHeGxQRVpGUmtZd01EVXpNREEyUXpBd05qa3dNRFkwTURBMk5UQXdNakF3TURNeFBnb3ZSR1Z6ZEZzeElEQWdVaTlZV1ZvZ01DQTNPVElnTUYwdlVHRnlaVzUwSURNMUlEQWdVajQrQ21WdVpHOWlhZ29LTnlBd0lHOWlhZ284UEM5VWVYQmxMMUJoWjJWekNpOVNaWE52ZFhKalpYTWdNelFnTUNCU0NpOU5aV1JwWVVKdmVGc2dNQ0F3SURVM05pQTNPVElnWFFvdlMybGtjMXNnTVNBd0lGSWdYUW92UTI5MWJuUWdNVDQrQ21WdVpHOWlhZ29LTXpjZ01DQnZZbW9LUER3dlZIbHdaUzlEWVhSaGJHOW5MMUJoWjJWeklEY2dNQ0JTQ2k5UGNHVnVRV04wYVc5dVd6RWdNQ0JTSUM5WVdWb2diblZzYkNCdWRXeHNJREJkQ2k5UGRYUnNhVzVsY3lBek5TQXdJRklLUGo0S1pXNWtiMkpxQ2dvek9DQXdJRzlpYWdvOFBDOURjbVZoZEc5eVBFWkZSa1l3TURRME1EQTNNakF3TmpFd01EYzNQZ292VUhKdlpIVmpaWEk4UmtWR1JqQXdORU13TURZNU1EQTJNakF3TnpJd01EWTFNREEwUmpBd05qWXdNRFkyTURBMk9UQXdOak13TURZMU1EQXlNREF3TXpVd01ESkZNREF6TVQ0S0wwTnlaV0YwYVc5dVJHRjBaU2hFT2pJd01qQXdNakl5TVRZeE5qRXlLekExSnpNd0p5aytQZ3BsYm1Sdlltb0tDbmh5WldZS01DQXpPUW93TURBd01EQXdNREF3SURZMU5UTTFJR1lnQ2pBd01EQXdPRGN6TlRJZ01EQXdNREFnYmlBS01EQXdNREF3TURBeE9TQXdNREF3TUNCdUlBb3dNREF3TURBeU1ETTFJREF3TURBd0lHNGdDakF3TURBd01qYzBPVFlnTURBd01EQWdiaUFLTURBd01EQXhOakk0TnlBd01EQXdNQ0J1SUFvd01EQXdNREF5TURVMklEQXdNREF3SUc0Z0NqQXdNREF3T0RjMk5qQWdNREF3TURBZ2JpQUtNREF3TURBek5ERTJPU0F3TURBd01DQnVJQW93TURBd01EUXdOVFF3SURBd01EQXdJRzRnQ2pBd01EQXdOREExTmpFZ01EQXdNREFnYmlBS01EQXdNREEwTURjMU9TQXdNREF3TUNCdUlBb3dNREF3TURReE1UTXdJREF3TURBd0lHNGdDakF3TURBd05ERXpOalVnTURBd01EQWdiaUFLTURBd01EQTBPREF4TmlBd01EQXdNQ0J1SUFvd01EQXdNRFE0TURNNElEQXdNREF3SUc0Z0NqQXdNREF3TkRneU5EVWdNREF3TURBZ2JpQUtNREF3TURBME9EWXlOU0F3TURBd01DQnVJQW93TURBd01EUTRPRGN4SURBd01EQXdJRzRnQ2pBd01EQXdOakExTVRBZ01EQXdNREFnYmlBS01EQXdNREEyTURVek15QXdNREF3TUNCdUlBb3dNREF3TURZd056TTNJREF3TURBd0lHNGdDakF3TURBd05qRXhPVFVnTURBd01EQWdiaUFLTURBd01EQTJNVFV4TVNBd01EQXdNQ0J1SUFvd01EQXdNRGM0T1RVNUlEQXdNREF3SUc0Z0NqQXdNREF3TnpnNU9ESWdNREF3TURBZ2JpQUtNREF3TURBM09URTNPU0F3TURBd01DQnVJQW93TURBd01EYzVOek0wSURBd01EQXdJRzRnQ2pBd01EQXdPREF4TXpjZ01EQXdNREFnYmlBS01EQXdNREE0TmpNek1DQXdNREF3TUNCdUlBb3dNREF3TURnMk16VXlJREF3TURBd0lHNGdDakF3TURBd09EWTFOVFVnTURBd01EQWdiaUFLTURBd01EQTROamt5TlNBd01EQXdNQ0J1SUFvd01EQXdNRGczTVRZd0lEQXdNREF3SUc0Z0NqQXdNREF3T0RjeU16TWdNREF3TURBZ2JpQUtNREF3TURBNE56UTVOU0F3TURBd01DQnVJQW93TURBd01EZzNOVFV4SURBd01EQXdJRzRnQ2pBd01EQXdPRGMzTlRrZ01EQXdNREFnYmlBS01EQXdNREE0TnpnMk1DQXdNREF3TUNCdUlBcDBjbUZwYkdWeUNqdzhMMU5wZW1VZ016a3ZVbTl2ZENBek55QXdJRklLTDBsdVptOGdNemdnTUNCU0NpOUpSQ0JiSUR3NVJEazRSa1JCTVVNelJVWXhNVEJGTnpBM05qTkdOakUxTWtFM1JETTFNRDRLUERsRU9UaEdSRUV4UXpORlJqRXhNRVUzTURjMk0wWTJNVFV5UVRkRU16VXdQaUJkQ2k5RWIyTkRhR1ZqYTNOMWJTQXZPRU5HUXpZNU5qZzFNa1V5UkRoRE5URkdNek13UlVVM05VRkZOVFUxTTBRS1BqNEtjM1JoY25SNGNtVm1Damc0TURJM0NpVWxSVTlHQ2c9PQ==");
			jsonattachmentobj13.put("title", "Surgical Pathology Report");

			jsoncontentobj13.put("attachment", jsonattachmentobj13);
			jsoncontentArray13.put(jsoncontentobj13);
			resource13.put("content", jsoncontentArray13);

			jsonObjectFullUrl13.put("resource", resource13);
			enrtyArray.put(jsonObjectFullUrl13);
			// end 13 obj

			// object 14 start
			org.json.JSONObject jsonObjectFullUrl14 = new org.json.JSONObject();
			jsonObjectFullUrl14.put("fullUrl", "Organization" + "/" + "MaxSaket01");

			org.json.JSONObject resource14 = new org.json.JSONObject();
			resource14.put("resourceType", "Organization");
			resource14.put("id", "MaxSaket01");
			resource14.put("name", hospitalDetails.getHospitalName());

			org.json.JSONArray addressArray8 = new org.json.JSONArray();
			org.json.JSONObject address8 = new org.json.JSONObject();
			address8.put("city", hospitalDetails.getHospitalCity());
			address8.put("country", hospitalDetails.getHospitalCountry());

			org.json.JSONArray line9 = new org.json.JSONArray();
			line9.put(hospitalDetails.getHospitalAddress());
			address8.put("line", line9);
			address8.put("postalCode", hospitalDetails.getHospitalZip());
			address8.put("state", hospitalDetails.getHospitalCity());
			addressArray8.put(address8);
			resource14.put("address", addressArray8);

			org.json.JSONArray alias9 = new org.json.JSONArray();
			alias9.put(hospitalDetails.getHospital_initial());
			resource14.put("alias", alias9);

			org.json.JSONArray endpoint9 = new org.json.JSONArray();
			org.json.JSONObject endpointobj9 = new org.json.JSONObject();
			endpointobj9.put("display", "Website");
			endpointobj9.put("reference", "https://www.max.in/hospital-network/max-super-speciality-hospital-saket");
			endpoint9.put(endpointobj9);

			resource14.put("endpoint", endpoint9);

			org.json.JSONArray identifier9 = new org.json.JSONArray();
			org.json.JSONObject jsonIdentifierFullUrl9 = new org.json.JSONObject();
			jsonIdentifierFullUrl9.put("system", "https://facilitysbx.ndhm.gov.in");
			jsonIdentifierFullUrl9.put("value", "IN0410000183");
			identifier9.put(jsonIdentifierFullUrl9);
			resource14.put("identifier", identifier9);

			org.json.JSONArray telecom9 = new org.json.JSONArray();
			org.json.JSONObject jsontelecomFullUrl9 = new org.json.JSONObject();
			jsontelecomFullUrl9.put("system", "phone");
			jsontelecomFullUrl9.put("value",hospitalDetails.getHospitalContact());
			org.json.JSONObject jsontelecomFullUrl91 = new org.json.JSONObject();
			jsontelecomFullUrl91.put("system", "fax");
			jsontelecomFullUrl91.put("value", hospitalDetails.getHospitalFax());
			telecom9.put(jsontelecomFullUrl9);
			telecom9.put(jsontelecomFullUrl91);
			resource14.put("telecom", telecom9);

			jsonObjectFullUrl14.put("resource", resource14);

			enrtyArray.put(jsonObjectFullUrl14);

			// object 14 end
			jsonObject.put("entry", enrtyArray);
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("Main json obj=======" + jsonObject.toString());
		// return jsonObject.toString();
		return jsonObject.toString();
	}

	@SuppressWarnings("unchecked")
	@Override
	public String dischargeSummaryData(Integer patientId) {

		LOG.info("Inside a Send discharge Summary report Data ");
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();
		
		Integer unitId=1;
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
		criteria.add(Restrictions.eq("sandboxIntegrationFlag", 'Y'));
		criteria.add(Restrictions.eq("hospitalUnitId", unitId));
		HospitalDetails hospitalDetails = (HospitalDetails) criteria.uniqueResult();

		if (hospitalDetails == null) {

			throw new RuntimeException("Hospital Details is null in dignostic report");
		}

		// get the doctor name
		String doctorname = "";
		String sql = "select doctor_id from ehat_treatment where patient_id=" + patientId + " ";
		SQLQuery sQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		String doctorIds = (String) sQuery.uniqueResult();
		String[] doctorArray = doctorIds.split(",");
		int docCount = 1;
		for (String doctorId : doctorArray) {
			String sqlDoctor = "select doc_name from doctor where Doctor_ID= '" + doctorId + "' ";
			SQLQuery sdocQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
			String docName = (String) sdocQuery.uniqueResult();
			if (docCount == 1) {
				doctorname = docName;
			} else {
				doctorname = doctorname + "," + docName;
			}
			docCount++;

		}
		
		Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
		
		createCriteria2.add(Restrictions.eq("doc_Type", "DOCTOR"));
		createCriteria2.add(Restrictions.eq("deleted", "N"));
		createCriteria2.add(Restrictions.eq("Doctor_ID", Integer.parseInt(doctorIds)));
		
		List<Doctor> doctors = createCriteria2.list();
		Doctor doctor = doctors.get(0);
		int hospitalSpecializetionId = Integer.parseInt(doctor.getSpecialisation());
		String[] split = doctor.getDoc_name().split("\\.");
		String prefix3 = split[0];
		
		
		//fetch hospital specilization from doctor id
		Criteria createCriteria3 = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
		createCriteria3.add(Restrictions.eq("deleted", "N"));
		createCriteria3.add(Restrictions.eq("specialisationId", hospitalSpecializetionId));
		
		List<HospitalSpecialisationDto> specialisationDtos = createCriteria3.list();
		HospitalSpecialisationDto hospitalSpecialisationDto = specialisationDtos.get(0);
		String specializationName = hospitalSpecialisationDto.getSpecializationName();	
		// end doctor details

		
//		  fetach patient name from patient table
		
		
//		fetch tretment details from treatment table
		Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
		
		createCriteria.add(Restrictions.eq("patientId", patientId));
		List<RegistrationDto> list = createCriteria.list();
		RegistrationDto sandBoxPatientInfo = list.get(0);
		List<TreatmentDto> treatmentDto;
		TreatmentDto treatmentDto2= new TreatmentDto();
		if(list!=null) {
			treatmentDto = list.get(0).getListTreatment();
			
			//list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
			List<TreatmentDto> collect = treatmentDto.stream().filter(x->x.gettFlag().equalsIgnoreCase("Y")).collect(Collectors.toList());
			treatmentDto2 = collect.get(0);
		}
		
		Integer treatmentId = treatmentDto2.getTreatmentId();
		Integer unitId2 = treatmentDto2.getUnitId();

//		List<RegistrationDto> patientRecordsbypatientId = regService.getPatientRecordsbypatientId(patientId);
//		RegistrationDto sandBoxPatientInfo=patientRecordsbypatientId.get(0);
		
		String patientName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getlName();
		String patientID = sandBoxPatientInfo.getPatientId().toString();
		

		try {

			jsonObject.addProperty("resourceType", "Bundle");
			UUID uuid = UUID.randomUUID();
			jsonObject.addProperty("id", uuid.toString());

			com.google.gson.JsonObject jsonObjectMeta = new com.google.gson.JsonObject();
			jsonObjectMeta.addProperty("lastUpdated", currentDate);
			jsonObject.add("meta", jsonObjectMeta);

			com.google.gson.JsonObject jsonObjectIdentifier = new com.google.gson.JsonObject();
			jsonObjectIdentifier.addProperty("system", "https://www.max.in/bundle");
			jsonObjectIdentifier.addProperty("value", uuid.toString());

			jsonObject.add("identifier", jsonObjectIdentifier);
			jsonObject.addProperty("type", "document");
			jsonObject.addProperty("timestamp", currentDate);

			com.google.gson.JsonArray enrtyArray = new com.google.gson.JsonArray();

			// first object start
			UUID uuid1 = UUID.randomUUID();

			com.google.gson.JsonObject jsonObjectFullUrl1 = new com.google.gson.JsonObject();
			jsonObjectFullUrl1.addProperty("fullUrl", "Composition" + "/" + uuid1.toString());
			com.google.gson.JsonObject jsonresource = new com.google.gson.JsonObject();
			jsonresource.addProperty("resourceType", "Composition");
			jsonresource.addProperty("id", uuid1.toString());

			com.google.gson.JsonObject jsonIdentifier = new com.google.gson.JsonObject();
			jsonIdentifier.addProperty("system", "https://www.max.in/document");
			jsonIdentifier.addProperty("value", uuid1.toString());
			jsonresource.add("identifier", jsonIdentifier);

			jsonresource.addProperty("status", "final");
			com.google.gson.JsonObject jsonType = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodingArray = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCodingObj = new com.google.gson.JsonObject();
			jsonCodingObj.addProperty("system", "https://projecteka.in/sct");
			jsonCodingObj.addProperty("code", "373942005");
			jsonCodingObj.addProperty("display", "Discharge Summary Record");
			jsonCodingArray.add(jsonCodingObj);
			jsonType.add("coding", jsonCodingArray);
			jsonresource.add("type", jsonType);

			com.google.gson.JsonObject jsonSubject = new com.google.gson.JsonObject();
			jsonSubject.addProperty("reference", "Patient" + "/" + patientID);
			jsonresource.add("subject", jsonSubject);

			UUID uuid2 = UUID.randomUUID();

			com.google.gson.JsonObject jsonEncounter = new com.google.gson.JsonObject();
			jsonEncounter.addProperty("reference", "Encounter" + "/" + uuid2.toString());
			jsonresource.add("encounter", jsonEncounter);

			jsonresource.addProperty("date", currentDate);

			com.google.gson.JsonArray jsonAuther = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonAutherObj = new com.google.gson.JsonObject();
			jsonAutherObj.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			jsonAutherObj.addProperty("display", doctorname);
			jsonAuther.add(jsonAutherObj);
			jsonresource.add("author", jsonAuther);

			jsonresource.addProperty("title", "Discharge Summary Document");
			com.google.gson.JsonObject custodian = new com.google.gson.JsonObject();
			custodian.addProperty("reference", "Organization" + "/" + hospitalDetails.getInitials());
			jsonresource.add("custodian", custodian);

			com.google.gson.JsonArray jsonSection = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonSectionObj = new com.google.gson.JsonObject();
			jsonSectionObj.addProperty("title", "Presenting Problems");

			com.google.gson.JsonObject jsonCode = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCoding = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj = new com.google.gson.JsonObject();
			jsonCoddingObj.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj.addProperty("code", "422843007");
			jsonCoddingObj.addProperty("display", "Chief Complaint Section");
			jsonCoding.add(jsonCoddingObj);
			jsonCode.add("coding", jsonCoding);
			jsonSectionObj.add("code", jsonCode);

			UUID uuid3 = UUID.randomUUID();
			com.google.gson.JsonObject jsonEntryObj = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry = new com.google.gson.JsonArray();
			jsonEntryObj.addProperty("reference", "Condition" + "/" + uuid3.toString());
			jsonEntry.add(jsonEntryObj);
			jsonSectionObj.add("entry", jsonEntry);

			// section 2
			com.google.gson.JsonObject jsonSectionObj2 = new com.google.gson.JsonObject();
			jsonSectionObj2.addProperty("title", "Allergy Section");

			com.google.gson.JsonObject jsonCode1 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj1 = new com.google.gson.JsonObject();
			jsonCoddingObj1.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj1.addProperty("code", "722446000");
			jsonCoddingObj1.addProperty("display", "Allergy Record");
			jsonCodding.add(jsonCoddingObj1);
			jsonCode1.add("coding", jsonCodding);
			jsonSectionObj2.add("code", jsonCode1);

			com.google.gson.JsonObject jsonEntryObj1 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonEntryObj2 = new com.google.gson.JsonObject();

			jsonEntryObj1.addProperty("reference", "AllergyIntolerance" + "/" + "example");
			jsonEntryObj2.addProperty("reference", "AllergyIntolerance" + "/" + "medication");
			jsonEntry1.add(jsonEntryObj1);
			jsonEntry1.add(jsonEntryObj2);
			jsonSectionObj2.add("entry", jsonEntry1);

			// section 3
			com.google.gson.JsonObject jsonSectionObj3 = new com.google.gson.JsonObject();
			jsonSectionObj3.addProperty("title", "Physical Examination");

			com.google.gson.JsonObject jsonCode2 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj2 = new com.google.gson.JsonObject();
			jsonCoddingObj2.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj2.addProperty("code", "425044008");
			jsonCoddingObj2.addProperty("display", "Physical exam section");
			jsonCodding2.add(jsonCoddingObj2);
			jsonCode2.add("coding", jsonCodding2);
			jsonSectionObj3.add("code", jsonCode2);

			UUID uuid4 = UUID.randomUUID();
			UUID uuid5 = UUID.randomUUID();
			com.google.gson.JsonObject jsonEntryObj3 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonEntryObj31 = new com.google.gson.JsonObject();

			jsonEntryObj3.addProperty("reference", "Observation" + "/" + uuid4.toString());
			jsonEntryObj31.addProperty("reference", "Observation" + "/" + uuid5.toString());
			jsonEntry3.add(jsonEntryObj3);
			jsonEntry3.add(jsonEntryObj31);
			jsonSectionObj3.add("entry", jsonEntry3);

			// section 4
			com.google.gson.JsonObject jsonSectionObj4 = new com.google.gson.JsonObject();
			jsonSectionObj4.addProperty("title", "Prescribed medications during Admission");

			com.google.gson.JsonObject jsonCode3 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj3 = new com.google.gson.JsonObject();
			jsonCoddingObj3.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj3.addProperty("code", "440545006");
			jsonCoddingObj3.addProperty("display", "Prescription");
			jsonCodding3.add(jsonCoddingObj3);
			jsonCode3.add("coding", jsonCodding3);
			jsonSectionObj4.add("code", jsonCode3);

			UUID uuid6 = UUID.randomUUID();
			UUID uuid7 = UUID.randomUUID();
			com.google.gson.JsonObject jsonEntryObj4 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonEntryObj41 = new com.google.gson.JsonObject();

			jsonEntryObj4.addProperty("reference", "MedicationRequest" + "/" + uuid6.toString());
			jsonEntryObj41.addProperty("reference", "MedicationRequest" + "/" + uuid7.toString());
			jsonEntry4.add(jsonEntryObj4);
			jsonEntry4.add(jsonEntryObj41);
			jsonSectionObj4.add("entry", jsonEntry4);

			// section 5

			com.google.gson.JsonObject jsonSectionObj5 = new com.google.gson.JsonObject();
			jsonSectionObj5.addProperty("title", "Clinical consultation");

			com.google.gson.JsonObject jsonCode4 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj4 = new com.google.gson.JsonObject();
			jsonCoddingObj4.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj4.addProperty("code", "371530004");
			jsonCoddingObj4.addProperty("display", "Clinical consultation report");
			jsonCodding4.add(jsonCoddingObj4);
			jsonCode4.add("coding", jsonCodding4);
			jsonSectionObj5.add("code", jsonCode4);

			UUID uuid8 = UUID.randomUUID();

			com.google.gson.JsonObject jsonEntryObj5 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry5 = new com.google.gson.JsonArray();
			// com.google.gson.JsonObject jsonEntryObj51=new com.google.gson.JsonObject();

			jsonEntryObj5.addProperty("reference", "DocumentReference" + "/" + uuid8.toString());
			// jsonEntryObj41.addProperty("reference",
			// "MedicationRequest"+"/"+uuid7.toString());
			jsonEntry5.add(jsonEntryObj5);
			// jsonEntry4.add(jsonEntryObj41);
			jsonSectionObj5.add("entry", jsonEntry5);

			// section 6
			com.google.gson.JsonObject jsonSectionObj6 = new com.google.gson.JsonObject();
			jsonSectionObj6.addProperty("title", "Procedures");

			com.google.gson.JsonObject jsonCode5 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding5 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj5 = new com.google.gson.JsonObject();
			jsonCoddingObj5.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj5.addProperty("code", "371525003");
			jsonCoddingObj5.addProperty("display", "Clinical procedure report");
			jsonCodding5.add(jsonCoddingObj5);
			jsonCode5.add("coding", jsonCodding5);
			jsonSectionObj6.add("code", jsonCode5);

			UUID uuid9 = UUID.randomUUID();

			com.google.gson.JsonObject jsonEntryObj6 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry6 = new com.google.gson.JsonArray();
			// com.google.gson.JsonObject jsonEntryObj51=new com.google.gson.JsonObject();

			jsonEntryObj6.addProperty("reference", "Procedure" + "/" + uuid9.toString());
			// jsonEntryObj41.addProperty("reference",
			// "MedicationRequest"+"/"+uuid7.toString());
			jsonEntry6.add(jsonEntryObj6);
			// jsonEntry4.add(jsonEntryObj41);
			jsonSectionObj6.add("entry", jsonEntry6);

			// section 7
			com.google.gson.JsonObject jsonSectionObj7 = new com.google.gson.JsonObject();
			jsonSectionObj7.addProperty("title", "Care Plan");

			com.google.gson.JsonObject jsonCode6 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding6 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj6 = new com.google.gson.JsonObject();
			jsonCoddingObj6.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj6.addProperty("code", "734163000");
			jsonCoddingObj6.addProperty("display", "Care Plan");
			jsonCodding6.add(jsonCoddingObj6);
			jsonCode6.add("coding", jsonCodding6);
			jsonSectionObj7.add("code", jsonCode6);

			UUID uuid10 = UUID.randomUUID();

			com.google.gson.JsonObject jsonEntryObj7 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry7 = new com.google.gson.JsonArray();
			// com.google.gson.JsonObject jsonEntryObj51=new com.google.gson.JsonObject();

			jsonEntryObj7.addProperty("reference", "CarePlan" + "/" + uuid10.toString());
			// jsonEntryObj41.addProperty("reference",
			// "MedicationRequest"+"/"+uuid7.toString());
			jsonEntry7.add(jsonEntryObj7);
			// jsonEntry4.add(jsonEntryObj41);
			jsonSectionObj7.add("entry", jsonEntry7);

			// section 8
			com.google.gson.JsonObject jsonSectionObj8 = new com.google.gson.JsonObject();
			jsonSectionObj8.addProperty("title", "Follow up");

			com.google.gson.JsonObject jsonCode7 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonCodding7 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonCoddingObj7 = new com.google.gson.JsonObject();
			jsonCoddingObj7.addProperty("system", "https://projecteka.in/sct");
			jsonCoddingObj7.addProperty("code", "736271009");
			jsonCoddingObj7.addProperty("display", "Follow up");
			jsonCodding7.add(jsonCoddingObj7);
			jsonCode7.add("coding", jsonCodding7);
			jsonSectionObj8.add("code", jsonCode7);

			UUID uuid11 = UUID.randomUUID();

			com.google.gson.JsonObject jsonEntryObj8 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray jsonEntry8 = new com.google.gson.JsonArray();
			// com.google.gson.JsonObject jsonEntryObj51=new com.google.gson.JsonObject();

			jsonEntryObj8.addProperty("reference", "Appointment" + "/" + uuid11.toString());
			// jsonEntryObj41.addProperty("reference",
			// "MedicationRequest"+"/"+uuid7.toString());
			jsonEntry8.add(jsonEntryObj8);
			// jsonEntry4.add(jsonEntryObj41);
			jsonSectionObj8.add("entry", jsonEntry8);

			jsonSection.add(jsonSectionObj);
			jsonSection.add(jsonSectionObj2);
			jsonSection.add(jsonSectionObj3);
			jsonSection.add(jsonSectionObj4);
			jsonSection.add(jsonSectionObj5);
			jsonSection.add(jsonSectionObj6);
			jsonSection.add(jsonSectionObj7);
			jsonSection.add(jsonSectionObj8);

			jsonresource.add("section", jsonSection);

			com.google.gson.JsonArray attester = new com.google.gson.JsonArray();
			com.google.gson.JsonObject attester1 = new com.google.gson.JsonObject();
			attester1.addProperty("mode", "official");
			attester1.addProperty("time", currentDate);

			com.google.gson.JsonObject party = new com.google.gson.JsonObject();
			party.addProperty("reference", "Organization" + "/" + hospitalDetails.getInitials());//MAX
			party.addProperty("display", hospitalDetails.getHospitalName());
			attester1.add("party", party);
			attester.add(attester1);
			jsonresource.add("attester", attester);

			jsonObjectFullUrl1.add("resource", jsonresource);
			enrtyArray.add(jsonObjectFullUrl1);
			// start second obj
			com.google.gson.JsonObject jsonObjectFullUrl2 = new com.google.gson.JsonObject();
			jsonObjectFullUrl2.addProperty("fullUrl", "Practitioner" + "/" + "MAX191101");

			com.google.gson.JsonObject resource2 = new com.google.gson.JsonObject();
			resource2.addProperty("resourceType", "Practitioner");
			resource2.addProperty("id", "MAX191101");

			com.google.gson.JsonArray identifier2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject identfier2Obj = new com.google.gson.JsonObject();
			identfier2Obj.addProperty("system", "https://www.mciindia.in/doctor");
			identfier2Obj.addProperty("value", "MAX191101");
			identifier2.add(identfier2Obj);

			resource2.add("identifier", identifier2);

			com.google.gson.JsonArray name2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name2obj = new com.google.gson.JsonObject();
			name2obj.addProperty("text",split[1]);

			com.google.gson.JsonArray prefix = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo2 = new com.google.gson.JsonObject();
//			demo2.addProperty("ar2", "Dr");
			demo2.addProperty("ar2", prefix3);
			JsonElement jsonElement3 = demo2.get("ar2");
			prefix.add(jsonElement3);

			com.google.gson.JsonArray suffix = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo3 = new com.google.gson.JsonObject();
//			demo3.addProperty("ar2", "MD");
			demo3.addProperty("ar2", specializationName);
			JsonElement jsonElement4 = demo3.get("ar2");
			suffix.add(jsonElement4);

			name2obj.add("prefix", prefix);
			name2obj.add("suffix", suffix);
			name2.add(name2obj);

			resource2.add("name", name2);

			jsonObjectFullUrl2.add("resource", resource2);

			enrtyArray.add(jsonObjectFullUrl2);
			// end second obj

			// Organization/MaxSaket

			com.google.gson.JsonObject jsonObjectFullUrl9 = new com.google.gson.JsonObject();
			jsonObjectFullUrl9.addProperty("fullUrl", "Organization" + "/" + hospitalDetails.getInitials());//MaxSaket01

			com.google.gson.JsonObject resource9 = new com.google.gson.JsonObject();
			resource9.addProperty("resourceType", "Organization");
			resource9.addProperty("id", hospitalDetails.getInitials());
			resource9.addProperty("name", hospitalDetails.getHospitalName());

			com.google.gson.JsonArray alias9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo = new com.google.gson.JsonObject();
			demo.addProperty("ar", hospitalDetails.getHospital_initial());
			JsonElement jsonElement1 = demo.get("ar");
			alias9.add(jsonElement1);
			resource9.add("alias", alias9);

			com.google.gson.JsonArray identifier9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonIdentifierFullUrl9 = new com.google.gson.JsonObject();
			jsonIdentifierFullUrl9.addProperty("system", hospitalDetails.getWebsite());
			jsonIdentifierFullUrl9.addProperty("value", "IN0410000183");
			identifier9.add(jsonIdentifierFullUrl9);
			resource9.add("identifier", identifier9);

			com.google.gson.JsonArray telecom9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsontelecomFullUrl9 = new com.google.gson.JsonObject();
			jsontelecomFullUrl9.addProperty("system", "phone");
			jsontelecomFullUrl9.addProperty("value", hospitalDetails.getHospitalContact());
			com.google.gson.JsonObject jsontelecomFullUrl91 = new com.google.gson.JsonObject();
			jsontelecomFullUrl91.addProperty("system", "fax");
			jsontelecomFullUrl91.addProperty("value", hospitalDetails.getHospitalFax());
			telecom9.add(jsontelecomFullUrl9);
			telecom9.add(jsontelecomFullUrl91);
			resource9.add("telecom", telecom9);

			com.google.gson.JsonArray addressArray8 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject address8 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray line9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject de = new com.google.gson.JsonObject();
			de.addProperty("ar", hospitalDetails.getHospitalAddress());
			JsonElement jsonElement = de.get("ar");
			line9.add(jsonElement);
			address8.add("line", line9);
			address8.addProperty("city", hospitalDetails.getHospitalCity());
			address8.addProperty("state", hospitalDetails.getHospitalState());
			address8.addProperty("postalCode", hospitalDetails.getHospitalZip());
			address8.addProperty("country", "INDIA");
			addressArray8.add(address8);
			resource9.add("address", addressArray8);

			com.google.gson.JsonArray endpoint9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject endpointobj9 = new com.google.gson.JsonObject();
			endpointobj9.addProperty("reference",
					hospitalDetails.getWebsite());
			endpointobj9.addProperty("display", "Website");
			endpoint9.add(endpointobj9);

			resource9.add("endpoint", endpoint9);

			jsonObjectFullUrl9.add("resource", resource9);

			enrtyArray.add(jsonObjectFullUrl9);

			// object nine end

			jsonObject.add("entry", enrtyArray);
			// start third obj

			com.google.gson.JsonObject jsonObjectFullUrl3 = new com.google.gson.JsonObject();
			jsonObjectFullUrl3.addProperty("fullUrl", "Patient" + "/" + patientID);

			com.google.gson.JsonObject resource3 = new com.google.gson.JsonObject();
			resource3.addProperty("resourceType", "Patient");
			resource3.addProperty("id", patientID);

			com.google.gson.JsonArray name3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name3obj = new com.google.gson.JsonObject();
			name3obj.addProperty("text", patientName);
			name3.add(name3obj);

			resource3.add("name", name3);
			resource3.addProperty("gender", sandBoxPatientInfo.getGender());

			jsonObjectFullUrl3.add("resource", resource3);

			enrtyArray.add(jsonObjectFullUrl3);

			// end third obj

			// Condition
			UUID uuidFullUrl15 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl5 = new com.google.gson.JsonObject();
			jsonObjectFullUrl5.addProperty("fullUrl", "Condition" + "/" + uuidFullUrl15.toString());

			com.google.gson.JsonObject resource5 = new com.google.gson.JsonObject();
			resource5.addProperty("resourceType", "Condition");
			resource5.addProperty("id", uuidFullUrl15.toString());

			com.google.gson.JsonObject clinicalstatus = new com.google.gson.JsonObject();
			com.google.gson.JsonArray codingArray = new com.google.gson.JsonArray();
			com.google.gson.JsonObject codingObj = new com.google.gson.JsonObject();
			codingObj.addProperty("system", "http://terminology.hl7.org/CodeSystem/condition-clinical");
			codingObj.addProperty("code", "recurrence");
			codingObj.addProperty("display", "recurrence");
			codingArray.add(codingObj);
			clinicalstatus.add("coding", codingArray);
			clinicalstatus.addProperty("text", "recurrence");
			resource5.add("clinicalStatus", clinicalstatus);

			com.google.gson.JsonArray category = new com.google.gson.JsonArray();
			com.google.gson.JsonObject category1 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coding = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coding1 = new com.google.gson.JsonObject();

			coding1.addProperty("system", "http://terminology.hl7.org/CodeSystem/condition-category");
			coding1.addProperty("code", "128944008");
			coding1.addProperty("display", "Bacterial infection due to Bacillus");
			coding.add(coding1);
			category1.add("coding", coding);
			category1.addProperty("text", "Encounter Diagnosis");
			category.add(category1);
			resource5.add("category", category);

			com.google.gson.JsonObject severity = new com.google.gson.JsonObject();
			severity.addProperty("text", "Mild");
			resource5.add("severity", severity);

			com.google.gson.JsonObject code = new com.google.gson.JsonObject();
			com.google.gson.JsonArray codding = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coddingObj = new com.google.gson.JsonObject();
			coddingObj.addProperty("system", "https://projecteka.in/sct");
			coddingObj.addProperty("code", "128944008");
			coddingObj.addProperty("display", "Bacterial infection due to Bacillus");
			codding.add(coddingObj);
			code.add("coding", coding);
			code.addProperty("text", "Bacterial infection due to Bacillus");
			resource5.add("code", code);

			com.google.gson.JsonObject subObject = new com.google.gson.JsonObject();
			subObject.addProperty("reference", "Patient" + "/" + patientID);
			resource5.add("subject", subObject);

			jsonObjectFullUrl5.add("resource", resource5);

			enrtyArray.add(jsonObjectFullUrl5);

			// object nine end

			jsonObject.add("entry", enrtyArray);

			// start Encounter
			UUID uuidFullUrl4 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl4 = new com.google.gson.JsonObject();
			jsonObjectFullUrl4.addProperty("fullUrl", "Encounter" + "/" + uuidFullUrl4.toString());

			com.google.gson.JsonObject resource4 = new com.google.gson.JsonObject();
			resource4.addProperty("resourceType", "Encounter");
			resource4.addProperty("id", uuidFullUrl4.toString());
			resource4.addProperty("status", "finished");

			com.google.gson.JsonObject class4 = new com.google.gson.JsonObject();
			class4.addProperty("system", "http://terminology.hl7.org/CodeSystem/v3-ActCode");
			class4.addProperty("code", "IMP");
			class4.addProperty("display", "Inpatient visit");

			resource4.add("class", class4);

			com.google.gson.JsonObject subject4 = new com.google.gson.JsonObject();
			subject4.addProperty("reference", "Patient/"+patientID);
			resource4.add("subject", subject4);

			com.google.gson.JsonObject period4 = new com.google.gson.JsonObject();
			period4.addProperty("start", currentDate);
			period4.addProperty("end", currentDate);
			resource4.add("period", period4);

			UUID uuidFullUrl21 = UUID.randomUUID();
			com.google.gson.JsonArray diagnosis = new com.google.gson.JsonArray();
			com.google.gson.JsonObject diagnosis1 = new com.google.gson.JsonObject();
			com.google.gson.JsonObject condition = new com.google.gson.JsonObject();
			condition.addProperty("reference", "Condition" + "/" + uuidFullUrl21.toString());
			diagnosis1.add("condition", condition);
			diagnosis.add(diagnosis1);

			resource4.add("diagnosis", diagnosis);

			jsonObjectFullUrl4.add("resource", resource4);

			enrtyArray.add(jsonObjectFullUrl4);

			// condition 2

			UUID uuidFullUrl17 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl7 = new com.google.gson.JsonObject();
			jsonObjectFullUrl7.addProperty("fullUrl", "Condition" + "/" + uuidFullUrl17.toString());
			com.google.gson.JsonObject resource6 = new com.google.gson.JsonObject();
			resource6.addProperty("resourceType", "Condition");
			resource6.addProperty("id", uuidFullUrl17.toString());

			com.google.gson.JsonArray category2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject category2Obj = new com.google.gson.JsonObject();
			com.google.gson.JsonArray codding1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject codding1Obj = new com.google.gson.JsonObject();
			codding1Obj.addProperty("system", "http://terminology.hl7.org/CodeSystem/condition-category");
			codding1Obj.addProperty("code", "problem-list-item");
			codding1Obj.addProperty("display", "problem list");
			codding1.add(codding1Obj);
			category2Obj.add("coding", codding1);
			category2Obj.addProperty("text", "problem list");
			category2.add(category2Obj);
			resource6.add("category", category2);

			com.google.gson.JsonObject severityObj = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coddingArray = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coddingObj1 = new com.google.gson.JsonObject();
			coddingObj1.addProperty("system", "https://projecteka.in/sct");
			coddingObj1.addProperty("code", "24484000");
			coddingObj1.addProperty("display", "Severe");
			coddingArray.add(coddingObj1);
			severityObj.add("coding", coddingArray);
			severityObj.addProperty("text", "Severe");
			resource6.add("severity", severityObj);

			com.google.gson.JsonObject code1 = new com.google.gson.JsonObject();
			code1.addProperty("text", "Toothache");
			resource6.add("code", code1);

			com.google.gson.JsonObject sub = new com.google.gson.JsonObject();
			sub.addProperty("reference", "Patient" + "/" + patientID);
			resource6.add("subject", sub);

			jsonObjectFullUrl7.add("resource", resource6);
			enrtyArray.add(jsonObjectFullUrl7);

			// AllergyIntolerance/example
			com.google.gson.JsonObject jsonObjectFullUrl10 = new com.google.gson.JsonObject();
			jsonObjectFullUrl10.addProperty("fullUrl", "AllergyIntolerance" + "/" + "example");
			com.google.gson.JsonObject resource10 = new com.google.gson.JsonObject();
			resource10.addProperty("resourceType", "AllergyIntolerance");
			resource10.addProperty("id", "example");

			com.google.gson.JsonObject clinicalStatus1 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coddingArray1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coddingObj2 = new com.google.gson.JsonObject();
			coddingObj2.addProperty("system", "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical");
			coddingObj2.addProperty("code", "active");
			coddingObj2.addProperty("display", "Active");
			coddingArray1.add(coddingObj2);
			clinicalStatus1.add("coding", coddingArray1);
			resource10.add("clinicalStatus", clinicalStatus1);

			com.google.gson.JsonObject verificationStatus = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coddingArray2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coddingObj3 = new com.google.gson.JsonObject();
			coddingObj3.addProperty("system", "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification");
			coddingObj3.addProperty("code", "confirmed");
			coddingObj3.addProperty("display", "Confirmed");
			coddingArray2.add(coddingObj3);
			verificationStatus.add("coding", coddingArray2);
			resource10.add("verificationStatus", verificationStatus);
			resource10.addProperty("type", "allergy");

			com.google.gson.JsonArray category3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject de1 = new com.google.gson.JsonObject();
			de1.addProperty("ar", "food");
			JsonElement jsonElement2 = de1.get("ar");
			category3.add(jsonElement2);
			resource10.add("category", category3);

			resource10.addProperty("criticality", "high");

			com.google.gson.JsonObject code2 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray codding2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject codding3 = new com.google.gson.JsonObject();
			codding3.addProperty("system", "http://snomed.info/sct");
			codding3.addProperty("code", "227493005");
			codding3.addProperty("display", "Cashew nuts");
			codding2.add(codding3);
			code2.add("coding", codding2);
			resource10.add("code", code2);

			com.google.gson.JsonObject patient = new com.google.gson.JsonObject();
			patient.addProperty("reference", "Patient" + "/" + patientID);
			resource10.add("patient", patient);

			resource10.addProperty("onsetString", "Past 1 year");

			com.google.gson.JsonObject asserter = new com.google.gson.JsonObject();
			asserter.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			asserter.addProperty("display", doctorname);
			resource10.add("asserter", asserter);

			com.google.gson.JsonArray note = new com.google.gson.JsonArray();
			com.google.gson.JsonObject note1 = new com.google.gson.JsonObject();
			note1.addProperty("text",
					"The criticality is high becasue of the observed anaphylactic reaction when challenged with cashew extract.");
			note.add(note1);
			resource10.add("note", note);

			jsonObjectFullUrl10.add("resource", resource10);
			enrtyArray.add(jsonObjectFullUrl10);

			// AllergyIntolerance/medication
			com.google.gson.JsonObject jsonObjectFullUrl11 = new com.google.gson.JsonObject();
			jsonObjectFullUrl11.addProperty("fullUrl", "AllergyIntolerance" + "/" + "medication");
			com.google.gson.JsonObject resource11 = new com.google.gson.JsonObject();
			resource11.addProperty("resourceType", "AllergyIntolerance");
			resource11.addProperty("id", "medication");

			com.google.gson.JsonObject clinicalStatus = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coding2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coding3 = new com.google.gson.JsonObject();
			coding3.addProperty("system", "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical");
			coding3.addProperty("code", "active");
			coding3.addProperty("display", "Active");
			coding2.add(coding3);
			clinicalStatus.add("coding", coding2);
			resource11.add("clinicalStatus", clinicalStatus);

			com.google.gson.JsonArray category4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject category5 = new com.google.gson.JsonObject();
			category5.addProperty("ar", "medication");
			JsonElement jsonElement5 = category5.get("ar");
			category4.add(jsonElement5);
			resource11.add("category", category4);

			resource11.addProperty("criticality", "high");

			com.google.gson.JsonObject code3 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coding4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coding5 = new com.google.gson.JsonObject();
			coding5.addProperty("system", "http://www.nlm.nih.gov/research/umls/rxnorm");
			coding5.addProperty("code", "7980");
			coding5.addProperty("display", "Penicillin G");
			coding4.add(coding5);
			code3.add("coding", coding4);
			resource11.add("code", code3);

			com.google.gson.JsonObject patient1 = new com.google.gson.JsonObject();
			patient1.addProperty("reference", "Patient" + "/" + patientID);
			resource11.add("patient", patient1);

			resource11.addProperty("onsetString", "Past 2 year");

			com.google.gson.JsonObject asserter1 = new com.google.gson.JsonObject();
			asserter1.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			asserter1.addProperty("display", doctorname);
			resource11.add("asserter", asserter1);

			jsonObjectFullUrl11.add("resource", resource11);
			enrtyArray.add(jsonObjectFullUrl11);

			// Observation
			UUID uuidFullUrl18 = UUID.randomUUID();

			com.google.gson.JsonObject jsonObjectFullUrl12 = new com.google.gson.JsonObject();
			jsonObjectFullUrl12.addProperty("fullUrl", "Observation" + "/" + uuidFullUrl18.toString());
			com.google.gson.JsonObject resource12 = new com.google.gson.JsonObject();
			resource12.addProperty("resourceType", "Observation");
			resource12.addProperty("id", uuidFullUrl18.toString());
			resource12.addProperty("status", "final");

			com.google.gson.JsonObject code4 = new com.google.gson.JsonObject();
			code4.addProperty("text", "Temperature");
			resource12.add("code", code4);

			resource12.addProperty("effectiveDateTime", currentDate);

			com.google.gson.JsonObject valueQuantity = new com.google.gson.JsonObject();
			valueQuantity.addProperty("value", 99.5);
			valueQuantity.addProperty("unit", "C");
			resource12.add("valueQuantity", valueQuantity);

			jsonObjectFullUrl12.add("resource", resource12);
			enrtyArray.add(jsonObjectFullUrl12);

			// Observation1

			UUID uuidFullUrl19 = UUID.randomUUID();

			com.google.gson.JsonObject jsonObjectFullUrl13 = new com.google.gson.JsonObject();
			jsonObjectFullUrl13.addProperty("fullUrl", "Observation" + "/" + uuidFullUrl19.toString());
			com.google.gson.JsonObject resource13 = new com.google.gson.JsonObject();
			resource13.addProperty("resourceType", "Observation");
			resource13.addProperty("id", uuidFullUrl19.toString());
			resource13.addProperty("status", "final");

			com.google.gson.JsonObject code5 = new com.google.gson.JsonObject();
			code5.addProperty("text", "pulse");
			resource13.add("code", code5);

			resource13.addProperty("effectiveDateTime", currentDate);
			resource13.addProperty("valueString", "72 bpm");

			jsonObjectFullUrl13.add("resource", resource13);
			enrtyArray.add(jsonObjectFullUrl13);

			// Condition
			UUID uuidFullUrl20 = UUID.randomUUID();

			com.google.gson.JsonObject jsonObjectFullUrl14 = new com.google.gson.JsonObject();
			jsonObjectFullUrl14.addProperty("fullUrl", "Condition" + "/" + uuidFullUrl20.toString());
			com.google.gson.JsonObject resource14 = new com.google.gson.JsonObject();
			resource14.addProperty("resourceType", "Condition");
			resource14.addProperty("id", uuidFullUrl20.toString());

			com.google.gson.JsonObject code6 = new com.google.gson.JsonObject();
			code6.addProperty("text", "inflammation");
			resource14.add("code", code6);

			com.google.gson.JsonObject subject = new com.google.gson.JsonObject();
			subject.addProperty("reference", "Patient" + "/" + patientID);
			resource14.add("subject", subject);
			jsonObjectFullUrl14.add("resource", resource14);
			enrtyArray.add(jsonObjectFullUrl14);

			// MedicationRequest
			UUID uuidFullUrl22 = UUID.randomUUID();

			com.google.gson.JsonObject jsonObjectFullUrl15 = new com.google.gson.JsonObject();
			jsonObjectFullUrl15.addProperty("fullUrl", "MedicationRequest" + "/" + uuidFullUrl22.toString());
			com.google.gson.JsonObject resource15 = new com.google.gson.JsonObject();
			resource15.addProperty("resourceType", "MedicationRequest");
			resource15.addProperty("id", uuidFullUrl22.toString());
			resource15.addProperty("status", "active");
			resource15.addProperty("intent", "order");

			com.google.gson.JsonObject medicationCodeableConcept = new com.google.gson.JsonObject();
			medicationCodeableConcept.addProperty("text", "ibuprofen 500 mg");
			resource15.add("medicationCodeableConcept", medicationCodeableConcept);

			com.google.gson.JsonObject subject1 = new com.google.gson.JsonObject();
			subject1.addProperty("reference", "Patient" + "/" + patientID);
			resource15.add("subject", subject1);

			resource15.addProperty("authoredOn", currentDate);

			com.google.gson.JsonObject requester = new com.google.gson.JsonObject();
			requester.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			resource15.add("requester", requester);

			UUID uuidFullUrl23 = UUID.randomUUID();
			com.google.gson.JsonArray reasonReference = new com.google.gson.JsonArray();
			com.google.gson.JsonObject reasonReference1 = new com.google.gson.JsonObject();
			reasonReference1.addProperty("reference", "Condition" + "/" + uuidFullUrl23.toString());
			reasonReference.add(reasonReference1);
			resource15.add("reasonReference", reasonReference);

			com.google.gson.JsonArray dosageInstruction = new com.google.gson.JsonArray();
			com.google.gson.JsonObject dosageInstruction1 = new com.google.gson.JsonObject();
			dosageInstruction1.addProperty("text", "1 tablet 3 times a day");
			dosageInstruction.add(dosageInstruction1);
			resource15.add("dosageInstruction", dosageInstruction);

			jsonObjectFullUrl15.add("resource", resource15);
			enrtyArray.add(jsonObjectFullUrl15);

			//fetch prescription record from patient
			
			List<OPDPrescriptionDtoSP> allPrescriptionsByTreatmentId = prescriptionService.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
			int count = 1;
		for (OPDPrescriptionDtoSP pobj : allPrescriptionsByTreatmentId) {
			
			// Medication
			UUID uuidFullUrl24 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl16 = new com.google.gson.JsonObject();
			jsonObjectFullUrl16.addProperty("fullUrl", "Medication" + "/" + uuidFullUrl24.toString());
			com.google.gson.JsonObject resource16 = new com.google.gson.JsonObject();
			resource16.addProperty("resourceType", "Medication");
			resource16.addProperty("id", uuidFullUrl24.toString());

			com.google.gson.JsonObject code7 = new com.google.gson.JsonObject();
			code7.addProperty("text", pobj.getMedicineName());
			resource16.add("code", code7);

			jsonObjectFullUrl16.add("resource", resource16);
			enrtyArray.add(jsonObjectFullUrl16);

			// MedicationRequest
			UUID uuidFullUrl25 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl17 = new com.google.gson.JsonObject();
			jsonObjectFullUrl17.addProperty("fullUrl", "MedicationRequest" + "/" + uuidFullUrl25.toString());
			com.google.gson.JsonObject resource17 = new com.google.gson.JsonObject();
			resource17.addProperty("resourceType", "MedicationRequest");
			resource17.addProperty("id", uuidFullUrl25.toString());
			resource17.addProperty("status", "active");
			resource17.addProperty("intent", "order");

			UUID uuidFullUrl26 = UUID.randomUUID();

			com.google.gson.JsonObject medicationReference = new com.google.gson.JsonObject();
			medicationReference.addProperty("reference", "Medication" + "/" + uuidFullUrl26.toString());
			resource17.add("medicationReference", medicationReference);

			com.google.gson.JsonObject subject2 = new com.google.gson.JsonObject();
			subject2.addProperty("reference", "Patient" + "/" + patientID);
			resource17.add("subject", subject2);

			resource17.addProperty("authoredOn", currentDate);

			com.google.gson.JsonObject requester1 = new com.google.gson.JsonObject();
			requester1.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			resource17.add("requester", requester1);

			com.google.gson.JsonArray dosageInstruction2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject dosageInstruction3 = new com.google.gson.JsonObject();
			dosageInstruction3.addProperty("text", pobj.getInstructionName());
			dosageInstruction2.add(dosageInstruction3);
			resource17.add("dosageInstruction", dosageInstruction2);

			jsonObjectFullUrl17.add("resource", resource17);
			enrtyArray.add(jsonObjectFullUrl17);
			
		}

			// Practitioner

			com.google.gson.JsonObject jsonObjectFullUrl18 = new com.google.gson.JsonObject();
			jsonObjectFullUrl18.addProperty("fullUrl", "Practitioner" + "/" + "MAX1234");

			com.google.gson.JsonObject resource18 = new com.google.gson.JsonObject();
			resource18.addProperty("resourceType", "Practitioner");
			resource18.addProperty("id", "MAX1234");

			com.google.gson.JsonArray identifier3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject identfier3Obj = new com.google.gson.JsonObject();
			identfier3Obj.addProperty("system", "https://www.mciindia.in/doctor");
			identfier3Obj.addProperty("value", "MAX1234");
			identifier3.add(identfier3Obj);

			resource18.add("identifier", identifier3);

			com.google.gson.JsonArray name4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name4obj = new com.google.gson.JsonObject();
			name4obj.addProperty("text", "Manju Sengar");

			com.google.gson.JsonArray prefix1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo4 = new com.google.gson.JsonObject();
			demo4.addProperty("ar2", "Dr");
			JsonElement jsonElement6 = demo4.get("ar2");
			prefix1.add(jsonElement6);

			com.google.gson.JsonArray suffix3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo5 = new com.google.gson.JsonObject();
			demo5.addProperty("ar2", "MD");
			JsonElement jsonElement7 = demo5.get("ar2");
			suffix3.add(jsonElement7);

			name4obj.add("prefix", prefix1);
			name4obj.add("suffix", suffix3);
			name4.add(name4obj);

			resource18.add("name", name4);

			jsonObjectFullUrl18.add("resource", resource18);
			enrtyArray.add(jsonObjectFullUrl18);

			// DocumentReference
			UUID uuidFullUrl27 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl19 = new com.google.gson.JsonObject();
			jsonObjectFullUrl19.addProperty("fullUrl", "DocumentReference" + "/" + uuidFullUrl27.toString());
			com.google.gson.JsonObject resource19 = new com.google.gson.JsonObject();
			resource19.addProperty("resourceType", "DocumentReference");
			resource19.addProperty("id", uuidFullUrl27.toString());
			resource19.addProperty("status", "current");

			com.google.gson.JsonObject type = new com.google.gson.JsonObject();
			com.google.gson.JsonArray codding4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject codding5 = new com.google.gson.JsonObject();
			codding5.addProperty("system", "https://projecteka.in/loinc");
			codding5.addProperty("code", "30954-2");
			codding5.addProperty("display", "Surgical Pathology Report");
			codding4.add(codding5);
			type.add("coding", codding4);
			resource19.add("type", type);

			com.google.gson.JsonArray auther = new com.google.gson.JsonArray();
			com.google.gson.JsonObject auther1 = new com.google.gson.JsonObject();
			auther1.addProperty("reference", "Practitioner" + "/" + "MAX1234");
			auther.add(auther1);
			resource19.add("author", auther);

			com.google.gson.JsonArray content = new com.google.gson.JsonArray();
			com.google.gson.JsonObject content1 = new com.google.gson.JsonObject();
			com.google.gson.JsonObject attachment = new com.google.gson.JsonObject();
			attachment.addProperty("contentType", "application" + "/" + "pdf");
			//attachment.addProperty("data","SlZCRVJpMHhMak1LSmNUbDh1WHJwL09nME1UR0NqUWdNQ0J2WW1vS1BEd2dMMHhsYm1kMGFDQTFJREFnVWlBdgpSbWxzZEdWeUlDOUdiR0YwWlVSbFkyOWtaU0ErUGdwemRISmxZVzBLZUFHdFdkdFMyMVlVZmZkWG5MNjB3SlNECnprMDZ5aHNFT2swblVBaWVhVHFsRDhJSVVHdGJZTXZUcEpuK2U5ZlcvVWFuT2lUTTJDYkcrN0wyMmxjL3N5djIKekR6dVNlVXJvUVBtTVJNYUxxVlZ6R3JCclEwdDI4VHNGN2JHMzlWdmVmaTcrdTMycDJlTEZUdDZ0eExzTklYawpvN2Rid1JaYnlGZlM0RkVHK1NORWJoY1FwejNGbGVmaC8vQ2pmTTIxOEN3VFduTVBtdkIyeUFNclJTbFQxakpsCklWT0VmaWxIZXR4WWJYTTV4dm93M3hmTWV0eTNLbEJNUUxMMHZKQXRWalBZcGdvNXp5eVVYRmdaa3M4ZUUvREMKU2lPWUNqVStKMWtnRExlUWlrK1JSN3JXWG5va1F6dnp1QWg4K0NWTVVGZ3lTYVNwUmNwWkRsTHRrTzl4SFJxdgpzRXdhSGtwZis0MUQybGdlR0sxSzAveGFEcGtHb3pSUUJOaEtrR20rS1V5YkpqT0F6TmtWUHE4OFNZODZ4S00yCm9Zc3NXOGdDR2ZxQkU0SGhnVlJGNEh6QnBURGdTUjA0Y0pLSGl1SkdFUWdiTnd1NHBDRHNsY3hOdyt1Y1U1TkUKQ20rVzgxU3grUVo4Rk56elBFbXVFaUhxWDlySkFWTk81aUJMeVJrbUxlVUlDM3h5WkRhSG9mTzVZSUxONzluZQphYnJJVXY3ZGx1MnorUi9zYko2bldpUDJ2M1hNUWw3a0JUMHJDUzI2MU1LNldpNmlWVHhOQWVWVDF3a2p1ZkpaCm9Ja3VQZkZYdTJpWjNDZUxLRXZTOVVSUFNrVUZuaUZUQXM3REM1UVZaRzdYaTV1OStJR2ZuNXhjZisrbW80bUkKUW5JZ2U2RkU2cDZTODlPYmZTZW8yckZBSlNHVS9GQncwL2ZpaDkxeTZXWi9SNE1JeWZaUkRjZDNkNXQ0dTMwMQpTdEtFcUNyak90Nm02eXhhWk5zM2JxNmdraGJNelY4b3owZG1RSkhrZmo4ZU4zdFp2TXdEZ3F5UlJkYjh4dmErCjJaOEo1TlR2YlA1VE81MmU3c0hBMk0ybU5yd0tsUkJzSjNpQlFKZUdGeWwzVTlCek9yQXZxamc3WEVXSkkwc0UKS2pxVkRjRTBjZ2tOYjlTSk9GdndBdGIvWFhQcWt0QU9uVFRvUEQ0ek5rUkQ3QUgxMTFqWUdNSTI2NGN0ZVhqTQpEaWFDU2hYL1pENXJrbHFHaXFQVEdqd05XSFRnbE5LTmJJRkdMNWxSZG9RT3FLMFRUYStRckNNbHRNRmtNUzQvCnZYZVVYdmNmVEI0VW5GSHJ6K083WkpHNHBrelJsQzJqZW9kc05GcHkwMCtYcVhFdHdXbEUreFJPRWcwTjNVeDAKRk4yRVZRckpYNUw5YXNab2FzZEdnSlI5U0s2elRieCt5QjRkSzNTN1VBblVhQUZtanFtNVM3ZlJneXMzRy9aUQpQaUcyWXhxUzlUYmI3QmJVOWgxOWFjVkNGeXdkMDNPMzI3eGl0bWpwc0JpS0NTMXNEMzB5ZmV1YVpwMXlHRnIrCkFsWlpta1d1SmIzYkxTV3lESFVPVHZSOWVONUY2eXpKUGp1NkFybEY3NkFYMlBWb3dqREMwa0RXUzd3RHQ0SmEKVFhsQysxUW9BdUVqL2JxaVA4UVBhOWYrMnRUVEFQdFpMaDROb1N2Ly9rdkszempsZGp2dFZPam4wN0FJcU1OMgpOZkRxbjFzVUtveTB6Q3NIclppRHp2cmwrUDM3bnkrUDV6LysrcytyWGRIb0RwaTlzSndNdXVacGxNVnVXRFVwClp4Vk53alFmcUg0WlBINklIWlBPbGtTbFo0RXBoM2c2cHVFNi91U0dUNTRHSVN1TngyMEFOYlliNVE5dWtqdkEKNUMwVCswNmZRY0p4TWl0NnByRE1vbGt5alNSQUIrcWFMVjFMa0twcUE3MG94aUdOelh3d0hSL2VwWWRPbU1QcwpmRzdOcmRlYWFZemdmV0RVemI1YlVqV3dDeXFiSkIycldUK21oNjdDSzJ5b1RndnM0YUQ2bVBuTzBOVE5XSU9LCnFNWmE0ZzdXRDIxK1NqaWFla21vOXUvU0JTcHl4c3NiektpU2JmS3dqckxkeHUyYzBDNmhHcjBZbFFIblBKcmEKdXl5OXpxTFZreHVMT3ExU1NOUm5qWE5kWDhIcHUrdkxzNHZyczFNbkpkVnNpalNEZE5vN2hoM1NqVXB0Z0lDUAp4TzBvSEViNk10MStwVmxDb0x0amZJZVNRUkdLaWl2Q1ViR0xMcy9UMjJSWlJSMVh2MG1Yc0haK2xLQmh1c2puCitWbnJHSGF4VzkzR200bklGWHNnMHE0Y1hmQUtMUWZJK1FFU3ZYZHVPemk0VDEwVjFFa29ETTZjUUMxM29hZmcKTXNKQ0ZXV2JaREhkalZubjRDWXdTbUpXeFZWM2VLUzZ4RFNjTTdkM0U2SGxPcitKdEZGZFoxTnJRZzFwRlRlYQpCNlVDRTJFT1dObnorV0RxTkZqSzc1QmRFZ05KaDllUFdUTDFwRmlaM3lrRnVDMEJHOXlSTVUzMTdGOUVUOG4wCmZDcTA0UDVRZ1ZRVS8veVNWYWpwRmJWbG5HWHhabW9zcWx0QlZ3MGQ5LzNTbTU2YWRMMzg3RlRWdXA0Z1RSRVEKWWMxZ1FqOVAxc2xxdDVySTcycXRMOUhLSnplSlI1ejBvR05RUDdmSjM0NmJhNXRWK0xLS2ttZk1pNjl4VnJIQQpaa3gyOXVob2UydE13V3lGc1YvZ2k2ckI2UG1FNis1aWt6eTk0dHBlUm9Hd3dsZEFOQkNSSDRNK2ZMdU0xbis2CkJib2RCZ202dnFSaSs1anVsbmR1T2hxNFpKZ2ZvTWFkY0F4RzJ3UGw1ZXNSaFdPdzc5M3NSYTVqYWJYcktYdzUKQ2ZCSG95MjBHempWa0tKVWZ1d1lsZjNSVFhTRHU5S1V2eU1jbFFMbldhY3kxSUU5UUtjbGJ1cmg5dmpsMkxncAo2Tlk1aFRIcmhUeWpHblN6NzdpaWRyVm9MQVZZbGNpUjRUSi82MHFmOWhxczBkbFFLVVlaK3RGeDZhc29wSFYrCjl4NlYvY2t0Q0IzVDhSMUN5ZjVCY3JtYTNtYVI5bkZ0S3JKcklOK1ZwUjM3MFN0ZnNwODR4SnM4dVBvWENqY04KbFFwbGJtUnpkSEpsWVcwS1pXNWtiMkpxQ2pVZ01DQnZZbW9LTVRjNU5RcGxibVJ2WW1vS01pQXdJRzlpYWdvOApQQ0F2Vkhsd1pTQXZVR0ZuWlNBdlVHRnlaVzUwSURNZ01DQlNJQzlTWlhOdmRYSmpaWE1nTmlBd0lGSWdMME52CmJuUmxiblJ6SURRZ01DQlNJQzlOWldScFlVSnZlQ0JiTUNBd0lEVTVOUzR5TnpVMklEZzBNUzQ0T0RrNFhRbysKUGdwbGJtUnZZbW9LTmlBd0lHOWlhZ284UENBdlVISnZZMU5sZENCYklDOVFSRVlnTDFSbGVIUWdMMGx0WVdkbApRaUF2U1cxaFoyVkRJQzlKYldGblpVa2dYU0F2UTI5c2IzSlRjR0ZqWlNBOFBDQXZRM014SURFeElEQWdVZ292ClEzTXlJREUwSURBZ1VpQStQaUF2Um05dWRDQThQQ0F2VkZReElESTVJREFnVWlBdlZGUXlJRE13SURBZ1VpQSsKUGlBdldFOWlhbVZqZENBOFBDQXZTVzB4TUNBeU55QXdJRklLTDBsdE1pQTVJREFnVWlBdlNXMDNJREl4SURBZwpVaUF2U1cwNElESXpJREFnVWlBdlNXMDFJREUzSURBZ1VpQXZTVzB4SURjZ01DQlNJQzlKYlRRZ01UVWdNQ0JTCklDOUpiVE1LTVRJZ01DQlNJQzlKYlRrZ01qVWdNQ0JTSUM5SmJUWWdNVGtnTUNCU0lENCtJRDQrQ21WdVpHOWkKYWdveU55QXdJRzlpYWdvOFBDQXZUR1Z1WjNSb0lESTRJREFnVWlBdlZIbHdaU0F2V0U5aWFtVmpkQ0F2VTNWaQpkSGx3WlNBdlNXMWhaMlVnTDFkcFpIUm9JRFE0T0NBdlNHVnBaMmgwSURFM01DQXZTVzFoWjJWTllYTnJDblJ5CmRXVWdMMGx1ZEdWeWNHOXNZWFJsSUhSeWRXVWdMMEpwZEhOUVpYSkRiMjF3YjI1bGJuUWdNU0F2Um1sc2RHVnkKSUM5R2JHRjBaVVJsWTI5a1pTQStQZ3B6ZEhKbFlXMEtlQUh0MExFSkFBQUlBMEgzSDFwZHdDNWdkZW1md00wWQpBUUovQWwzQlZ4UUh2MUlDQkFnUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDQkFnUUlFQ0FBQUVDCkJBZ2NBZ3ZuWjFuWENtVnVaSE4wY21WaGJRcGxibVJ2WW1vS01qZ2dNQ0J2WW1vS09ERUtaVzVrYjJKcUNqa2cKTUNCdlltb0tQRHdnTDB4bGJtZDBhQ0F4TUNBd0lGSWdMMVI1Y0dVZ0wxaFBZbXBsWTNRZ0wxTjFZblI1Y0dVZwpMMGx0WVdkbElDOVhhV1IwYUNBeE1USXdJQzlJWldsbmFIUWdNVEF4TWdvdlNXMWhaMlZOWVhOcklIUnlkV1VnCkwwbHVkR1Z5Y0c5c1lYUmxJSFJ5ZFdVZ0wwSnBkSE5RWlhKRGIyMXdiMjVsYm5RZ01TQXZSbWxzZEdWeUlDOUcKYkdGMFpVUmxZMjlrWlFvK1BncHpkSEpsWVcwS2VBSHQzYzl1MjhnZHdIRXFCSlo3Q0RUWTJ4NE1FZnNHN1UwRgpETStyTk9nTDdONWNJRmdwRUJCZWl2QVIvQ295Q0lTMzloVklETEM1RlVPNGgzRTc1ZlJIS3Y1VHV6NjB5WEttCndKZUFETXB5Tk45OCtFK1I0RWtJTEY5WHdPKys3dk45eWJNNWFhbUdMM21HTC8yem1iNTdocWtsajl1aXBwWmEKYms1dVVWdkdzcnBybVVoVy9YUXYwaktXelRUeTVISnE4WHE4ME5QbVduNFp5OTRydjg2c3NyblB3N2Q5Vnh3egoxWlhMbDRRd2x0Ym05bFhXRlYzcDhsRmE4bjFXTlBOT3RIU1B0UFRYL2FlNmFicGdnMy85SmpTSHc4ZGkzb2tpCnRCd0c0K3ZXOU5MeTl6TnBxZHBHdFV0M3pPT1Z0ckw1cUtxaGtaWng4MFBjbHRZV29aNWEzRzdjZk9mem9tMnkKSXBKTGE2dFExOUxpVlZEZjJYZ3RzdS9ldDRRaXFGVi9LTnBEbE1OSWp1bSt1bk1KVFZEdm1xWm84emd0UVZxRwpnK3d2dlp4L3pkd2l4OUYwR2w1KzhXVlQ5ZVlYVlpsVHkzVXpIZE5SVGkvQmwxVmpwS1U1dFpTOU9VakxmSTFhCkhrWXVQbm4zemFvclRKQmp1NVJyUU51YUxzNHhuV2xYdU9MbzFFMXdLbHdOVG9kUDAxcWtwWnoyV2hZRUVFQUEKQVFRUVFBQUJCQkJBQUFFRUVFQUFBUVFRUUFDQi8xZUJxQi9aUDBGTHFlWDJTVnZNdS8rTU9UaGpJNEFBQWdnZwpnQUFDQ0NDQUFBSUlJSUFBQWdnZzhPc0szUHk2VC85ZlBUc3QvNWtycGJkdXAxLy9TbVh4cVlSSVIwb3Q0eTRkCm1GR24weEpTYXJsS3lDV2xsb1JZU0VFQUFRUVFRQUFCQkJCQUFBRUVFRWhGb0V6bnQraEhGV21haFlkdGNkU2YKMTMwUnZXVi9ON2RDQWkzdjcrYWM4SGxzRjYvdUpnWnhlU096eTBSZFZPVjBwMlNhTVdteHVVd0NGSEZSbFMyUAo2NmxsMVhUUlc0NHEyM3hUQnZkRDAvVHp6RjdSWkZSUlZadXpzZ3oyTjNrVmM2b3pFVmdyMVc3T3RKcGJvdTR0CklXUWI5WEZ1OGR1OGlOMXl0bjYxT1JjWGZ4NjlaWDJXNWFtMEtGV0U3TzNrY3BFWFhiUkRhQjVZMVdyTXZMUTQKYVlsOEhLbEtqWHB1MGE4T2ZZajYyeENxVldQcDlWcHV1Wnpzb2g1SnFxbkc3SHh1T1hSRjdKWmpsbTNtbHNhcQpQdXBIc01wMHIwdDVyYUJsVC9hN2VYZU8rTVdkNnpyaThQOCt0RStveGNuWkpaVmx6TXBVVXVSYXJkTnBpWHdaClNnZUNFZ1FRUUFBQkJCQkFBQUVFRUVBQUFRUVFRQUFCQkJCQUFBRUVFRUFBQVFRUVFBQUJCQkJBQUFFRUVFQUEKQVFRUVFBQUJCQkJBQUFFRUVFQUFBUVFRUUFBQkJCQkFBQUVFRUVBQUFRUyt2c0NZN2I3K2svNlB6NWpTM0F2KwpRdWFrU0dTNkRxOWw3ak5hbnUxVlhqZmR6NWt2bnowUTRSdGVtK01tczBVSzh5cEtTNnZ5TG9rV3AwMm9hMk5TCmNEbTF0Q21rQktkN2NVbW14Y3NNZGJHbmVKeVAybEdPSTZXT2VZUkQrTm1RbzI3MjBsSStleURDTjZSRnlUYUsKTVBMeklVZGR5YXh3dER5VmtabnBhbFYvQ2luOGQxdyswM3UxLzF1VHdrRXRyekdQNnVqeUpFNjhRYVlON0dOUApJUHQweitFK0FnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJCklJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUEKQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZwpnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDCkNDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0EKQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSQpJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBCkFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2cKZ0FBQ0NDQ0FBQUlJSUlBQUFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2dnZ0FBQwpDQ0NBQUFJSUlJQUFBZ2k4S0dCZWZHVDVCK2FXY3ZseEgwYmMzNC8rcUNVUzBWNU5YVnB1N2QxS0NNMjB1dnhTCkgyVE1VY3VYdWVVVUVLdGwyaDV6eTE5T0hkUFhxZVdxZnJpLzBKb2FaS0JSdXhDVURiNE1tWDduaXYxdm5kMnMKRmlwNEdFWU5Ucm52ODY3YzYwN2I5VVcyeld3K3RaeDkvL0JEQzYzVnp1YmR0L2xlN1hmdmRmL244MHUzdmVuTgo0RHIzZHJkUXd2MHd0VE9tK1pOV2RSWHFZTVp6N3k1M2c3VDB6aS9lb2x6YlY2TXVXeFZLYWRuNndjOHRKazdMClVMdnpzaTJmdHRnWUxsT0xscFlxZE9QV0RlNXRMdHZJMkN4Q1N6WFVkbTY1RHU1aWV6bTR5MVBML1M2MTJJcXkKOVZEN2VSdlozYmplcmdiL3hrd3VickdFKzRIVUlDM2p4YlMvZUIwK2JQUEIvNkZ2Qmh1blJiYlJxV1hVNGVNMgp4R3pwcDJONmRqbTEzSXFMR1RyamR2ZDJTNjNVVFdQYXY4cTU3bXE2UW43WXJtNzltK3Z1TWpQK2JQR1lmZEczCnpZZnlmWGtWc2wyMzNtWi85RCt1N1BiMU1HWkxjZHlQc3k5dDBhblZVVnIyb1N1My9uZkJhWGNoSmpmM1A3UFUKeW5IbmxkT0g2U1JyZ3Q5WjJWQ3BMQ20xUkxnaXZyZ1ozTzkzTHo2MjlBTisrYVBuNWIvaXA1Y2ZpdnJJOHY4UwppUHJYWlhBRUVFQUFnUlFFRXJvbyt1WGZobnB4QzdqVjhxKzFYNHJwNUtWM0trdWZVTXNnYjBxcFVMZmhFRi9ICmh1TTIvNlZZMmMvNzhQUldhNnhGV2k3ZmRGbG1mNHhWOERDdTArWWZRMjh2Ty9md3ZWaHJvekxoZG40dmRSY3IKNFdIYzRwQk95N1VKNzhSRjN0NTk2SXUxMWh1L2FoSnBrWGN1ZjJxVGFSbUdhdm9jSUlGdDVNek42VE9KV0R2SgpvM0UvdHd3Sm5GK0NOY1AwdVpIOTZWRmZwRlhiOS9aNmFrbmdOWlhON1habGJ2MVFSTUo0Tk94WStKKzEzSTk1CmZYNlVNNitlV2xMWWdlOWNicDhtUnJtZjNqYjZ6UEF2ZUEwMnVncGxibVJ6ZEhKbFlXMEtaVzVrYjJKcUNqRXcKSURBZ2IySnFDakl4TVRrS1pXNWtiMkpxQ2pJeElEQWdiMkpxQ2p3OElDOU1aVzVuZEdnZ01qSWdNQ0JTSUM5VQplWEJsSUM5WVQySnFaV04wSUM5VGRXSjBlWEJsSUM5SmJXRm5aU0F2VjJsa2RHZ2dNVFk0SUM5SVpXbG5hSFFnCk56SWdMMGx0WVdkbFRXRnphd3AwY25WbElDOUpiblJsY25CdmJHRjBaU0IwY25WbElDOUNhWFJ6VUdWeVEyOXQKY0c5dVpXNTBJREVnTDBacGJIUmxjaUF2Um14aGRHVkVaV052WkdVZ1BqNEtjM1J5WldGdENuZ0IrLzkvRk5BbwpCUDR4UXd3K1lJOWtBZkdDU0pwR21hTWhNQm9Db3lGQVFRZ0FBQ3ZYM0hBS1pXNWtjM1J5WldGdENtVnVaRzlpCmFnb3lNaUF3SUc5aWFnbzBNQXBsYm1Sdlltb0tNak1nTUNCdlltb0tQRHdnTDB4bGJtZDBhQ0F5TkNBd0lGSWcKTDFSNWNHVWdMMWhQWW1wbFkzUWdMMU4xWW5SNWNHVWdMMGx0WVdkbElDOVhhV1IwYUNBeE5qZ2dMMGhsYVdkbwpkQ0EzTWlBdlNXMWhaMlZOWVhOckNuUnlkV1VnTDBsdWRHVnljRzlzWVhSbElIUnlkV1VnTDBKcGRITlFaWEpECmIyMXdiMjVsYm5RZ01TQXZSbWxzZEdWeUlDOUdiR0YwWlVSbFkyOWtaU0ErUGdwemRISmxZVzBLZUFINy8zOFUKakliQWFBaU1oc0JnQ0lFL3pHQlhQSkJIZGd4VThBQ0s0RCtJeXMvMnlDcEgyVGhEQUFCRUFOeC9DbVZ1WkhOMApjbVZoYlFwbGJtUnZZbW9LTWpRZ01DQnZZbW9LTkRnS1pXNWtiMkpxQ2pFM0lEQWdiMkpxQ2p3OElDOU1aVzVuCmRHZ2dNVGdnTUNCU0lDOVVlWEJsSUM5WVQySnFaV04wSUM5VGRXSjBlWEJsSUM5SmJXRm5aU0F2VjJsa2RHZ2cKTWpVMklDOUlaV2xuYUhRZ01qZ2dMMGx0WVdkbFRXRnphd3AwY25WbElDOUpiblJsY25CdmJHRjBaU0IwY25WbApJQzlDYVhSelVHVnlRMjl0Y0c5dVpXNTBJREVnTDBacGJIUmxjaUF2Um14aGRHVkVaV052WkdVZ1BqNEtjM1J5ClpXRnRDbmdCKy85L0ZJeUdBQVVoOFBQL256OS8vdFhWMWVNdzQ4T1Bpb3FLR2hzYmV6TGxmL3dBR2xCVGc5TjgKSE1ZT0ZXRUFJb2x2Q2dwbGJtUnpkSEpsWVcwS1pXNWtiMkpxQ2pFNElEQWdiMkpxQ2pVMENtVnVaRzlpYWdvMwpJREFnYjJKcUNqdzhJQzlNWlc1bmRHZ2dPQ0F3SUZJZ0wxUjVjR1VnTDFoUFltcGxZM1FnTDFOMVluUjVjR1VnCkwwbHRZV2RsSUM5WGFXUjBhQ0E0TWpZZ0wwaGxhV2RvZENBeE1UWTVJQzlKYm5SbGNuQnZiR0YwWlFwMGNuVmwKSUM5RGIyeHZjbE53WVdObElERXhJREFnVWlBdlFtbDBjMUJsY2tOdmJYQnZibVZ1ZENBNElDOUdhV3gwWlhJZwpMMFJEVkVSbFkyOWtaU0ErUGdwemRISmxZVzBLLzlqLzRBQVFTa1pKUmdBQkFRRUFaTGEwQUFELzJ3Q0VBQnNTCkZCY1VFUnNYRmhjZUhCc2dLRUlyS0NVbEtGRTZQVEJDWUZWbFpGOVZYVnRxZUptQmFuR1FjMXRkaGJXR2tKNmoKcTYyclo0Qzh5YnFteDVtb3E2UUJIQjRlS0NNb1Rpc3JUcVJ1WFc2a3BLU2twS1NrcEtTa3BLU2twS1NrcEtTawpwS1NrcEtTa3BLU2twS1NrcEtTa3BLU2twS1NrcEtTa3BLU2twS1NrcFAvRUFhSUFBQUVGQVFFQkFRRUJBQUFBCkFBQUFBQUFCQWdNRUJRWUhDQWtLQ3dFQUF3RUJBUUVCQVFFQkFRQUFBQUFBQUFFQ0F3UUZCZ2NJQ1FvTEVBQUMKQVFNREFnUURCUVVFQkFBQUFYMEJBZ01BQkJFRkVpRXhRUVlUVVdFSEluRVVNb0dSb1FnalFySEJGVkxSOENRegpZbktDQ1FvV0Z4Z1pHaVVtSnlncEtqUTFOamM0T1RwRFJFVkdSMGhKU2xOVVZWWlhXRmxhWTJSbFptZG9hV3B6CmRIVjJkM2g1ZW9PRWhZYUhpSW1La3BPVWxaYVhtSm1hb3FPa3BhYW5xS21xc3JPMHRiYTN1TG02d3NQRXhjYkgKeU1uSzB0UFUxZGJYMk5uYTRlTGo1T1htNStqcDZ2SHk4L1QxOXZmNCtmb1JBQUlCQWdRRUF3UUhCUVFFQUFFQwpkd0FCQWdNUkJBVWhNUVlTUVZFSFlYRVRJaktCQ0JSQ2thR3h3UWtqTTFMd0ZXSnkwUW9XSkRUaEpmRVhHQmthCkppY29LU28xTmpjNE9UcERSRVZHUjBoSlNsTlVWVlpYV0ZsYVkyUmxabWRvYVdwemRIVjJkM2g1ZW9LRGhJV0cKaDRpSmlwS1RsSldXbDVpWm1xS2pwS1dtcDZpcHFyS3p0TFcydDdpNXVzTER4TVhHeDhqSnl0TFQxTlhXMTlqWgoydUxqNU9YbTUranA2dkx6OVBYMjkvajUrdi9BQUJFSUJKRURPZ01CSVFBQ0VRRURFUUgvMmdBTUF3RUFBaEVECkVRQS9BTnYrMHJiL0FLYmY5K0gvQU1LVkwrM2Rnb01tVDZ3dVA1aWdDZnpGOWYwcDI0VUFHNFViaFFBYmhTYmgKNjBBRzRVYmg2MEFHOWZYOUtUekY5ZjBvQWR1Rkc0VUFHNFViaFFBYmhSa1VBR1JSa1VBRzRVYmhRQWJoUnVGQQpCdUZHNFVBRzRVYmhRQWJoUnVGQUJ1Rkc0VUFHNFViaFFBbTRVYjE5YUFEY1BXamNLQURjS053OWFBRGNQV2pjClBXZ0EzRDFvM0Qxb0FOdzlhTnc5YUFEY0tOd29BTndvM0NnQmR3bzNDZ0F5S01pZ0F5S053b0FOd28zQ2dBM0MKamNLQURjS1RjS0FEY0tYY0tBRGNLTndvQU53b3lLQURjS1RjS0FGM0NrM0NnQTNDamNLQURjS053b0FYY0tOdwpvQVRldnIrbEc5Zlg5S0FEY1BXbDNDZ0JDNmpxZjBwUE1YMS9TZ0JkNit2NlViMTlhQURjS053b0FOd28zQ2dCCmR3bzNDZ0JOd28zRC9Jb0FOdy95S053L3lLQURjUDhBSW8zRDMvS2dBM2ozL0tqZXZ2OEFsUUFiMTkveU5KNWkKKy84QTN5YUxBSG1yNy84QWZKbzgxZjhBYS83NU5Pd0RzRDBwQ0Jpa0EzYUtkVEdGSlFBVVVBRkdLQUNrQTVvQQpXaWdBcGFBQ2lnQW9vQVNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vR0ZGQUJSaWdRWW9vR0ZGQUJSUUlLS0FDCmlnQXBhQUNpZ0FwS0FDaWdBb29BS0tBQ2lnQW9vQVdpZ0JLS0FDaWdBb29HRkZBQlMwQ0dsYUtCaFMwQUxTYlIKNlVDRTIwWW9HRkxRQVVVQUZGQWdvb0dGRkFCUlFBVVVBRkZBZ29vQWZTSHBTRUpSVEdGRkFCU1VBRkZBQ1VvbwpHTFJRSUtLQUNrb0FLS0JoUlFBVVVBRkZBZ29vQUtLQUNsb0FLU2dBb29HRkZBQzBVQ0Vvb0dGRkFDMFVDRW9vCkFLS0JoUzBDQ2lnQktLQUNsb0FLS0FFb29BS0tBQ2lnQUdlOUxRQWxGQUJSUUFVVUFGRkFDMFVBRklSUUFZeFIKUU1LS0JDMFVBSlJRQVVVRENpZ0Fvb0VGRkFCUlFBVVVEQ2lnQW9vQWZTR2tTSlJRTUtLWUJTVUFGRkF3cGFCQwpVVUFMUlFBbWFLQmhSUUFVVUFGRkFCUlFBVVVBRkZBQlJRSUtLQUNpZ1lVVUFGTFFJU2lnQW9vR0ZMUUlLU2dBCm83MERDbG9FRkpRQVVVQUZMUUFVbEFCUlFNS0tCQlJRQXRKUUF0SlFBVVVBRkZBQlJRQVV0QUJSUUFVaDZab0EKS0tCaFJRQVVVQ0NpZ0Fvb0dGRkFnb29BS0tBQ2lnQW9vR0ZGQUQ2UTlLUklsRk1ZVVVBRkZBQ1VBVUFGRkFCUwowQUlUU1VEQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BUTV6MEJGTFFBVVVDQ2lnWVVVQUZGQWhycXhLN1hLNFBQCkFPZmFuVUFGRkF3b29BS0tCQlJRTVdpZ1FsRkF3b29BS1dnUVVsQUJSUU1LS0FDbG9FRkZBQlNVQUZGQUJSUUEKVVVBRkZBQzBsQUJTSGs0N1lvR0xSUUlLS0JoUlFBVXRBaEtLQUNpZ0Fvb0FLV2dCS0tBQ2lnWVVVQVBwRDBwRQpqS1dtVUdhVE5BQzVvelFBbWZtQXdmcjJweHBDRUZGTUJhYVRRTVFjODB0QUMwVUFGRkFCUlFBVVVBRkZBQlJRCklLS0JoUlFBVVVDQ2lnWVVVQUZGQWdwYUFFTkZBd29vQUtLQUNsb0VGSlFNS0tBQ2lnUVV0QUNVVUFGRkF3b28KQUtXZ1FVVUFGSlFBVVVBRkZBQlJRQVV0QUJSUUFsSXVTeDlLUXgxRk1RWW94UUFZb29BU2lnQW9vQUtLQUNpZwpBb29BRFJRQVVVQUZGQXg5SWVsSWthYVNtVUZGQUJqRkFIT2FRaFNhTzFNQUZMMDYwQU5Kb29HTFJRQUdpZ0FvCm9FRkZBQlJRQVVVQUxSUUFsRkFDMFVBSlJRQVVVQUZGQUJSUUF0RkFCUlFBVWxBQlJRTVNselFBbExRQVVVQUYKRkFCUzBDQ2tvQUtLQmhSUUF0RkFoS1dnQktXZ0Fvb0FTaWdBb29BV2lnQXBLQUNnSHRRTVdpZ1Fab29BS0tBQwppZ0JLVExiOGJSdHgxelFBdEZBQlMwQUpSUUFVVURDaWdBb29FUHBEU0VKU1lwakRGSndPdEFBQWM1UDVVdElBCm83NHBnTG1tOVRrMGdDbHBqQ2lnUVVVQUZMUUFVbEFCUlFBdEZBQlJRQVVtTUg2MEFMU1VBRkZBd3BhQkNVdEEKQ1V0QUJSUUFVVUFGSlFBVVVERUhORkFCUzBBRkZBQlJRQVVVQ0Zvb0FTaWdZVXRBZ29vQVNpZ0Fvb0FLS0FDaQpnQW9vQVdrb0FLS0JobWtJNUJvQVdpZ0Fvb0FLS0JDMGxBQlJRQVVVQUZGQUJSUU1LS0FDaWdCS0tBSktTa1NKClJUR0dLYUFSeXhCUHJpa0E2a3BnRkE1b0dGRkFCUzBDQ2lnQW9vQVNsb0FTaWdCYUtBQ2tvQUtLQUNpZ0Fvb0EKS0tBQ2xvQUtLQUNpZ0Fvb0FLS0FDa29BS0tBQ2lnWVVVQUZGQUJSUUFVVUFMUlFJU2lnWVV0QWdwS0FDaWdBbwpvR0ZGQWdvb0FLS0FDaWdZVVVBRkpRQXRGQUJSUUFVVUFGRkFnb29HRkZBZ29vQUtLQmhSUUFVVUFGSmlnQ1NrCk5Ja1NpbU1DYVNnQXpSUUFocFJ4UU1XaWdRbExRQVVVQUZGQUJTVUFMUlFBVVVBRkZBQ1VVQUxSUUFsRkFCUlEKQVVVRENpZ1F0RkFDVXRBQ1VVQUxSUUFVVUFGSlFBVVVEQ2lnQW9vQUtLQUNpZ0FwYUJCUlFBVWxBQlJRTUtLQQpDaWdRVVVBRkZBQlJRTUtLQUNrTkFDMFVBRkZBQlJRQVVVQUZIZWdRVVVBRkZBQlJRTUtLQUNpZ0FvelFBK2tQClNrU0pRVFRHTnpTMERDaWdCS1dnQXBhQkNVSGlnWVVVQ0Zvb0FNMFVBRkpRQXRGQUJSUUFVVUFGRkFDVUQ2MEEKRkZBQlJRQVVVQUxSUUFVVUFGRkFCUlFBVVVBRkZBQ1VVQUZGQXdvb0FLS0FDa29BVUdsb0VKbWlnQW9vR0ZGQQpCUlFBVVVBRkxRSUtTZ0Fvb0FLS0JoU04wb0FCMHBhQUNpZ0Fvb0FLS0FDaWdBb29BS0tCQlJRTUtLQUNpZ1FVCllvQWZTSHBTRU16U0UweWhSUzBBRkZBQ0Nsb0FLS0JCUWVsQUJSUU1NMFVBRkZBaGFLQUNpZ0Fvb0FLS0FDaWcKQktLQUNpZ0Fvb0FLV2dBb29BU2lnQW9vQVdrb0FLS0FDaWdBb29HSlJRQVVVQUdhTTBBRkZBQlJRQVVVQUZMUQpBVVVBRkZBQlJRSUtLQUNsb0FLU2dBb29HRkI2VUFJdlNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FvCm9BS0tCRDZhM1NrSVpRQlRLSFVVQUZKUUFDZzVQVEg1VUFJZC9xdEppVDFYOHFBRVF5TXVTZHB6Z2dpbXpTaUMKSnBKWkFGWHFjVWhHWmJ4ejZsSzl5dHpKQ2dJVlZVNVBIcnppdFNEZUF5U1B2Sy94WXhuNis5QUV0Rk1ZVXRBaApLS0FDbG9BS0tBQ2lnQktLQUNpZ0Fvb0dGRkFCUlFJS0tCaFJRQVVVQVEzSmsyalpUb0N4VDV1dFQxRG9TVVZRCmhEUlFNS0tBRHZSUUFVaG9BV2lnQTc5S0tBQ2lnQmFLQUVvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQkJSUU1LQ00KakZBaU9KV1VuSkpIdlVsSkRDaW1BVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBK2tha1NOeFJUR0ZGQQpCU0dnWXRGQUJTVUFJUWM1QnJGMW1XU2VZVzhhT1VRZ3VRcDZucFNFelZzb1d0N1pZbklZcjNBeFVvUUJ5d3prCjhIbW1BNmlnWVVVQUZGQUJSUUlXaWdBcEtBQ2lnQW9vR0ZGQUJSUUFVVUFMU1VDQ2lnWVVVQUZGQUJTMENFWUgKQjI0QjdacUxiUDhBODlZLysvWi8rS29BWFpQL0FNOUkvd0R2MmY4QUdnclAya2ovQU8vWi93QWFBRTJ6L3dEUApXUDhBNzluL0FCbzJUZDVWL3dDK1AvcjBCcUd5Yi9ucW4vZkgvd0JlalpNVC9yVi83NC8rdlFHb2JKZitlby83CjVvMlMvd0RQWWY4QWZGQXhDa282emZrbEtFbDd6ZjhBamxBdFI2QmdQbWJjZnBpblVEQ2lnQW9vQUtLQUNpZ0EKb29BS0tBQ2lnQW9vQUtLQUNqTkFCbWpOQWdvb0dGRkFCUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFENlEwaQpSS0tCaFNVd0NrRkF4YzBVQUZKUUF0R0tBRTZDaWdCYVNnQmFLQUNpZ1F0RkFCUlFBbEZBQlJRQVVVRENpZ1FVClVEQ2lnQXpSUUFVVUFGRkFCUlFBVXRBaEtLQUNpZ0JhU2dBb29HRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlEKQVVkNkFDaWdBcEtBRm9vQVNpZ0Fvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCOUlhUklVbApBeEtLWXhwTktLUUMwVXdDaWdBcE0wQUZGQUJSUUFacGFBQ2xvRUZGQUJTVUFGRkFCbWlnWVVVQUZGQUJSUUFVClVBRklUUUFVVUFGTFFBWm9vQUtNMEFHYUtBQ2lnQW9vQUtLQUVvb0FLTTBBR2FNMEFHYU0wQUdhV2dBb29BS0sKQUNpZ0Fvb0FLS0FDaWdCS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQkR4UzBBRkZBQlJRQStrTgpJa1NpbU1Ta29HSlNpZ0JhS0FDaWdBcERRQVVVQUZGQUJSUUFDbG9BS0tCQlJRQVVVRENpZ0Fvb0FLS0FDaWdBCm9vQVNpZ0Fvb0FLRFFBbEdhQUNpZ0FvelFBWnBhQUROSWFBQ2xvQVNpZ0Fvb0FLS0FEdFJRQVVvb0FXaWdBb28KQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtEUUFVVUFKUzBBRkZBQlJRQVlvb0FLS0FDa29Ba3BEMApwRWlVbE1ZVWxBd3BhQUNpZ0Fvb0FLU2dBb29BS1dnQXhSaWdBb29FRkZBd29vRUZKUU1XaWdBb29BS09jKzFBCkJSUUFsRkFCUlFBVXRBQlNVQUF3UmtIZzBZb0FNVVlvQU1VWW9BTVVZb0FNVVlvQU1VWW9BTVVZb0FNVVlvQU0KVVlvQU1VWW9BTVVZb0FXaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQQpDaWdBb29BS0tBRW9vQWtwRFNKRzBVeGhTVURDbG9BS0tBQ2lnQktLQUNpZ0Fvb0FXaWdBb29BS0tBQ2lnQXBPCnRBQzBVQUZGQWdvb0FLS0JpVVVBRkZBQmlsb0FLS0FDaWdBb29BS0tBQ2lnUVVVQUFJSXlEbWlnWVVVQ0NpZ1kKVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRgpGQUJSUUFVbEFFbEllbElrYlJUR0ZKUU1Xa3BBRkZNQW9vQUtLQUNsb0FLU2dBb29BS0tBQ2lnQW9KUGFnQW9vCkFXaWdRdEZBQ1VVQUZGQXhLWEZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tCaFJRQVVVQ0NpZ1lVVUFGRkEKQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkpRQXRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQQpCUlFBNmc5S1JJbEpUR0lhU2tNV2lnQW9vQUtLQUNpbUF0RkFCU1VBRkZBQlNVQUZMUUFsQTVvQVdsb0FLS0FDCmlnQktLQUROR2FBRm9vRUZGQUJSUU1TaWdBcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW8Kb0FLS0FDaWdBcEtBQ2lnQk04WnBhQUNpZ0Fvb0FLS0FDbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0VGRkF3b29BSwpLQUgwaDZVaVJLUTB4aUdrRklZdEZNQmFTa0FVVXdDaWdBb29BS1dnQW9vQUtRaWdBb29BTVV0QUJSUUFVVUFKClJRQVVVQVJzSnZuMitYMjI1eitPYVZoTjgrM3l4MDJaQi9ITkFnYnp2bjJtUHRzeUQrT2FHRTN6N1dqSFRaa0gKOGM4MEFEaWI1OWpJT0J0eXA0OWM4ME9Kdm4yTWc2YmNxZVBYUE5BQXdtK2ZhMGZVYmNxZVBYUE5EQ2I1dHJSagprYmNxVHgzenpRTVFpYkp3NmZlR01xZnU5eDE2KzlHMmIrK24zcy9kUDNmVHIxOTZBQUxOa1pkUHZIUHluN3ZwCjE2KzlDck44dTUwUEozWVhxTzJPZnBRQUtKaHMzT2g2N3NMalBwam5pbFZaaHQzT2g0TzdDbms5c2MwQUNpYjUKZHpvZVBtd3BHVDdjOUtGRTN5N25RL0w4MkZQSjl1YUJBcXpmTHVkRGdmTmhjWlB0elFxemZKdWREZ2ZOaFR5ZgpibmlnWUtzdzI3blE0SHpZVWpKOXVhRldVYk56b2NBN3NMMVB0enhRSUZXWWJOem9jWjNZWEdmVEhQRkNyTjhtCjUwT003c0xqUHBqbmlnQVZadmwzT2h3RHV3dlgweHp4UXF6RFp1a1U0QjNZVEdUMjc4VURCVm1HM2RJcHdwM2YKSmpKOWV0QVdZQVprVW5iZy9KMWIxNi9wUUlUYk5qL1dKOXpIM1A0dlhyMDlxQ3MyRGlSYzdjRDVQNHZYcjA5cQpCZ3l5bmR0a1VaWEMvSm5COWV2TkRKTWQrMlZWeUJ0K1RPRDM3ODBBREpNZCsyVlZ6amI4bWNldmZtbFpKVHUyCnlnWkkyL0xuQTc5K2FCQXlTbmRpVlJramI4bWNEdjM1b1pKVHZ4S0JuRzM1TTdmWHZ6UU1jb2NNeExBcWVneDAKL3dBYWRRQWxMUUFVWW9BVEZHS0FERkdLQUNqRkFCaWpGQUJpaWdCYUtBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaQpnQW9vRUZGQXgxRGRLUkkyaW1NUTBDZ1lVVUFMUlFBbEZBQlJRQVVVQUZMUUFVVUNDaWdZVVVBRkZBQm1qTkFCClJRSUtLQmhSUUFVVUFMUlFJU2lnWVVVQUZGQUJTVUFLQlJRSUtLQUNpZ0Fvb0FLS0FDaWdBb29HRkZBQlJRQVUKVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQ0NpZ0Fvb0FLS0FDaQpnWTZodWxJa2JRYVpRMm5VQUpSUUF0SlFBVVVBRkZBQlJRQVV0QUJSUUFVVUFGRkFBYVNnQW9vQUtXZ0Fvb0FLCktBQ2lnQW9vQUtLQUNpZ0Fvb0FUSHZTMEFGRkFnb29HRkZBQlJRSUtLQUNpZ1lVVUFGRkFCUlFBVVVBRkZBQlIKUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZKUUEraHVsSQprYlNHbVVBcGFBRW9vQUtLQUVwYUFDaWdBb29BS0tBQ2lnQXBhQUNpZ0FwS0FDaWdBb29BV2lnQW9vQU0wbEFCClJRQURPT2V0R2FBRXp6UzVvQUtLQUNqTkFCbWlnQW9vQU0wdEFCU1pvQUtLQUV6UzVvQVEwWm9BWE5HYUFDaWcKQW96UUFVVUFHYU0wQUZGQUJSUUFVdEFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tBQ2lnWQpVVUFGRkFEcUc2VWlSbEJwbENqcFJRQVVVQUpSUUFVVUFGRkFCUlFBVVVBRkZBQlMwQUZGQUNVVUFGRkFCUlFBClV0QUJSUUFtT2FPOUFCUWFBQ2owb0FLS0FDaWdBbzdVQUZGQUJSUUFVVUFGRkFCUlFBVVVBSGVpZ0Fvb0FCeFIKUUFVQVlOQUJSUUFVVUFGQW9BS0tBQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FvbwpBS0tBQ2lnQjFCcEVqRFJUS0Zvb0FLS0FFb29BS0tRQlJUQUtLQUNpa0FVVXdDbG9BS0tBRW9vQUtLQUNpZ0FvCm9BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNrb0FLS0FGcEtBRm9vQUtLQUNpZ0EKb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCMUJwRQpqVFNVeWhhS0FDaWdCS1NnQmFLQUNpa0FVVXdDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLTTBBRkxRQVVVCkFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBbExRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVUKQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBNmcwaVJwb0ZNb0tTZ0JhUwpnQW9vQUtLUUJSVEFLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDbG9BS0tBQ2lnQW9vQUtLQUNpCmdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUVCQjZITktBQU1DZ0Fvb0EKS0tBRW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnUVVVQUZGQXdvb0FLS0FIVUdrU01OTFRLQ2tvQUtLUUJSVApBS0tBQ2lnQmFLQUVvb0FLU2dBb29BV2lrQVVVd0NpZ0JhU2dBb29BS0tBQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FTaWdCYUtBRW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQkFBQmdEQXBhQUNpZ0FwQWMKMEFGRkFCUlFBdEZBQ1V0QUJSUUFVVUFGRkFCUlFJS0tBQ2lnWVVVQUZGQURxRzZVaVJuZW5VeWhLU2dBb29BSwpXZ0Fvb0FLS0FDak5BQmtVMG1nQW9vQUtLQUNpZ0JhS0FGb29BS1NnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBCkNrb0FXaWdBb29BU2lnQmFRODBBRkZBQzBVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTWW8KQU1VWW9BS0tBRnBLQUNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0IxSTNTa1NJS1dtTVNpZ1lsSlFBdApBcEFMUlRBS0tBRW9vQVNpZ0Fvb0FLS0FDbG9BS0tBQ2xvQVNsb0FLS0FDaWdBb29BUHhvb0FLS0FFcGFBQ2lnCkFvb0FTaWdCYUtBQ2pGQUNVVUFMUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVUKVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBNmtha1NKMm9wakNpZ1lsRklBb29BS1dtQQpVbEFCUlFBbEZBQlJTQVdpZ0Fvb0FLS1lCUzBBRkZBQlJRQVVVQUZGQUJSUUFsRkFCUzBBRkZBZ29vQUtLQUNpCmdCYUtBQ2lnQktLQUNpZ0Fvb0dGRkFCUlFBbEZBQlMwQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUYKRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFPcERTSkVvcGxDVVVnQ2lnQW9wZ0ZGSUFvb0FaSk5IR3lLNwpoUzV3dWU1b0VpczdLRGxseGtlbEFEcUtBRU9lMUxUQWJKSXNVYk8yY0tNbWs4d0NNdTRNWUF5ZHhIRklCVElvCmtXUCtKZ1NQb01mNDA2Z0F6VVVWMUZLUUVZL01NcmxTTnc5UmtjMEFTa2dESjdVMVpGYllWeVE0eUNCeFFBK2oKTk1CSTNXUkE2SEtzTWcrdE9vQUtLQUNpZ0FwS0FDaWdCYUtBQ2lnUVVVQUZGQUJSUUFVdEFDVXRBQlNVQUZGQQp3b29BS0tBQ2lnQktLQUNpZ0FwYUFDaWdBb29BS0tBQ2tvQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQjFJYVJJbEZNb1NpZ0FveFFBVVVBRkZJQW9vQXEzVVlrdUlVYk9DcjgrbkFxdWtyQVgKTFNxZHdLS3dCS2pQVE9mVHY5S0JDaG1LU0tqL0FDK2RHQVVZbkFKWE9EUk5FVVc2S21RYkZESjh4NE9PMzVVVwpBV1lFelRCNVZqUEhsczJSampxT2ZYTlQzbTRSTGpkdDNydjI5ZHVlYUFLMHFxME4wSS9tZzJncmpwdTV6ajlLCnMzc2ViS1pFWFB5SEFGQUVYbHh5WEVPdzdvL0xiQlVuSFZlOVJndmlFU05pSUdRWmNuR1EyRnlmcDYwQVhMZFMKTGNBeUNUcmhoemtaNHF2YVJNTFdDVnp1OHVMNVVWY0hwL1B0UUJIRVBNa1lLbzJ0Q1NWWEpHZU9DVDFOT2lEZQpYYkNFRVlpWUhqR0d3T3RGZ0MzajRWbFlCeEdRNmlNaGljZnhIUFdpR0RZMXNWakkzeEVTRWpyd09EUUJMWWxJCnJGTW9WS2dCd0VPYy9URldES3E3c2h2bElCK1U5LzUwQUJsVWJzN3ZsSUIrVTkvNTBHWkJ1enUrVWdIQ2s5ZjUKMHhnMHlMdXp1K1VnSDVUMy9uUTB5SnZ6dStUR2NLVDEvblFBTk1pNzhrL0pqZGhTZi8xME5LaTc4N3ZreG41VAovazBBRFNvdS9PNzVNWitVbi84QVhRMHFydXp1K1hHZmxKNi96b0FVeXFOMmQzeWtBL0tlOUJsVUU1RDhFTDl3Cjk2QkI1bzU0ZmhndjNUL25IdlI1b3pqYS93QjdiOXcvNXg3MEFBbEJ4OHI4c1Y1VTl1LzBvV1VOdCtWL21KSEsKa1l4NitsQUFKUWR2eXVOMmNaVThmWDBvV1VOdCtWeHVHZVZJeDlmU2dBV1VIYjhyamN1N2xUeDlmZjJvV1VOdAp3ci9NdTRaVWpIMTlEUUFMS0dDL0s0M0RQS2tZK3RDeUJ0dnl1Tnd6eXBHUHI2VUFBa0JLamE0M0RQS25qNitsCkN5aHRueXVOd3p5cEdQcjZVQUN5QnR2eXVOMmVxa1krdnBRSkEyMzVYRzdQVmNZK3RBQXNvTzM1WEc0RThyMCsKdEN5YnR2eXVOd3p5dlQ2MERFRW9PMzVIRzVkM0s5UFkrOUFsQng4ajhydTVVOGUzMTlxQkI1by91UDhBZDNmZApQNWZYMm9Nb0FQeU9jTHU0VS9sOWZhZ1lOS0YzZks1MnJ1NFVuUDA5NkdsQzdzbzUyZ0hoU2M1OVBXZ0FhVUx1CitWenR4MFVuT2ZUMW9hVUx1K1J6dHgwVTgvVDFvQURJRjNmSzUya0RoU2M1OVBXZ3lBYnZsZjVjZEZKejlQV2cKQWFRTHUrVnp0OUZQUDA5YVV5QWIvbGM3Um5oU2MvVDFvQUdrQTNmSzUyalBDbm42ZTlCa0FKRzErRjNmZFA1ZgpYMm9BUE1IOTF2dTd2dS81NW9FZ3lQbGZsZDMzZjArdEFDQ1FIYjhyamN1N2xUeDlmZWhaUTIzNVhHNWQzS25qCjYrOUFBSlFRRHRmbGQzM0QrWDE5cVBOWDBmN3U3N2g2ZjQrMUFBWlJnbmEvQzd2dUg4dnI3VUdVTHUrVnp0WGQKd3A1K25xYUFCcFF1N0t2OG9CNFVuUDA5YUdsQzdzcTUyNDZLVG5QcDYwQUtaUU4zeXY4QUtRT0ZQZW4wQUZGQQpCUlFBVVVBRkZBQlJRQVVVQUZGQWdvb0FLS0JoUlFBNmtJK2JOSWtTa3BsQlJTQUtXbUFVbEFCUzBnRW9wZ0ZHCk9sSUFwYVlDVVVBRkZBQlJRQVVVQUZMUUFVVUFGRkFDVVVBTFJRQWxMUUFVVUNDaWdBb29HRkZBQlJRQVVVQ0MKaWdBb29HRkZBQlJRQVVVQUZGQUJSUUFVbEFCUzBBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVWxBQzBVQQpGRkFCUlFBVVVBRkZBZ29vQUtLQmhSUUFVVUFPb1BXa1NOcERUS0VvcEFMUzBBRkpUQUtNMGdETkxRQWxGTUFwCmFBQ2tvQUtLQUNpZ0Fvb0FLV2dBb29BU2lnQW9vQU0wVUFGTFFBVXRBZ3BLQUNqTkF3b29BS0tBQ2lnQW9vQUsKS0FDaWdBb29BS0tBQ2lnQXBLQUNpZ0JhS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FTbG9BU2xvQUtLQQpDaWdBb29BS0tCQlJRQVVVRENpZ0Fvb0FkUWV0SWthYVNtVUpSU0FUTk9Cb0FXaW1BbEpRQVVvTklCYUtBRW9vCkFLV21BbEZBQlJRQVVVQUxSUUFVbEFCUlFBbEZBQlM0b0FVQ2lnQmFLQkNVVUFGRkF3b29BS0tBQ2lnQW9vQUsKS0FDaWdBb29BS0tBQ2lnQXBLQUNpZ0E1ejdVdEFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVQpVQUZGQUJSUUFVVUNDaWdZVVVBRkZBQlJRQTZnMGlScHBLWlFsRkFCaWtwQU9CcGMwQUZCcGdJUlNVZ0s5MDUrClNJU2VXWFAzczRJQTYvNTk2U082Wm9JaUFHa2M3T3ZHUm5QOGpRQXlPZDFhUUZRWkhtMmdidUI4b1A4QUxtbFcKYVJHbHlnWmpLcWdidU9RS0FIUGNzcnNnVlN5S0dQSjVKendPUGFuL0FHaHZOVmRvVUVBZ3VjWnoySHVLQUZpbQpNa2pxUXFsYy9LVDgzWHJqME5OdFlwbzJrTXNtOEU4ZmtLQUxGRk1Bb29BS0tBQ2lnQXBLQUZvb0FLV2dBb29FCkZGQUJSUU1LS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLU2dBb29BS0tBRm9vQUtLQUNpZ0Fvb0FLS0EKQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnUVVVRENpZ0Fvb0FLU2dCOUJwRWpEUlRLRW9vQUtLUQpDVW9OQURzMFV3Q2t4UUJHWWxNbThqSnhpb3piSnlSbFR2M2dqc2NZb0VIMlpOcEc1c2x0KzdQSWIxcHkyNkRPClN4SmNPU1QxSS84QTFVQU9hRUdRdXJzakVZTzNIUDVpaVNFU0VibllxQ0R0NHdTT2ZUTkFBSVI1b2taMllqSVUKSEdCbjhLa0l5TWRLQmpSSGpIenR3dU92WDMrdElFd1I4N0hDNDYvcjlhQUFSNHg4NzhMdDY5ZmY2MGVYeGplMwozZHZYOWZyUUF2bDlmbmZsZHZYOWZyU0dNSFB6UHlBUHZkUGY2MEFEUmh0M3pNTnd4dzJNZlNneGc3dm1jYnNkCkdQR1BTZ0FNWU83NW5HNGc4TjArbEJqem41bkdTRHdlbjBvQURIblB6dU1rSGc5S0RIbmQ4NzhrSHIwK2xBQVkKODd2bWNiaUR3ZW4wcFRIbmQ4ekRkam9lbjBvQUNtZDN6TU4yT2g2ZlNncG5kOHpqZGpvZW4wb0FER0R1K1p2bQo5RzZmU2d4Zzd2bWNic2RHNlk5S0FBeGc1K1p4a2c4TWFER0RuNW01WUg3eC93QTRvQVBMSFBMY3R1KzhmODQ5CnFQTEdRY3Q5N2Q5NC93Q2NlMUFBSWxHT1dPQ1R5eDcwTEdxaGNGdmx6akxFL242MEFJc1NydHdYK1VFRExFL24KNjBxeHF1M0JiNVJnWlluOC9XZ0FFWUdPVzRYYjk0OVA4ZmVnUmdiZVc0WGJ5eC96bjNvQUJHRjI0TGZLTURMRQovd0Q2L3JRSTFHM2x2bEdCbGovay9XZ0FXTlYyNExmS01ETEUvd0Q2NkZqVmR2TGZLTURMRS9uNjBBS3NhcnR4CnUrVVlHV1ArVFNDTlYyNExmS01ETEUvbjYwQUFqVmR1QzN5Z2dmTWY4bWhZMVhiamQ4b3dQbU5BQUlsVURHNzUKVjJqNWowL3ozb0VTakgzdUYyL2VQVC9QZWdBOHBmOEFhKzd0KzhlbitlOUJqVWc1M2NqYWZtUFNnQkdpVnQyZAozekRCd3hIL0FPcWhva2JkbmQ4Mk00WWpwL0tnQlRFcDNaM2ZNUVRoaU9uOHFERXAzWjNmTVFUaGoyL2xRQUdKClR1Kzk4eEJPR0k2Zi9xb01hbmRuZDh4QlB6SHQvS2dBTWFuZHkzemRmbVA2ZWxLMGF0dXpuNXVEeWFBRWFOVzMKWno4d3dmbUk0b01hbmRuUHpEYWZtUFNnQTh0ZXZQM2R2M2owL3dBOTZQTFhqcnd1Mzd4NlVBQWpVWXhuZ2JSeQplbEFpVUVZM2NMdEh6SHAvbnZRQWVVbkgzdUYyL2VQVC9QZnJSNVMvN1gzZHYzajAvd0E5K3RBQVlsSUkrYmxkCnYzajAvd0E5NkRFcmJzbHZtR0RoaVA4QTlWQUEwU3R1enUrWVlPR0lvTVNuZG5kOHhCT0dQYitWQUFZMU9jN3UKU0Q5NDlxREV2UExjc0crOGV2OEFoN1VDSDBVRENpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVNpZ0I5STFJawphYUtaUVVsQUJSUUFVbElCUWFVR21BdEZBQ0drTkFDVVpvQVVHbG9BV2lnQXBLQUNpZ0Fvb0FLS0FDaWdBb29BCktLQUNpZ0FwYUFDaWdBcEtBRm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnQmFTZ0FwYUFDaWdBb29BS0tBQ2kKZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQVNpZ0I5STFJa2JSVApLQ2lnQW9vQUtTZ0JLS1FEZ2FXbUFVaG9BU2t4UUFVb05BQ2cwdEFCU1VBRkZBQlJRQVVVQUZGQUJSUUFVbEFCClJRQXRGQUJTMEFGSlFBVXRBQ1V0QUJSUUFVVUFGRkFCUlFBVVVBSlJRQVVVQUZMUUFVVUFGRkFDVVVBRkZBQlMKMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlNVQUZGQUQ2UnFSSTJscGxDVQpVQUZGQUJSUUFsSlNBS1VHZ0JjMFpwZ0ZKUUFob3BBS0tYTk1BelJRQVVsQUJTMEFGSlFBdEZBQlJRQVVZb0FTCmlnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2xvQVNpZ0JhS0FFb29BS1dnQW9vQUtLQUNpZ0JLS0FDaWdBcGEKQUNpZ0Fvb0FLS0FDa29BS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2tvQUtLQUgwaDYwaVJLS1pRbApGQUJSUUF0SlFBVW1LQURGSmlnQmFLUUMwWXBnSmlqRkFCUlFBSE9PT1RUUTBuR1l4OTNQM3UvcC93RFhvQVVOCkp4KzdIM2NuNXVoOVAvcjBtWk1mNnY4QWh6OTd2NmYvQUY2UUFXa0djUmcvTGtmTjFQcC85ZWd0SUEySXdTQUMKUG02bjBwZ0RHUWJ0cUE0QTIvTmpQK0ZETklOMjJNSEdOdnpZejYvU2dBTFNBdGlNRUFqSHpkZlg2VUZwQnV4RwpEZ2dENXVvN21nQUxTZk5pTWNFQWZOMUhyUVdrK2JFWU9DQVBtNmp1YUFBdEo4Mkl3Y0ViZm02ajE5cUMwZzNZCmpCd1J0K2JyNi9TZ0FacEJ1eEdEakczNXZ2ZjRVTVpCdTJ4ZzR4dCtiR2Y4S0FCaklOMjJNSEdOdnpZei9oUVQKSU4yRUJ4amI4M1gvQUFvQUNaT2NJRGdnRDV1bzllbEJhVEp3aTQzQUQ1dTNjOVAwb0FDWmNIQ0w5N0ErYnQ2OQpPdnQrdE9YY2M3bEE1NHdjNUZBQzB0QUNVVUNDakZBeGFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQXBLQUNsb0FTbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnQjlIZWsKU0ppakZBd3hTWXBnRkZBQzBZb0FNVW1LQURGSmlnWW1LV2dBcHdvQU1VbUtCQ1lvb0dHS1hGQUJTMENDaWdBbwpvQU1VWW9BS01VQUdLTVVBR0tNVUFHS01VQUJGSmlnQmFNVUFHS01VQUdLTVVBR0tNVUFHS0tBQ2lnQXhTWW9BCk1VVURDaWdRdUtNVUFKUmlnQmNVbEFCUlFBWW9vR0ZGQWdvb0FLS0JoUlFJS0tCaGlpZ0Fvb0FLS0JCUlFNS0sKQUNpZ0Fvb0VGRkF3b29BS0tCQlJRTUtLQUhVRWdkYVJJbTRVYmhRTVRkN0dqUHNhQURQc2FUZDdHbUFieDcwdQphUUJ1eDFvM1o2VUFHZlkwYnZVR21BWnpTRWdVRERjS0NjYzBBS0NLV2tJVE5IRk1BSlVkNk53OWFRQnVGSnVwCmdMdUZKdTlqUUFieFM3eDYwQUc0VWJ4U0N3dTRldEc0ZXRBV0RjS053b0FOd28zQ2dMQm1rM2lnQmR3bzNEMW8KQU1pakk5YUFETkdSUUFaRkxrVUFKa1V1UjYwQUp1SHJSa1VBTFNaSHJRQVpGR2FBRGlqaWdBcGVLQUV5UFdqYwp2clFBbVJTN2g2MHdESTlhT0tRQmtVWkZNQXlQV2pJb0FNaWpJOWFBRE5HUlFBY1VaRkFCa1VaSHJRQWNVVUFHClJSa1VBSEZHYUFESW96UUFtYU9LQUZ5S1ROQUJSa1VBR1I2MFpGQUJrVVVBTFJRQW1hTWlnQXlLTWlnWWNVbVIKNjBBUHBzaFBha0lZQ1RTN2pUR0c0MGJqU0FOeG9ER21BdTQwbTQwZ0ZGR1RUQU54cE54cEFHNDlxVEo3MHdFcApjbnRRQWJqUzdqU0FUY2ZXa3kzcWFBRkdSM3BhWUJ1eFNaYWdCUWFYSm9BTnhwUHdvQVRtakpvQU9hUHdINVVBCkdhTnhvQU54cGR4b0FUY2FNbWdBeWFYTkFCazBtVDFvQVhjYU56VUFHVFJ1TkFCdk5HNzJGQUJ1TkdXTkFCa2kKbDNHZ0JNMHU0MEFHVFNaTkFCazBialFBWnpSbkhZVUFMbWs0OUJRQWZnS00wQUx1UGFqZFFBWm9vQU4xSm42VQpBTG1pZ0FvNDlLQUQ4QlNZSG9LQURHS1dnQXpSbjJGQUIrRkdmYWdBK2dGTGoxNW9FR0I2Q2pBb0FUQTlLWDhLCkJoZ1VjZWxBZzQ5QlJ4NkNnQXo3VVpvQU0wY2VsQXd6N1VaSHBRSU1qMEZHUjZVQUdSNlVaSG9LQUhVamRhUUQKY1VtS1l4TVVVQUdLWEZBQlFCUUF0SWFBRW9Bb0FVQ2lnQXhtbHhRQWhGSUJRQXVLWEZBQlNZb0FOdExpZ0FwSwpBQ2pGQUM0b3hRQVlwTVVBR0tNVUFHS1hGQUJpakZBQmlqRkFCaWpGQUJpakZBQmlqRkFDWXBjVUFHS1dnQk1VCllvQU1VWW9BTVV1S0FFeFJpZ0FBb3hRQVlveFFBWW94UUFZb3hRQVlveFFBWW94UUFZb3hRQXRGQUJSUUFVVUEKSlJRQXRGQUJSUUlLS0JoUlFBVVVBRkZBQlJRQVVVQUZKUUFVVUFGSmlnQ1NrUFdrU0pSaW1NVEZGQXd4UlFBVQp0QUNFMGxBQlMwQUZHS0FGb29BS01VQUZKUUF0R0tBQ2lnQW9vQUtLQUNqRkFCUlFBVVVBRkZBaGFTZ0Fvb0FLCktBQ2xvQUtTZ0JhS0FDa29BS0tCaFJRSUtLQUNpZ0Fvb0dGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUEKRkZBQlJRQVVVQUZGQUJSUUFVVUFHYUtBQ2lnUVVVQUZGQUJSUU1LS0FIVUhyU0pFb3BqRW9vQUtLQmhRYUFHMApVQUxpZ0NnQmFLQUNrb0FLS0FDbG9BV2lnUVVsQUJSUU1LS0FDaWdBb29FTFJRQVVVQUZGQUJSUUFVVUFGRkFCClJRQVVVQUZKUUFVVUFGTFFBVVVBRkZBQ1VVQUZGQUJSUUFVVUFGRkF3b29BS0tBQ2lnUVVVQUZMUUFsRkFDMFUKQUpSUUFVVURDaWdRVVVBRkZBQlMwQUZGQUJSUUFVbEFCUlFBNmc5YVFoS0tZd3BLQUNpZ1lVaG9BS0tBRnhSUQpBVWxBQlJRQVVZb0FXaWdBb29FRkZBQlJRTUtLQUNpZ0Fvb0FLS0JCUlFBdEpRQVV0QUJSUUFVVUFGRkFCUlFBClVsQUJSUU1LV2dRVVVBRkZBQ1VVQUZGQUJSUUFVVURDaWdBb29BS0tBRm9vRUZKUUF0RkFCUlFBVVVBSlJRTUsKS0FDaWdRVVVBRkZBd3BhQkJSUUFVbEFDMGxBQlJRTWRRYVJJbEZNWWxGQXdvb0FRbWt6UUFDbkFVQUZGQUNVbApBQlM0b0FYRkJvQVNpZ0Fvb0FXa29BS0tBQ2lnQW9vQUtLQUNsb0FLS0FDZ1o3MEFMUlFJS1RyUUFEZ1V0QUJSClFBVVVBSlJRQVVVRENpZ1FVdEFDVVVBTFJRQWxGQXdvb0FLS0FDaWdBb29BS0tBQ2lnUVVVQUZGQUJTMEFKUlEKQVVVRENpZ0Fvb0VGRkF3b29BS0tBQ2lnQW9vQUtLQUNpZ0IxSTFJa0tLWXhLU2dZWnBLUUJRQlRBY0JSUUlNMApsQXhLS0FGQXBhQkJSUU1LS0FFb29BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tCQlJRQVVVQUZGQUMwCmxBQlJRTUtLQUNpZ1FVVUFGTFFBVWxBQlJRQVVVRENpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0EKb29BS0tCQlJRTUtLQUNpZ0Fvb0FLS0FDaWdBb29BZFNOMXBFaVVVeGlVbWFRd29vQUFLY0tZQlJRQTAwVUFLQgpTNG9BV2tvRUZGQXdvb0FLS0FFcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpCmdBb29BS0tBQ2lnQW9vRUZGQUJSUUFVVUFGRkF3b29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0sKQkMwVUFKUlFBVXRBQlNVRENpZ0Fvb0FLS0FIVWpVaVJLUTB5aEtTZ0JRS1VDZ0JhS0JDRTBoTkF3cFFLQUZvbwpBS0tBQ2lnQXBLQUNpZ0Fvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vCkFLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0VMU1UKQUZGQUJSUUFVVUFGRkFCUlFNS0tBSFVqVWlSS1EweWhLQlFBdExRQVVsQUJSaWdCYUtBQ2lnQW9vQUtUTkFCUgpRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUm1nQW9vQUtLQUNpZ0FvCm9BS0tBRm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29FRkZBd28Kb0VGRkF3b29BS0tBSFVqVWlSS1NtVUpTMEFMUlFBVVVBRkpRQVV0QUJSUUFVVUFGSlFBVWV0QUJSUUFVVUFGRgpBQlJRQVV0QUJTVUFGRkFCUlFBVVVBRkZBQzBVQUZGQUNVdEFDVVk0b0FLTWMwQUZGQUJSUUFVVUFMU1VBRkxRCkFVVUFGRkFnb29HRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkEKQlJRQVVVQU9wR3BFamFLWlFoQUl3UmtlbE9vQUtLQUNrb0FNMEFab0FYRkZBZ29vR0ZGQUJSUUFVVUFGRkFCUwpVQUZMUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQWdvb0dGRkFnb29BS0tBQ2lnWVVVQUFvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUUFVVURDaWdBb29BS0tBQ2lnQW9vQUtLQUMKaWdBcEtBSDBqVWhEYUtZeGFLQkJSUU1TaWdCS2NLQUZwS0JCUlFNS0tBQ2lnQW9vQUtLQUNpZ0FwS0FGcEtBRgpvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0VGRkFCUlFNS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDCmlnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnUVVVRENpZ0Fvb0FLS0JDMGxBQlJRTUtLQUNrb0FmU04KU0VOcGNVeGhSUUlLU2dZVWxBQ2dVdEFCUlFBVVVBRkZBQlJRQVVVQUpTMEFGRkFDVVVBRkZBQlJRQVV0QUNVdApBQ1V0QUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSClFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVDQ2xvQUtTZ0JhU2dBb29HSUtLQUgwamRhUWhLV20KQWxGQXhLS0FDaWdCYUtBQ2lnQW9vQUtTZ0Fvb0FLS0FDaWdBb29BV2tvQUtLQUNpZ0Fvb0FLS0FDaWdCYUtBQwppZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FvCm9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0JDMFVBRkpRQVVVQUZGQXdvb0FkUWV0SWtTa3BqQ2tvR0pTNG9BVVUKVUFGRkFCUlFBbEZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBVQpVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGCkFCUlFBVVVBRkZBQlJRSVdpZ0FwS0FDaWdBb29HRkpRQStnMGlSdEpUS0Nrb0FYRkxpZ0Fvb0VGRkF3b29BU2kKZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLSwpBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vCkFLS0JCUzBBSlJRQVVVQUZGQXdvb0FkU0drU0lhU21VRkdLQUZvb0VGRkFCUlFNS0tBRW9vQUtLQUNpZ0Fvb0EKS0tBQ2lnQW9vQUtXZ0FwS0FDaWdBb29BS0tBQ2lnQmFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQQpDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ1FVVUFGRkFDMGxBCkJSUU1LS0FDaWdCMUlhUWhwcEtZeFJTMEFGRkFCUlFJS0tCaFNVQUZGQUJSUUFVVUFGRkFCUlFBdEZBQlJRQVUKVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRgpBZ29vR0ZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUlLS0FDaWdZVVVBRkZBQlJRQVVVQU9wCkc2MGhEVFFCVEdMUlFJS0tBQ2lnWVVVQUpSUUFVVUFGRkFDMGxBQlJRQVV0QUJTMENFcGFBQ2lnQXBLQUNpZ0EKb29HRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlIzelFBVVVBRkZBQlJRQVVVQUZGQWdvb0FLSwpCaFJRQVVVQ0NpZ0Fvb0dGRkFCUlFBVVVBRkZBQWVLS0JCUzBBSlJRQVVVQUZGQUJSUU1LS0FDaWdCMU5iclNFCkppbEZNWVVVQ0NpZ1lVVUNDa29HRkxRQVVsQUMwVUFGRkFCUlFBVVVDRm9vQUtLQUNpZ0Fvb0FLU2dBb29HRkYKQUJSUUFVVUFGRkFnb29HRkZBQlJRQVVVQUZGQWdvb0dGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUlLS0FDaQpnQW9vR0ZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBZ29vR0ZGQWdvb0FLS0JoUlFBVWxBRDZROWFRaEtCVEFLS0JoClJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVDRm9vQUtLQUNpZ0Fvb0FTaWdBb29BS0tBQ2lnWVVVQUZGQWdvb0cKRkZBQlJRQVVVQUZGQUJSUUlLS0FDaWdZVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tCaFJRQVVVQQpGRkFCUlFBVVVBRkZBZ29vR0ZGQUJSUUlLS0FDaWdZVVVBRkZBRHFROWFRaEtCMHBqQ2lnQW9vQUtTZ0FwYUFDCmlnQW9vQUtLQUNpZ0Fvb0VGRkFCUlFBVVVBRkZBQlJRQVVVRENpZ0Fvb0VGTFFBbEZBQlMwQUpSUUFVVURDaWcKQW9vQUtLQkJSUUFVVURDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW94UUF0SgpRSUtLQUNpZ1lVVUFGRkFCUlFBVVVBRkZBZ3BLQmo2UTlhUWhLQjBwakNpZ0FwS0FDaWdBb29BV2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0JDMFVBRkZBQlJRQVVVQUZKUUFVVUFGRkF3b29FRkZBQlIKUU1LS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQXBhQkNVVUFGRkF3QnlNMApVQUZGQUJSUUlLS0FDbHpRQWxGQXdvb0FkU0drSVE5S0IwcGdGRkF4S0tBQ2lnQXBhQUNpZ0Fvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1dnUVVVQUZGQUJSUUFVVUFGRkFDVXRBQ1VVQUZGQUJSUUFVVUFGRkEKd29vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FNMFVBRkZBQlJRQVVVQUZGQUJSUQpBVVVDQ2lnWVVVQUZGQUR1OUlhUWhEMHBNQWpCRk1ZdEZBQlNVQUZGQUJTMEFGRkFCUlFBVVVBRkZBZ29vR0ZGCkFCUlFBVVVBRkZBQlJRQVVVQUZMUUlLU2dCYUtBRXBhQUNpZ0Fvb0FLS0FDaWdCS0tBRm9vQVNpZ0Fvb0dGRkEKQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQWxGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQzBVQUZGQQpCUlFBVVVBRkpRQS92U0hyU0VOTktLWXdvb0FLS0FDa29BV2lnQktLQUZvb0FLS0FDaWdBb29BS1NnQmFLQUNpCmdBb29BS0tBQ2lnQW9vQUtLQkMwVUFKUzBBRkZBQlJRQVVVQUZGQUJSUUFVVUFGSlFBVXRBQ1VVQUZGQXdvb0EKS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQUtLQUVvb0FXaWdBb29BS0tBQ2lnQW9vQUtLQQpDa29BZlNIclNFTlBTbHBqQ2lnQW9vQUtLQUNrb0FXaWdBb29BS0tCQlJRTUtLQUNrb0FLS0FGb29BS0tBQ2lnCkFvb0FLS0FDaWdBb29FRkZBd29vQVdpZ1FVVUFGRkFCUlFBVVVBRkpRQXRGQUNVVURDaWdRVVVEQ2lnQW9vRUYKRkF3b29BS0tBQ2lnQW9vQUJSUUFVVUFGRkFCU1VBRkZBQlJRQUVaR1A1VXRBQlJRQVVVQUZGQUJSUUFVVUFGSgpRQStrTklRMDBVeGkwVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFKUlFBdEZBQ1VVQUZGQUJSUUF0CkZBQlJRQVVVQUZGQUJSUUFVVUNGb29BS0tBQ2lnQW9vQUtLQUNpZ0JLS0JoUlFBVVVBRkZBQlJRQVVVQUZGQUIKUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFsRkFDMFVBRkZBQlJRQVVVQ0NpZ0Fvb0FLS0JpVVVBUHBEU1FocDZVVQp4aTBVQUZGQUJSUUlLS0FDaWdZVVVBRkZBQlJRQVVsQUJtak5BQm1pZ0F6UlFBVVVBRkZBQlJRQVV0QUJSUUFVClVBRkZBQlJRQVVVQUZMUUlLS0FFcGFBRW9vR0ZGQWdvb0FLS0JoUlFBVVVBSFdpZ0Fvb0FLS0FDaWdBb29BS0sKQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ1FVVUFGRkFCUlFBbEZBeDlJYVFoRFNkcVl3RkxRQQpVVUFGRkFoYVNnQW9vR0ZGQUJSUUFVVUFGSlFBbEZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBdEZBQlJRQVVVQUZGCkFCUlFBVVVBRkZBZ29vQUtLQUNpZ1lVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUNEdlJRTUtLQUMKaWdBb29FRkZBd29vQUtLQkJSUUFVVUFGRkFCUlFBVWRLQUNpZ1lVVUFPcERTRU5QU2p0VEdBcGFBQ2lnQW9vQQpLS0FDaWdBb29BU2xvQUtLQUNpZ0JNVVlvQU1VVUFGR0tBREZHS0FERkdLQURGTFFBVWxBQlJRQXRKUUFVVUFMClJRQVVVQUZGQUJSUUFVVUNDaWdBb29HRkZBQlJRQVVVQUZGQUJSUUlLS0JoUlFBVVVBRkZBQlJRSUtLQmhSUUEKVVVBRkZBQlJRQVVVQ0Zvb0FRNXdjY0dpZ0Fvb0FLS0FDaWdZWm96UUFVVUFGRkFEcWFhUWtKU1V4aTBjNVBIRgpBQzBVQUZGQUJSUUFVbEFDMFVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkpRQVVVQUZGQUJTMEFGCkZBQlJRQVVVQUZGQUJSUUFVdEFoS0tBQ2lnWVVVQUZGQUJSUUFVVUNDaWdZVVVBRkZBQlJRQVVVQUZGQUJSUUEKVVVBRkZBQlJRQVVVQ0Zvb0FLS0FDa29BS0tCaFJRQUdrb0FXaWdBb29FT3BwcEFoRFNDbU1YR2NjNHBhQUNpZwpCS0tBQ2lnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLU2dCYUtBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUU1LS0FDaWdBb29BS0tCQlJRTUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0sKQUNpZ0Fvb0VGRkFCUmtaeG5uMG9BV2lnQktLQmhSUUFVVUFGRkFCUm1nQjFOTklTQ2dDbU1LS0FDaWdCS0tBQwppZ0Fvb0FqTXdFdmxoR1pzYnVNZEtkSEtzbWRwT1ZPQ0NNRVVnSEVnZFRTMHdDaWdBb29BS0tBQ2lnQW9vQWprCm1XTmtVZ2xuT0ZBK21hWUxxTWhjYmlTL2xrWTVVKzlJQ2JORk1Bb29BS1JtS3FTRkxZSFFkVFFBdEFJT2NFY2QKYUFGb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BSwpLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUUFVVUFGRkF3b29BU2lnQjVwdElRVVV3Q2lnQXBLCkJoUlFBVVVBRkZBRmJJR29FRWovQUZYOWFpZGdacDV3eEVlMVk5eW5HVGs5L3dBZXYxcENHT3daSmtMZ2haWXoKZ01UZ1pYUFA1MUtXM1N1aG44c2dxVTU2akE2Yzg4NW9BdEp0M3Zoc3R4a2JzNC9EdFR0dzNiY2pkak9NODRwagpFOHlQWVgzcnRCeG5QSHBTN2xEQmNqY1JrRFBOQUNHUk5yTVhYYXZVNTRGS1dVTUZMREo2RFBXZ0JONllZN2x3CnYzdWVuMW8zcjh2ekQ1dnU4OWZwUUFiMXl3M0Q1ZXZQVDYwb0lJQkJCQjZFVUFWYnZQMm0wQUlCM3QxLzNUVEoKb0ZoOHI1aVM4NFptUFVrZzBoRFJJRkx4bVI4Q2ZhdVgvd0JrSEJQWEhXbXh5R1JZRU16Y3p1cDJ2MUEzWUg2QwpnWXN4S3gzbUpaTXhLQ3Z6bmo1Zjg5YWtsZnlwWnYzamhmSjNuRFpJT1R5TTlQNVVDR05LNkdmeTMzWWpWZ3FzCldJNU9jZStLZE84WXRMaVNDY245M2tZZklVK3VhQmo3ZzdaR2NOdVVBWlZYSVplZW85YytudFJDSXdic08yd2UKWWR4M1l3Tm81ejJvRVcrM3RUQkxHVlZnNmtQOTA1Kzk5S1l4d2RTektHQlplb3p5S2FKWXlpc0hVcS9DblBCKwpsQWgyOVN4WGNOeWpKR2VsTjg2UGFqZVl1MXpoVG5nL1NnWW9kQ3pLR0JaZnZEUElwQk5HVVJ3NmxYNFU1Ni9TCmdCUTZseWdZYmdBU1BTa0VzWlJYRHJ0WWdLYzhIUFNnQmQ2N3ltNGJnTWtaNXhTTExHMjNhNm5lTXJnOWZwUUEKQ1dNN2NPUG1PRjU2MCtnUVVVREZwS0JCUlFBVVVEQ2lnQW9vQUtLQUNpZ1FVVURDaWdBb29BS0tBQ2lnQW9vQQpLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUZvb0VGSlFBVVVBRkZBeEtLQUhIbWtwQ0NpbUF0RkFDVVVEQ2lnQXBLCkFDaWdCQ3FucW9QMUZMaWdBd1BRVVlIV2dCYU9PdEFCZ1l4amlqSE5BZzJqQkdCZzlhTURJT09SMG9BTURuZ2MKOWZlamFPT0J4MDlxQURBNTQ2OWFBTURBNG9BUXFEaklCeFFRRDFBT1BXZ0FLcWM1VWM5ZUtOcW5zUFdnQmNEMAo2MFlIcFFBQlFPZ0F4UmdlZ29BUXFwSUpVRWpvY1V1QjZEbWdCYVRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRCk1LS0JCUlFNS0tBQ2lnQW9vQUtLQkJSUUFVVUFGSnprWXhqdlFBdEZBd29vQUtLQUNpZ0Fvb0FLS0FDaWdBb28KQVNpZ0JhS0FDZ1VBTFJRSUtLQUVvb0FLS0JoUlFBNmtOSVFsRk1ZWm96bWdRVVVEQ2lnUVVVRENrb0FLS0FDbApvQUtLQUNpZ1F0RkFCUlFBVVVBRkpRQVVVQUxSUUFVVUFGRkFCUlFBVWxBQlJRQVVVQUZGQXdvb0FLS0FDaWdBCm9vQUtLQUNpZ0Fvb0FLS0FDaWdRVVVBTFNVQUZGQXdvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0EKS0tBQ2lnUXRGQUJTVUFGRkF3b29BZFNHa0lhd0JHQ0FSNzBVeGdhS0FDbG9BV2tvRUZGQXdvb0FTaWdBb29BVwpnVUFMU1VDQ2xvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQXBLQUNpZ0Fvb0dGRkFCUlFBVVVBRkZBQlJRCkFVVUFGRkFCUlFBVVVDQ2lnQW9vR0ZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFCUlEKQVVVQUxTVUNDaWdBb29BS0tCanFRMGhEVFJUR0ZGQUMwb29FQnBLQUNpZ1lVVUFRRzQyWFBsT01LUU5yZTV6dwpmeXB3aytkdzJBcWdITklCd2tRZ01IVWduR1FhUVN4a0FpUmNFNEhJNitsQURpNmdnRmdDZWdKNjBwT0JrOFVBCk1rblNPQjVjaGxRRThIMHBZeTVCSktFSG9WcGdRSmR0NWNVam9Oc2o3T0R5RG5INDFKRE9KTWhpb2JjeWdaNjQKT0tRRXU5ZDIzY00rbWVhVHpFempldjUwQUhteDlkNjRKeDE3K2xCZFF3VXNvWTlBVHlhTGdMdlhkdDNEZDZaNQpvRHFSa01wR2NaejNvQVVNRG5CQnh3YVdtSUtTZ0FwYUFDa29BV2tvQUtLQmhSUUFVVUFGRkFCUlFBVVVBRkZBCkJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFncGFBQ2lnQW9vQUtLQUNrb0FLS0JoUlEKSUtNVUFGRkF3b29BS0tCQlJRQVVVREhVaHBDR21nVXhoUlFBdEpRQUEwdEFCUlFBVVVBVjJqRWswcXVwS01pagpweDFQZjhxaUtUTEZJSkZFaERLQWNaM0RqbkhxUFQyb0VNYU5tRXVZM2JkTkcyV1VjZ2Jjbmo2R25UeHN5M2UyCk01WUFENWZ2Y1VBT2VQTXNxeVJ1NnlFRlNwSUhRY0huamtaL0dwYmxXWkZLamR0ZFdJOVFEUUJEUEc3TGRNaXQKaDR3b0dPV09Eemo4UVB3cTRPZ29BcldjSUVFWmtRNzFKSURaNE9UemcxR0ltQ0ErV2QzMmdzVHQ1eHU2L2xRQQpBT1pvajVicUZsWWtBY0FFTno3NXlLUVFmNkVvOHI1dk1CSTI4NDM1L2xRQXMwSmI3YnRpNVpBRitYcWNIcFJjCmgzTWdXTi92STNDL2VBSUpKK25wMW9BZkVwRHRISkN6SHpDNnZqajJPZlVEaWxTRmx1bVVZOG9rUzQvMnZUOU0KL1dnQ3hHVk83Q0ZmbTV5TVpQclNoc3NWMm5qdmpnMEFOOHo1RmJZL3pFREdPUjlhZHUrZmJ0UFRPZTFBeHBrKwpSbTJQeG5qSEorbE9MWUtqYVRudjZVQUlHeVcrVnZsL1g2VWJ1Rk8xdm03ZW4xb0FVTjh4RzBqSGZzYVRlZHF0CnNibkhIR1I5YUJDN2p1SzdUd001N0dtN3pzVnZMZkpPTWNaSDYwREhaTzRydFBUT2UxTjN0c1Z2TGZKSUJYakkKK3ZOQUNoaVhLN1NBQU9lTUdrRG5ZcmVXK1RqNWVNajY4MEFMdU84cnRPQU03dU1VZ2NsQTNsdUNjZkx4a2ZyUQpBN2NkKzNhY1l6dTdmU2hHTERKVXJ5Umc0L3BRQXRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSClFBVVVBRkZBQlJRQVVVQ0NpZ0JhTTBBRkZBQ1VVQUxSUUFVVUFKUlFBVVVEQ2lnQW9vQUtLQUNpZ0IxSWFRaHAKb0ZNWVV0QUJTVUFMUlFBVVVBRkZBQlJRQWxMUUFVVUFGRkFDTXlvcFppQUIzTk5XV05tMmh4dXhuSGZIMG9BVgpIVjFES2NxUmtHblVBRkZBQlRZNGtpQkNBakp5Y2trL3JRSWZTVUFGRkF3b29BS0tBQ2lnUVVVRENpZ0Fvb0FLCktBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQXBLQUZvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUsKS0FDaWdRdEZBQ1VVQUZGQXhLS0FGb29BS0tBQ2lnQktLQUgwaHBDR21pbU1XaWdBcEtBRm9vQUtLQUNpZ0FvbwpBU2xvQUtLQUNpZ0NyY0UvYkxZTjl3bHYrK3NjZjFxd1ZCSVA4UTZHZ0NwSEpKS2JOMmNqZWhaZ09oT0Ivd0RYCnFTT1Z6S1lXYjUxZko0L2c3SCtsSUN6UlRBS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW8Kb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0JLS0FGb29BS0tBQ2lnQW9vQVNsb0FLS0FDa29BS0tBQ2xvQQpLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUVvb0FmU0drSVEwZ3BqRm9vQVNpZ0JhS0FDaWdBb29BS0tBRW9vQVdrCm9BV2tvQVIwV1JkcmpJNjBpeHFweU1rOU1saWY1MEFORnZFRmpVS1FJL3U0WThVUkkyOXBKQW9ZOFlVNTRHZjgKYUJFdEpRTUtXZ0Fvb0FTaWdCYUtBQ2lnQXBLQUZvb0FLS0JCUlFNS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaQpnQW9vQUtTZ0FwYUFDaWdBb29BS0tBQ2lnQXBLQUNpZ0JhS0FDaWdCRFJRQXRKUUF0RkFCUlFBVVVBRkZBQlJRCkFVVUFGRkFCU1VBUHBEMXBDRVBTZ1V4aFJRQVVVQUZKUUFVdEFCUlFBVVVBSlJRQXRGQUNVVUFGRkFDMFVBSlIKUUFVVUFGRkFCUlFBVVVBRkZBQzBVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFsRkFCUgpRQVV0QUJTVUFMU1VBTFJRQVVVQUZKUUFVdEFCUlFBVVVBRkZBQlJRQWxGQUJSelFBdEZBQlJRQVVVQ0NpZ1lVClVBSlJRQSttbnJTRWhEMHBhWXdvb0FLU2dBcGFBQ2tvQVdpZ0JLS0FDaWdCYVROQUJSUUFVVUFHYUtBQ2lnQW8Kb0FLS0FDaWdBb29BS0tBRE5GQUJTMEFGRkFCU1VBTFJRQWxGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQQpGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBVVVBSm1rM0QxRks2Q3doZFIvR0IrTkhtSi9mWDg2CkxnSG14OTNYODZWV0RES2tFZXhvdUE2aW1BVVVDQ2lnWVVVQUpSUUErbW1rSkNIcFNpbU1LS0JCUlFNU2lnQW8Kb0FLS0FJakFDU2ZNbEdmUnpSOW5IL1BTWC92czBySUEremovQUo2Uy93RGZabyt6ai9uckwvMzJhTElCREFELwpBTXRaZisrNlBzNC81NnkvOTltaXlEVVg3T1ArZWt2L0FIMmFQSS82YXkvOTlVV0RVUTIvL1RhWWY4RG8removCkFKNnkvd0RmZEZrR29mWi8rbXN2L2ZkSDJjZjg5WmYrK3pSWkJxSDJjZjhBUFdiL0FMN05BdHgvejFsLzc3b3MKR29mWmgvejFtLzc3TkgyWWY4OVp2Kyt6UUdvZlovOEFwck4vMzNSOW1IL1BXYi92NGFka0dvZlpsLzU2emY4QQpmdzBmWlYvNTZUZjkvRy94b0FQc3EvOEFQU2IvQUwrdC9qUjltWC9ucE4vMzliL0dqUVFuMlZQK2VrMy9BSDliCi9HbCt5cC9mbS83L0FEZjQwcklZRzFUKy9OLzMrZjhBeHBQc2tmOEFmbS83L3Y4QTQwV0FYN0pIL2ZtLzcvUC8KQUkwZlpZeC9GTi8zK2Y4QXhvQVBzMGY5NmIvdjgvOEFqUjlrai92VGY5LzMvd0FhQUQ3SkgvZm4vd0MvNy80MApmWlkvNzAzL0FIL2YvR21BZlpJLzcwMy9BSC9mL0dqN0pIL2ZtLzcvQUwvNDBBSDJXUEgzcHY4QXY4LytOSDJXClArOU4vd0IvMy94b0FQc2tmOTZiL3Y4QVAvalI5a2ovQUwwMy9mOEFmL0dnUWZaSS93QzlOLzMvQUgveG8reXgKbitLYi92OEFQL2pRQWZaWS93QzlMLzMrZi9HbCt5eC8zcGYrL3dBLytOQVdEN0xIenpMejZ5dC9qUjlsaS82YQpmOS9HL3dBYUFEN0xGL3QvOS9HL3hvK3l4LzhBVFQvdjQzK05Bdyt5eGY3Zi9meHY4YVQ3TEYvMDAvNytOL2pRCkFmWkl2Ui8rL2pmNDBmWll2UnYrKzIveG9BUHNzWCszL3dCL0cveG8reXhmN2Y4QTM4Yi9BQm9BWDdORjZOLzMKMmY4QUdqN05GNk4vMzJmOGFCQUxhTCs2ZisralI5bWgvdWZxYUFEN05EL2MvVTBmWm9lZjNZNXBXUXcreXdmOAo4MW8reXcvODh4UlpBSDJXRHI1U242MG4yUzMvQU9lS2ZsVEFYN0piL3dEUEpmeW8reVc1NndvZndvQVQ3SmIvCkFQUEZQeW8reDIvL0FEeFQ4cUFEN0piL0FQUENQL3ZrVWZaTGIvbmhILzN5S0JXRDdKYi9BUFBDUC92a1VmWTcKYi9uM2kvNzRGS3lHSDJPMi93Q2ZlSC92Z1VmWTdYL24yaDQvNlppaXlBUHNkci96N1EvOSt4Uy9ZN1hwOW1oLwo3OWltQWZaTGIvbjNpLzc0Rkw5bXR4MGdpLzc0RkYyS3lGRUVJNlJSai9nSW84aUwvbmtuL2ZJb3V3c2hSRkdPCmthRC9BSUNLY0FBTUFBRDJvQ3d0RkF3b29BS0tBQ2tvQUtLQUgwaHBDRUk0b0ZNQmFLQUVwYUFFeFJRQVVVREQKRkZBQlJRQVVHZ0JLV2dBb29BS0tBQ2tvQUtXZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtTZ0JhS0FDbG9FSgpSUU1LS0JCUlFBVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtTZ0FwYUFDaWdBb29BCktLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQWRTVWhBYVFkS1lDMFVBRkxTQUtURkFCaWpGTUFvb0FUTkcKYUFDaWdBb3pRQVVVQUZGQUMwVUFKUlFNV2tvRUZGQUJSUU1LS0JCUlFBVXVPbEFCaWpGQUJpakZBQmlqRkFCUgpRQVlvb0FLS0FDaWdBeFJpZ0Fvb0FLTVVBR0tNVUFHS01VQUZGQUJpaWdBeFJpZ0F4UmlnQXhSUUFsRkF3b3hRCklXa3hRQVlvb0dGRkFCUlFBVVVDQ2xvQUtLQUVKd01uOUJTMEFGR0tBQ2lnQXhSUUFVVUFGRkFDMDBnazhVZ0cKa1BqdCtkQURZN2ZuVEFYbjJwUnU5cUFEbWpuMm9BT2FXa0FtVFNnMHdEbjFGSjgxSUE1OXFUbW1BYzBVRENqdgpRQUFtaWdBelJRQVpvNW9BS09mU2dCZWFTZ0F6UlFBVWMrbEFoZWFLQURuMHBQd29BV2pKOUtBRnlmU2szSDBwCkFMazBaOXFBRFB0UmsrbEFCejZVblBwUUF1VDZVbVQ2VUFHVDZVWlBwVEFNbjBveWZTZ0JlZlNrSlBvYVFCdVAKOTAwYnY5azBBSnU5alM3ajZHbUFaUHBSdVBvYVFCdVBvYU4zc2FBRGQ3R2pKOURUQU1uMHBOM3NhQUYzZTFHZgphZ0EzSDBwTi9zYUFGMzU3VWJqL0FIVFFBWlBwUm1nQTU5S1RkanNhQURmN0g4cVhQdFFBYzBaOXFBRFBzYUtBCkNqbjBvQU9mU2pkN1VBR2UrS1RmN0dnQTNmN0ovS2pKL3VtZ0F5MzkwMHVUL2ROQUJrK2xKdVA5MDBBRzQvM1QKK1ZMbHV5bWdBeTM5MmtKUDkwMEFHVy91bWt5MzkwMEFHNC8zVFNibS91bWdaTlREU0VocE5KbmltTUJrMHRBQgprMFpvQU1taWdBcE9hQUROTG1nQXpTNW9BTTBab0FTaWdBb29BS01VQUZGQUJSelFBYzBjMEFGRkFCUzVvQUtNCjBBSlJRQVVVQUZGQUJSbWdBeWFYTkFCbWpOQUNabzVvQVdpZ0JPYU0wQUxSUUFab3pRQVVtVFFBWk5MbWdBelIKbWdBelJRQVVVQUpTMEFKUzBBRkZBQlJRQVVVQUZGQUNVdWFBRE5MUUFacEtBRG1qSm9BVVVab0FNMFpvQU0wWgpvQU0wWm9GWU0wYnFBc0c2amRRQWJxTjFBdzNVYnFCRHFhZWFRSVEwZ0ZNWXVLS0FFb29BWEZHS0FDakZBQmlqCkZBQ1VZb0FLV2dBeFJRQVVZb0FLS0FDaWdBb29BS01VQUdLS0FDaWdBb29BU2xvQUtNVUFGRkFCUmlnQk1VWW8KQUtYRkFCUzBBSlJRQVVVQUZGQUJSUUF0SVJRQVlveFFBbEdLQUZvb0FLS0FGb29BU2lnQW9vQUtXZ0JLS0FDaQpnQW9vQVdpZ0Fvb0FLS0FDakZBQmlreFFBWW94UUFVVUFGR0tBREZHS0FERkdLQUV4UmlnQ1NtbmlrSkNVaTlLCll4MUZBQ1VVQUZMUUFVVUFGRkFDVVVBRkZBQlJRQXRGQUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUEKVVVBTFNVQUZGQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQQpGRkFCU1VBTFJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVsQUQ2WVR6U0Vnb0hTbU1XaWdBb29BCktLQUNpZ1FVVUFKUlFNS0tBQ2lnQXBhQUVvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwYUFERkdLQUQKRkZBQlJRQVVVQ0NpZ0Fvb0FLS0JoUlFBVVVBRkZBQlJRSUtLQmhSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQQpGRkFCUlFBVVVBRkZBQlJRQVVVQ0NpZ0Fvb0FLS0FDaWdBb29HT3BtS1FrRkM5S1l4YUtBQ2lnQW9vRUZGQUJSClFBVVVEQ2lnQW9vQUtLQUV6bWlnQmFTZ0JhU2dCYUtBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0JCUzBBRkZBQlJRQWwKRkFCUlFBVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdRVQpVREVwY1VBRkZBQlJRSUtLQUZwS0FDaWdZVVVBRkZBRHFiU0VnTk5YcFRHT29vQUtLQUNpZ0Fvb0VGRkF3b29BCktLQUNpZ0FwS0FDbG9BS0tBQ2tvQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vRUZGQUMwbEFDMFVBRkZBQ1UKVUFGRkF3b29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnQW96UUFVVUFMUlFBVVVBRkZBQlJRQQpVVUFGRkFCUlFJS0tCaFJRQVVVQUpSUUErbTBoSVNrRk1ZNmlnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1NnCkFvb0FLS0FDbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29FRkZBQlJRQVVVQUZMUUFsRkFCUlFNS0sKQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQktXZ0JLTVVBRkZBQlJRQXRGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQgpSUUFVVUFGRkFDVVVBU1V3MGhJU2tYcFRHT29vQUtXZ1FsSlFNS0tBRm9vQVNpZ0Fvb0FLS0FDaWdBb29BS0tBCkNpZ0Fvb0FLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BQlJRQVVVQUZGQUJSUUFVVUFGRkEKQlJRQVVsQUJSUUFVdEFCUlFBVVVBRkZBQlNVQUZGQUJSUUFVVUFGRkFCUlFBdEZBQlJRQVVVQUZGQUJSUUFVVQpBRkpRQkpURFNFaEtGcGpGb29BS1dnUWxGQXhLS0FGb29BVEZHS0FDaWdBb29BS01VQUZHS0FDaWdBb29BS0tBCkNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLVE9hQUZvb0FLTTBBRkZBQlJRQVVVQUZGQUJSUUEKVVVBRkZBQlNVQUxSUUFVVUFGRkFCUlFBVVVBRkppZ0JjVW1LQUNsb0FLS0FDaWdBb29BS0tBQ2lnQW9QSXhRSQpLS0JpVVVBUHBwcENRVWdwakZwYUJDR2t6UU1NMHRBQlNVQUxSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGCkFDVVVBRkZBQlJRQVVVQUxSUUFsRkFDMFVBRkZBQlJRQVVVQUZOWlEzV2dBQ2tmeFordEtBZTlBQzBVQUZGQUIKUlFBVVVBRkZBQlJRQVVVQUZGQUJTVUFMUlFBVVVBRkZBQlJRQVVVQUZGQUJtbG9FSlJRTUtLQUNpZ0Fvb0FLSwpBQ2lnUVVVQUZGQXhLS0FIMDJrSkJTQ21NV2xvRUpTVURDbG9BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBCm9vQUtTZ0E1ejE0b29BS0tBQ2lnQXBhQUNpZ0JLV2dBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb28KQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtTZ0JhS0FDaWdBb29BS0tBQ2lnQW9vQUtLQkJSUUFVVQpBRkZBd29vQWRUVFNFaEtLWXd6UmttZ0Fvb0FXaWdBb29FRkZBd29vQUtLQUNpZ0Fvb0FLS0FDaWdBcEtBQ2lnCkFvb0FLS0FDaWdBb29BV2tvQUtXZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb28KQUtLQUNpZ0Fvb0FTaWdCYUtBQ2lnQktXZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FIVQowMGhJS1NtTURSaWdCYUtBQ2lnUVVVQUxTVURDaWdBb29BS0tBQ2tvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBCkNpZ0Fvb0FLS0FDaWdBb29BS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBcEtBQ2lnQXBhQUNpZ0Fvb0FLS0FDa28KQUtLQUNpZ0Fvb0FLS0FDaWdBb29BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BVGNDY2Q2S0FIMDJrSkJSVApHRkZBZ29vQUtLQmhSUUFVbEFFZm5ISi9kU2ZrUDhhVHpqL3p4bC9JZjQwdFFEenovd0E4WmZ5SCtOSG5IL25qCkwrUS94bzFBUE9QL0FEeWsvSWY0MGVjZitlTXY1RC9HalVBODQvOEFQS1gvQUw1bzg3L3BsTC8zelFGdzg4ZjgKODVmKytEU2VlUDhBbm5ML0FOOEducUYwSG5qL0FKNXkvd0RmQm84OGY4ODVmKy9abzFDNkR6eC96emwvNzROSApuLzhBVEtYL0FMNW8xQzZGODcvcGxMLzN6U2VlZitlTXY1RC9BQnBBTDV4LzU0eS9rUDhBR2p6ai93QThKZnlICitOR29CNTdmODhKZnlIK05JWm0vNTk1Zi9IZjhhZW9BWm4vNTk1Zi9BQjMvQUJvODUvOEFuM2wvOGQveHBDdUgKblA4QTgrMHY1ci84VlI1ei93RFB0TCthZi9GVURGODEvd0RuMmwvTlAvaXFUenBQK2ZXYjgwLytLb0FQT2svNQo5cGZ6VC80cWw4NlQvbjJsL05QL0FJcWdBODZUL24ybC9OUC9BSXFrODUvK2ZhWDgwLzhBaXFBRHpuLzU5cGZ6ClgvNHFnVFNmOCtzdjVwLzhWUUF2blNmOCswdjVwLzhBRlVlZEpuL2oybC9OUC9pcUFEenBQK2ZXYjgwLytLbzgKNlQvbjFsL05QL2lxWUI1MG4vUHRMK2FmL0ZVZWRKL3o3Uy9tbi94VkFyaDUwbi9QckwrYWYvRlVlZEovejdTLwptbi94VkFCNTBuL1B0SithL3dDTkhteWY4KzBuNXIvalFGdzgyWC9uM2IvdnBmOEFHanpaZitmZC93RHZwZjhBCkdnTGkrWkwvQU04Ry93QytoU2ViTC96N3QvMzBQOGFBdUhteS93RFB1My9mUy80MHZtU2Y4OEcvNzZIK05BN2kKZVpML0FNOEQvd0I5Q2p6WmYrZmR2KytoUUs0ZVpMbi9BRkRmOTlDanpKcy82ai94OFVEdUhtVGY4KzUvNzZGSAptUzUvMUIvRmhRSzR1K1gvQUo0LytQMG0rYi9uaVA4QXZ1bHFNTjgzL1BFZjk5Ly9BRnFOOC84QXp4VC9BTCtmCi9XbzFBTjAvL1BKUCsvaC93bzNYSC9QS1AvdjRmOEtBRGRjZjg4WS8rL2gvK0pwTjl4L3p4ai83K0gvNG1nUWIKN2ovbmpILzM4UDhBOFRTbHJqL25sSC8zOFA4QThUUUFtKzQvNTR4LzkvRC9BSVViN2ovbmpILzM4UDhBOFRRRgp4ZDF4L3dBOG92OEF2NmYvQUltamRjZjg4b3YrL2gvK0pvR0c2NS81NVJmOS9ULzhUUnV1UCtlVVgvZncvd0R4Ck5NUVp1UDdrZi9mWi93QUtYOS82Ui9tZjhLQUFlZjM4djlhTVQrc2Y1SC9HZ1ltTGorL0Yvd0I4SC9HbDIzSC8KQUQwai93QytEL2pTQU1UL0FOK1AvdmcvNDBZbi92eC85OEgvQUJvQU1ULzM0LzhBdmcvNDB1MmJqRWtmL2ZzLwo0MHdGUVNBbmV5dDZiVkkvcWFmUUFVVUFGRkFCUlFCRVl3cmJsNis5Tjh5WCs0T25yM3BBV3FaUUpDMGxNQW9vCkFLS0FDaWdZVVVBSlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlEKQVVVQUZGQUMwVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUNVVUFGRkFCUlFBVVVBTFJRQWxGQUJSUUFVVUFGRgpBQzBVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBZ29vR0ZGQUNVbUJRQkxVWjYwaElXZ1V4aFJRQVVVQUZGQUJTClVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkYKQUMwVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVdEFCUgpRQVVVQUZGQUJSUUFVVUFGRkFCUlFJS0tCaVVVQVBwcHBDUWxGTVl0RkFCUlFBVVVBSlJRQVVVQUZGQUJSUUFVClVBRkZBQlJRQVVVQUZGQUJTVWdGcEtBQ2ltQVVVZ0NpZ0Fvb0FLS0FDbHBnSlMwQUZGQUJSUUFVVUFGRkFCUlEKQVVVQUZGQUJSUUFVVUFHYU8xQUJSUUFVVUFGRkFCU2RxQUZORkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTMEFGRgpBQlJRQVVVQUZGQUJSUUFVVUFKUlFCSlREU0VoS0tZeGFLQUNpZ0Fvb0FLU2dBb29BS0tBQ2lnQW9vQUtLQUR0ClJRQVVVQUZKNjBBTFJRQWc3MHRBQlJRQWQ2QlFBVVVBSHJTZXRBQU9sTFFBVUNnQW9vQU8xRkFCUlFBZDZLQUEKMFVBRkZBQlJRQVVVQUdLS0FDaWdBb29BS0tBQ2lnQW9vQUtURkFDMFVBRkZBQlJRQVVZNW9BS0tBQ2lnQXBhQQpDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0JLS0FIMDAwaElLU21NV2lnQW9vQUtLQkJSUU1LS0FDa29BS0tBQ2lnCkFwYUFFb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FFcGFBQ2lnQW9vQUtLQUZvb0FLS0FDaWdBb29BS0tBQ2kKZ0Fvb0FLS0FDa29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2dVQUxSUUFVVUFGRkFCUlFBVQpVQUZGQUJSUUFVbEFCUlFCSlREU0VncEtZeGFLQUNpZ0Fvb0VGRkFCUlFNS0tBRW9vQUtLQUNpZ0Fvb0FLS0FDCmlnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBRm9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVMKaWdCYUtBQ2tvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQURBeFMwQUpTMEFGSlFBdEZBQlJRQVVVQUZGQUJSUQpBbExRQWxGQUQ2YWFRa0ZKVEdGRkFCUzBBRkZBQlJRQVVVQUZGQUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGCkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFsTFFBVWxBQzBVQUYKRkFDVVVBRkZBQlJRQVVVQUZGQUJSUUFVdEFDVXRBQlJRQWxMUUFVVUFGRkFCUlFBVVVBRkZBQlJRQWxGQUQ2YgpTRWdwS1l4YUtBRXBhQUNpZ0Fvb0FLS0FDaWdBcEtBQ2lnQW9vQUtUblBRWW9BV2lnQW9vQUtLQUNpZ0Fvb0FLCktBQ2lnQW9vQUtLQUNsb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNrb0FXa29BS1dnQW9vQUtLQUNpZ0FwS0EKQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCS0tBSDAwMGhJS0tZdwpvb0FTbG9BS0tBQ2lnQW9vQUtLQUNpZ0JLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLV2dBcEtBQ2lnCkFwYUFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwS0FGcEtBQ2lnQmFLQUNrb0FLTTBBTFJRQWxGQUJSUUFVVUEKRkZBQlJRQVVVQUZGQUJTMEFKUlFBdEZBQlJRQVVVQUZGQUJSUUFVVUFKUlFBK20waElLS1l3cEtBRnBLQUZvbwpBS1NnQW9vQVdpZ0Fvb0FLS0FHazQ2MHRBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUxSClFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVbEFDMFVBSlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVUKVUFGRkFCUlFBVVVBTFJRQVVVQUZGQUJSUUFVVUFGRkFDVVVBUE5OcENRVVV3Q2lnWVVsQUMwbEFCUlFBVVVBTApSUUFVVUFGSlFBaktHR0NBUjcwdEFCUlFBVVVBSlMwQUZGQUJSUUFVVUFGRkFDMFVBRkZBQ1VVQUZGQUMwVUFGCkZBQlJRQVVVQUZGQUJSUUFVVUFGSlFBVVVBRkZBQlJRQVVVQUZGQUJSUUF0SlFBVVVBRkZBQlJRQVVVQUZGQUIKUlFBVVVBRkxRQVVVQUZGQUJSUUFVVUFGRkFCUlFBbEZBRDZiM3BDUVVVeGhSUUFVbEFDMGxBQlJRQXRGQUJSUQpBVWxBQlJRQVVVQUZKUUF0RkFCUlFBVVVBRkZBQlJRQVVVQUZMUUFVVUFKUlFBVXRBQlJRQVVVQUZGQUJSUUFVCmg0b0FXa29BS1dnQW9vQUtTZ0Fvb0FLS0FDbG9BU2lnQW9vQUtLQUZvb0FTaWdBb29BS0tBQ2lnQW9vQVdrb0EKS1dnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCS0tBSDAya0pCU0NtTVdpZ0Fvb0FLS0FFb29BS0tBQ2lnQW9vQUtLQQpDaWdBb29BS0tBQ2lnQW9vQUtTZ0JhS0FDaWdBb29BS0tBQ2lnQXBhQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnCkFvb0FLU2dBb29BS0tBRnBLQUNpZ0Fvb0FLS0FFcGFBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDbG9BS0tBQ2lnQW8Kb0FLS0FDaWdBb29BU2lnQjlNNzBoSVdpbU1LS0FDaWdBb29BS1NnQXBHWUtDU1FBTzVvQXFTNnBaeEhhWmd4LwoyUm4rVlYyMXkyejhxU3QrQS94cHFMQUJya0I2eFM1N1l4L2pVMFdyV2toQUxsRC9BTFF4UTRzQzVISWtpN2tkCldIcURtblVnQ2lnQW9vQUtLQUNpZ0Fvb0FTaWdBb29BV2lnQW9vQUtLUUJSVEFLS0FGb29BS0tBQ2lnQW9vQUsKS0FDaWdBb29BS0tBRW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVdrb0FLS0FDaWdBb29BV2lnQQpvb0FLS0FDaWdBb29BS0tBQ2lnQktTZ0NRMHp2U0VoYUtZd29vQUtLQUNrb0FLUm1DZ3N4QUE1Sk5BR2ROcWhrCmZ5cktQenBPNTdDcWswVFNReXpYMXl6bUxyRW5HMDloNmZwVnBXQXRXTmhzTzZhQzNDRVpBNVpnZmNtb3JHOFAKbVNvRlJtY3MwUUJHZVA0VDZkS053TEdsSjVsbHVtUUVzN0hrWnp6VU1zQzNFMHFXMXRiZ1IvS1daU01uMEdLTAo2Z1ZMaTJXejJ5cGNDQ2JHVEdDU1FmcU8zMXFlMTFpUkF2MnBDeUhvNmpHZjZVTlgxQTFvWm81NHc4YkJsUGNWCkpVQUZGQUJSUUFVVUFGRklCS0tZQzBsSUJhS1lCUlFBVVVBRkZBQlJRQVV0QUJSUUFVVUFGRkFCUlFBVVVBRkYKQUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCbWlnQW9vQUtXZ0FwS0FGb29BS0tBQ2lnQQpvb0FLS0FDaWdBcEtBQ2t4UUJJYWFldElTRW9GTVl0RkFCUlFBVWxBRFpaRWlqWjVHQ3FPcE5ZTjllU1hRM1kyCjI0YkNxZURKVFhjQ2V6UVhETWlUdkFWNWpXTTRCWDFQY25QV2tXSjd2YklmbVdYTVUyenBrZEcvUVZWd0VudTUKb1VFVDNjVGJlUDNReXpmWHNLSVpveEZFc05oTzNsa0VPb3dTZnJpaTNZUFVkYlR0YURtMXZBdU9qSElIMDRGSgpEZHFKNVd0cm1KUkkyU2t5a1lQdFJZQ1ZaNExXOHVmdEp3emtNckZjNVhIUVZFTnd0amJMQWMzRGxrWHI1YWNjCmtkcUFJbDh6VExsdkprTTBTNDh3QWRQcjcxdFc4OGR6RUpJbXlwL1NsSmRRSmFLa0Fvb0FLS0FDa29BV2lnQW8Kb0FLS0FDaWdBb29BS0tBQ2lnQW9vQVdpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQktLQUNpZ0Fvb0FLS0FDaWdBbwpvQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtXZ0Fvb0FLS0FDaWdBb29BU2lnQW9vQWZUVFNFaEtCClRHTFJRQVVVQUpSUUJsVEZ0VHUydHdTTGVJL01SL0VhaXVqRkxFWWl2MldhTStXRC9DUjZaOUQ3MWZrQlZaNFUKVlBNamRWWHNHK1luR0dIc01qOWF1V3RsY1R4NGxZd1d4NlJLZVNQZWpaQWFOdloyOXZqeW9sQi92ZFQrZFRWRApkd0NvYml6dDduL1d4aGo2OUQrZENkZ0tNbHBjMlRCN1JqSkVPVEUzT1BwVEVubGtsbXVMVlVMTW9FZ2tQTVpICjh4VjZNQmdadHNkdkZsbG1rL2VUa2Y2dzl3UGFtSk9OTnZXV053OXV6WVpRYzdUL0FJMGVRRzZyQmdDRGtFWkYKTFVBRkZBQlJRQVVsQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUMwVUFGRkFCUlFBVVVBRkZBQlJRQVVsQQpCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJTMEFGRkFCUlFBVVVBCkZKUUF0SlFBVVpvQWZUYVFrQnBLWXdwYUFDaWdBcWpxMXdZYmJZbWZNbCtWY1UxcXdFWFRrK3dMYms3V0h6RmwKL3ZldFJIYmJSeVN6TkkzV014djh3YzlzSEhJLyt2VHZjQ3Q5bVlMTlBPb1NjeCtiSHQ0QzRQUEh0eCtkYUMzTApYS3hKRWRoZFNYT09WeHdSOWMxTGVvaDd4bTNYekkyZHR2TEt6RnR3NzllOVdBUXdCQnlEeURTR0ZGTUNwTmZvCmo3SWthWnM4aEtaZldyWk56YmNUcjFBL2pIb2FhQXJYRW91b0liaEhNTU1ZTy9iMVU4REFxcmNUdDlrTUNXb2oKajRiT2NrZTUrdFVCYjBTN1p3WUdiTzBaWDJGYTFTOXdGb3BBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVQpVQUZMUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVsQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVClVBRkZBQlJRQVVVQUZGQUJSUUF0RkFCUlFBVVVBSlMwQUZKUUFVVUFQcHRJU0EwbE1ZVVVBTFJRQVZsT0RkNncKd1U4UUp3U01nTi8rditWTkFXRWE1M2VWSklGa3huY0kvbHgwNE9mY1ZDZ04xcVcyUnQ2V3FqdGpMbnYvQUo5SwplaUFzYWpFWHRtWkJsMEJ3UFVFWUkvS3FheUMwdVlyaHN0SE5GOHhYbkRjWlA2VkFqVlZsZFF5a01wNkVjMVh0CkhDcEpHU0FJbktqNmRSK2hvR0xMZTIwU2t0TXVCL2RPZjVWVUUwMS9KdFJOc0tzVmRXNElHT3Z2OUthMUF0MjEKcXNIT1M3N1F1OXV1S2ZES3N5Rmt6d1NDRDFCRkRBeEx6WUpISzdsaHVGTEJjZEhCL3dBZjUwMmFWNXJYWkFtZAo1M1NrREFMZlUxYTFBcjJVZ3RyNk4zNkszT0RuK1ZkUW1jYzBwQU9vcVFFb29BS1dnQW9vQUtLQUNpZ0Fvb0FLCktBQ2lnQW9vQVdrb0FXaWdBb29BS0tBQ2lnQW9vQUtLQUVvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0EKb29BS0tBQ2lnQW9vQUtLQUNpZ0FwYUFFb29BV2lnQW9vQUtLQUNpZ0Fvb0FRMGxBRWxKU0VoS1FVeGkwbEFCUgpRQUU0R1RXTFpNNXQ1Wm8wbU1ra2hPNUJrREhQSXozeWFwQVRwY3RjU3I5b0tSaU1lWjVXeHM4RFBKT0JVbWpwCi9vaGxJK2FWaXhQNDBQUkFYNnB4VzVXUXhNQ0VqY1NSTU8yYzVYK2Y0R3BBU1hUWW1rTWtXSTJQVWJjZzFCT3QKcnAwV1NxeXprOGJoa24vQ2dRa0ZuSmVNSnJ2aGVSNVdPQi9oV29BRkFBR0FCZ0NteGhWYTMrUzh1WStnSldRZgppTUg5UlVnWitwUmhZNStCbUtRU3JuMGJyK29OSkZieG1SVGRDVm9HMitUeVNPUjA0NmYvQUZxdE95RUpyRm5ECkJFa2tLQkNXd2NHdGUyZnpMZUp5Y2xsQkovQ2h1NkdObHVWUmlpQXlTRCtGZTMxOUtoRU0xMDI2NWJiRjJpWGoKUDFxQUx0Rk1Bb29BS0tBQ2lnQW9vQVR2UlFBdEZBQlJRQVVVQUZMUUFVVUFGRkFCUlFBVVVBRkZBQlNVQUZGQQpCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGSlFBVXRBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBdEZBQlJRCkFVVUFGSlFBVWxBRWg2VTJrSkJSVEdGRkFDVVVBTmtPSTJKT01BOCtsWk9tdmNSNmNEQkVyNVk1SlBJNmRCMy8KQURwb0JmT01zTnlaWlg4OVVZTEd3MmZManJ0cTlwd3hZUVkvdUNtd0o5Nmxpb1liaDFHZVJWUk5UdG5tRVlMRApjY0t4WDVTZlkxTnJnUjNlbzRETGI4NDRhWEdWUTArS3hqYUIyWnZNa21URFBuSUp4MUZBRTFxNi9aRmxQR1YzCk1mZkhOSkJjUGNXclNJZ0Q4N1ZKejlLUUJETzVNaTNBUkdqQUpLbmpCK3YwcUM0dWtqdjQvTC9lT3k3R1ZlU08KUVFmNTAwQlcxRzFtK3ptYVpnOGdCVmluQUF6a2Y1OTZZYnA3YTN0WlpFUnNMaU5NKzMzcXJjQ3JjMzh0M0NFbAoyNEJ5TURGYTluSExKWnhLejdJOW8rNTFJK3ZiOEtKSldzQmJqalNKZHNhaFI3VStwQUtXZ0Fvb0FLS0FDaWdBCm9vQVNsb0FLS0FDaWdBb29BV2lnQW9vQUtLQUNpZ0Fvb0FLS0FFb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0EKQ2lnQW9vQUtNVUFHS1RwUUF0RkFCUlFBVVVBRkZBQlJRQVVVQUZMUUFsTFFBbExRQVVVQUpSUUFVVUFQcGxJUwpGcEFjMHhpMFVBRkpRQWhHUmc5NnhkTVdjb2doZmJzZDFiSXlBQ0FRY2ZVVlNBbmFPUjdqeVh1RE8vbHNHQWpBCkM1QjZuK2xKYXl6blIxTnRneW9TQ0NNOUQwL0tnQ3JMZHlpV082YUFvWEd4eXA0Y2Vuc2FkYVc4bDNISEMwMFoKZ2pja0E0M2tmU2gyUUdqUERISDVFY2NhcXJUQWtLTWRBVC9Tck1TYkl3dkhGU0JUS243RGR3anFoY0FleEdSLwpPbEVzY000ZE5xbzhXOStRQm5qYWZxZWFRRkNPTzQxRzRkeXBTTm13K2Y0Y2NESHFhdnkyNlcwY2NxamMwVEFzCjUrOHc2SEoraHFub3JDRzZ6SnNzR1h1NUFIOC82VlhEMjExSEhhcDVZSVhZSkdYSjRIT0tGZTJneXBmMnR2YnEKdmxUZVk1YkJHUndLM3JkUEx0NDB4amFvSDZVM3NCSlJVZ0xSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUxSUQpBVWxBQzBVQUZGQUJSUUFVVUFGSlFBdEpRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSClFBVVVBRkZBQlJRQVVVQUZMUUFsRkFCUlFBdEpRQXRKUUFVVUFGRkFEelRhUWtKU0wzcGpIVVVBRkZBQ1ZrVzgKUml2N3EzVjJqOHo1bFplby93QTVwb0NDWW5TNUI1RTZTU0ViV2oyZnFjSHJWeXljd1gwc0RjQ1ZSS294akI3agovUHBWUFZBVHBwMEMzRHpFWjNIT3c5QWZXcWtFR3l4bWtJQ3lJN01ISDNoai93RFVhaGlMMTF3OXUzWVNqOVFSCi9XbU04OEVZbmQ5eTV5NkVBYlFmVDZlOUlZMmU0VzJ1eUc1ODVRRkgrME9QNmlvYmJUL01CZTRUWXJqbURKd0MKRHdjNS93QTVxbHBxQnBBWUdCMHF2SzZ6bzhLTDVnSUtzYzRVZmovaFNBemJtVld2bE1raGtTQWIzSXhqUG9COQpjVlVqTWJPWlZ1akF5TmxRNDNkZmNmNFZhMFFFZ2hqZTh0b1kyODNvOGpmM2llVCtncm9hVWdDbHFRQ2lnQW9vCkFLS0FDaWdBb3BBRkZNQW9vQUtLQUNsb0FLU2dCYUtBQ2lnQW9vQUtLQUNrb0FLS0FDaWdBb29BS0tBQ2lnQW8Kb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2xvQUtLQUNrb0FLS0FDaWdCOQpOcENRaHBCVEdPb29BS0tBRXJMMWxURkxCZHJuS0hhZnAvbk5OYmdSNGprbGdXeXR5MFNIZVQwQmJ0a24wcDF4CkhOTXpEY3B1b01PQ2d3Qm4rSDM5YXIxQXUyVjBsMUNHQnc0NGRmUTFUdTUvSTg2MVZDMGt6SFlQWmh6K3VhaXcKRlc4bnVwbkFjZVRKQ04vbDlpTTlSNi8vQUZxdUpkTnFRV0pJbVdJLzYxajdjNC9HcWFBbmF5U081VzVoVExsOAp2azlqL25OV0pKbGpPM0JaejBWZXRTMkF6eW5sNW1PRi93Q2Vhbmo4VDNxRFVieU96dHlpOE93d2lqdDcwSURNCnM0WjU0WmxYWUFlWkhrR1NUMUdLZ3NGWkxqelE0Vll1WGJqcDA0OWEwQTA5SFJwWGx2SkI4MGpZWDJIK2VQd3IKVXFKYmdMUlNBV2lnQktLQUNpZ0Fvb0FLS0FDaWdBb29BS1dnQktXZ0Fvb0FLS0FDaWdBb29BS0tBRW9vQUtLQQpDaWdCYVNnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBcEtBQ2xGQUJSUUFVVWdDaW1BVVVBRkZBQlJRQVVVQUZGQUJSClFBdEZBQlJRQWxGQUJSUUE4MDJrSkNVQ21NV2lnQW9vQUtqbmlFMEx4TjBjRVVBWUdicTJjV0RnTWhiTzNPTjQKOU0raHExUGFmWklDeS9OTzUrUlYrNm5IVWZRZDZ2UUJDMGJ6Q2JUNXYzNUEzS3d3SDl2clQybWh2MUh6Zlo3dQpJL0tHNE9mVDNwV0FmQkZjWFYzSGMzRVFoV01FQk81UCtGWGdJYldJa0JJa0hKeHdLVGZRQ05aWkxnL3VsTWNmCi9QUmh5Zm9QNm1wWTRraUIyanJ5U2VTZnFhUUZLODFOWTNNTnVwbG1QQXh5Qi9qVkQ3SlBkcTl3OHFUU0tlWXMKOVBiMnExcHF3SVpwVWpRQzBta0htRDk0cmRRUjcxREJCSmNUTENuSlBVamtBVlFIVXhSckZFc2EvZFVZRk9ySQpCYUtBQ2lnQW9vQUtLQUNpZ0FvcEFGRk1Bb29BS0tBRm9vQUtLQUNpZ0Fvb0FLS0FDa29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwS0FGb29BS0tRQlNVd0Zvb0FLS0FDaWdBb29BS0tBQ2lnQXBhQUMKaWdCS0tBQ2lnQjVwdElTQ2twakZvb0FLS0FDa29BcTZoWnJlUlk0V1JlVmIrbFo5dk1rbHlJTlNUOTZnMnF6bgpnL1gzOSs5VW5vQkxmWFNZaFczaGMrWEtOdnlGVko1NEZTeldrSDJWUHR6N25KLzFuUWdudG4wK3RHd0ZLRjc4CnlFV2p5UEdHeCs4S2tBK21hRWx1M3VDU2tOekltY0R6QjhwOWhuK2xGa3d1V0d1OVIyc1RieFJnZFdadW42MUIKY3dUc0ZlK3VmM2J0Z0NQb09QeUg2MDBrZ0lZV210bzF1NDFDeEZ0dUFBV0k3NU5MWnhpK3U1WERtSGt1TnZYbgozcCtZRlY0NUh1VEd2N3lRbkdWNzF2NmZZclp4K3NqZmViK2xFbm9CY29yTUFvb0FLS0FDaWdBb29BS0tBQ2lnCkFvb0FLS0FDaWdCYUtBQ2lnQW9vQUtLQUVvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWcKQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdCOU5wQ1FVbE1ZdEZBQgpSUUFVVUFKVmE5c29yeVBEakRqN3JqcUtFN0FaVFBkYWJKSDU4WW1qVGhHUGI2SC9BQnExY3pXK3B3Q09PNUViCmRkamNaUHAvK3FyOHdKZEx0NWJXM3hJK1FSdTJiZnVuNjk2enJHWlVlS1JpWEVhT3pBTGpaOVQzei9XamU5Z0oKSTF1Rlp6Y1JNcVhRS2s3Z1FHUFRqdDZVTmFTUzZhclJ5T3VGQmVKK21SNmVsQUZhK2hTQkVTTzQzbzN6R1BkawpxZndwYkcxdXJoU2taTWNML2VmSFdxMHNCdVdsbERhSmlOZm03c2VwcXhXVGR3Q2lnQW9vQUtLQUNpZ0FvelFBClVVQUZGQUJSUUFVVUFGRkFDMFVBRkZBQlJRQWxGQUJRYzVHTVk3MEFGRkFCUlFBVVVBRkZBQlJRQVVVQUxTVUEKTFJRQWxGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUzBBRkpRQVVVQUZGQUJSUQpBODlLYlNFZ29wakNpZ0Fvb0FLS0JCU1VEQWdFWUl6Vkc1MHEybkpZS1kyUGRmOEFDbW5ZQ3VOTHVZTWZacnZHCk94eUIvV212RHE1eHUyU0ZUd2ZseVA1VldqQzRQSHJFcTdYQ0FmOEFBYWJIbzF3MjR5enFtN3FFSFgrVkYwZ3UKWGJiU2JXQWhpcGtZZDIvd3E4QUFNQ3BidUlLU2tNS0tBQ2lnQW9vQUtLQUVvb0FLS0FDbG9BS0tBQ2lnQW9vQQpXaWdBb29BU2daeHllYUFDbHhRQWxMUUFsRkFDMFVBRkZBQlJpZ0JLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpCmdBb29BS1NnQmFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FlYWJTRWdvcGpDaWdBcEsKQUZvb0FNMGxBQlJRQWxITkFDaHFNMEFGQk9CbkJQMG9BV2lnQW9vQUtLQUNrb0FLU2dBb29BS0tBRm9vQVNpZwpCYUtBQ2xvQUtLQUNpZ0Fvb0FLS0JCUlFNS0tBQ2lnQW9vQUtLQUNrb0FLS0FDaWdBb29BS0tBQ2lnQW9vQUtLCkFDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2lnQW9vQWVlbE1wQ1F0Rk1ZVVVBRkYKQUNVYzBBR0RTNG9BTVVZb0VHS0RRQWhGSjBvR0xSUUF0RkFCUlFBVVVBSlNVQUZGQUMwVUFGRkFCUlFBVVVBRgpGQUJTMEFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUlLS0JoUlFBbEZBQlJRQVpwS0FDbG9BS0tBQ2lnQmFTCmdBb29BS0tBRnBLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBQ2xvQUtTZ0Fvb0FLS0FDaWdCNTZVMmtKQlJUR0ZGQUIKUlFBWW9vRUxtaWdBb29BU2lnWVVsQUJSUUFVdEFCUlFBRTBtYUFFb29BS1dnQW9vQUtLQUVvRkFCUzBBRkZBQgpSUUFVdEFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFDVVVBRklhQUNsQW9BWEFwTVVBRkpRQXRGQUJSClFBVUNnQmFLQUNpZ0JLS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUZwS0FDaWdBb29BS0tBSG1tMGhJUmxKeGhpdjAKcHV4LytlamZrUDhBQ2dBS1AvejBiOVA4S05qL0FQUFJ2MC93cGdHeC93RG5vMzZmNFViWlArZWgvVC9Da0FiWgpQNy82VVlrL3ZqOHFZQ1lsL3ZMK1ZHSmY3eWZsL3dEWHBEREV1UHZML3dCOC93RDE2WEV2OTVmKytmOEE2OU1BCnhML2VYL3ZuL3dDdlNZbC92TC8zei84QVhvQU1TLzNsL3dDK2YvcjBmdmZWZisrZi9yMGdFL2UvN1A1VW1aZjcKby9PbUF1NlgrNHYvQUgxUzdwZitlWS83Nm9BTjB2OEF6elgvQUw2Lyt0UVdreDl4Zisrdi9yVWdHN3BQN2cvTQovd0NGRzkvN2cvTS80VXdEZS84QWRINW4vQ2wzUC9jSDVuL0NrQWIzL3dDZVovT2plMy9QTTB3RHpEL3p6ZjhBClNqekQvd0E4bi9UL0FCcEFIbU4venlmOVA4YVh6Ry81NXQrbitOQUFaQ1ArV2JmbVA4YVBNUDhBenpiOHgvalQKRUhtSCs0MzVqL0dneUgrNDM1ai9BQnBERTgwZWgvU2p6VjlEK1ZQVU5BODVPK1IrQm84NVBmOEE3NU5JQmZPVAovYS83NU5IbXIvdGY5OG1nQTgxZjlyL3ZrMGVZUFIvKytEUUF2bUw2UC8zd2Y4S1BNWC9hL3dDK1RUQVBNWDMvCkFDTkhtcDNiRkFCNXFmM2grZEFsai92citkQUNlZEgvQU05Ri9PanpvLzhBbm92NWlnQTgyUDhBNTZMK1lvODYKTC9ub3Y1MEFMNTBmL1BSZnpvODZQL25vbi9mUW9BUE5qLzU2TC8zMEtQTVQrK3Y1MHJoWVhldjk0Zm5SdVU5eApSZERzeGNqMW9vRUpSUUFVdE1BelMwQUZKaWdCS0tBRE5HYUFGNjB0QUNVVUFGRkFCUlFBVVVBRkZBQlJRQVVVCkFGRkFCUzBBRkpRQVVDZ0JCbnZTMEFGSlFCSWFiU0VoYUtZQlJRQWxMUUFVbEFCUlFNS0tBQ2lnUXRKUUFVVUQKRzRvelFBdWFRbWdCUXVldExnRHRRSUtLQmlVVUFGTFFBVVVBRkZBQlJRQVVtS0FDaWdBb3hRQVlIb0tUYXZvUAp5b0FOaS8zUitWRzFmN28vS2dBMkwvZEg1VXUxZjdvL0tnQk5xLzNSK1ZHMWY3by9LZ0JkcStnbzJqcmdVQUp0CkZHQVAvd0JkQUJnZS93Q2RHUGMvblFBYlI3L25SNWErbEFySVR5ay91MEdHUHVvb3V3c2hQSWlQOEFwUHM4UC8KQUR6V2dMQjVFWDl4ZnlvTUVSL2dYOHFCaStSSDJSZnlGSjVDZjNSK1FvRUw1S2YzVi83NUZIa3AvZEgvQUh5SwpCaDVLZWcvSVVwaVgwSDVDZ0JQSlgzRkJoVTkyL09nQlBJSDk1djhBdnFqeUIzZC8rK2pRSVh5Ui9mZi9BTDZOCko1STdNLzhBMzBmOGFRdzhvZjNtL3dDK2ovalNtSUh1My9mUi93QWFZQ2VWL3RIL0FMNmIvR2w4ci9hUC9mUi8KeHBBSGxIKyszNW1qeTIvdnRURFVQTGIvQUo2SDhxTmpmODlXL0lVZ0U4dC8rZXAvSVVlWEovejJiOGhURUhseQpmODltL3dDK1JTTXJxcFl6TmdEUDNSL2hRTUZTUWdFeU1ENllGTDVjbi9QVnZ5SCtGSUEyU2Y4QVBWdjAvd0FLCk5rbi9BRDBiOVA4QUNtSU5rbi9QUnZ6SCtGR3lUKytmekgrRkF4ZHIvd0I4L3AvaFJ0ay92LzUvS2dBeEovZUgKNVVtSmZWUHlvQU1UZXFma2FGRW9iNWlwSHNLQUgwVUFTR20waElLV21BVVVBSlJRQXRGQUNVVUFGSlFNV2lnQgphS0JDVVVBTFNGYUFFMm1sQzRvQVhORkFDVVVEQ2lnQW9vQUtLQUNpZ0Fvb0FLS0FDa29BS1dnQW9vQUtLQUNpCmdBb29BS0tBQ2lnQnVhV2dBcGFBQ2lnQW9vQVNpZ0JhS0FDaWdBb29BS0tBQ2lnQW9vQUtLQUNpZ0FwS0FDaWcKQmFLQUNpZ0Fvb0FLS0FDaWdBb29BS0tBRW9OQUNVdEFEejBwS1FrRkpUQUtLQmhSUUlNMFpvQUtLQUNpZ1lsTApRQVVvb0VGRkFCUlFBVWhPS0FFelNpZ1l0SlFJS0tCaFJRQVVVQUpSUUF0RkFCUlFBVVVBSlJRQVVVQUxSUUFVClVBRkZBQlJRSVdpZ0JwRkZBd3BhQUNpZ0Fvb0FTaWdCYVNnQmFTZ0JhS0FDaWdCS1dnQW9vQUtLQUVvb0FLS0EKQTB0QUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVuZWdBb29BZlNiZmVrU0cyamJRTzRiYU50QVhEYlJ0b0M0dQpLTVVCY01VbTJnTGh0bzIrOUFYRGJSdG9DNGJmZWpiNzBCY1hGR0tBREZHS0F1SnQ5NlRZUFdnTGk3QjYwYmZlCmdMaTRveFFGd3hSaWdMaGlrMjBCY050RzJnTGh0bzIwQmNOdEcyZ0xodG8yMEJjTnRHMmdMaHRvMis5QVhEYlIKdDk2QXVHMzNvMis5QVhEYjcwYmZlZ0xodDk2TnRBWERiUnRvQzR1S01VQUdLVGI3MEJjTnZ2UnRvQzRiYU50QQpYRGJSdG9DNGJhTnRBWERiNzBiZmVnTGh0OTZOdnZRRncyMGJhQXVHMmpiUUZ3MjBiYUF1RzJqYlFGdzIwYmZlCmdMaHRvMjBCY050RzJnTGh0bzIwQmNOdEcyZ0xodG8yMEJjTnRHMmdMaHRvMjBCY050RzJnTGh0bzIwQmNOdEcKMzNvQzRiYU5uT2MwQmNOdnZSdDk2QXVPb29FRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQQpVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGCkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlJRQVVVQUZGQUJSUUFVVUFGRkFCUlFBVVVBRkZBQlIKUUFVVUFmL1pBQUFBQ21WdVpITjBjbVZoYlFwbGJtUnZZbW9LT0NBd0lHOWlhZ296TVRFNE9BcGxibVJ2WW1vSwpNVFVnTUNCdlltb0tQRHdnTDB4bGJtZDBhQ0F4TmlBd0lGSWdMMVI1Y0dVZ0wxaFBZbXBsWTNRZ0wxTjFZblI1CmNHVWdMMGx0WVdkbElDOVhhV1IwYUNBeU5UWWdMMGhsYVdkb2RDQXlPQ0F2U1cxaFoyVk5ZWE5yQ25SeWRXVWcKTDBsdWRHVnljRzlzWVhSbElIUnlkV1VnTDBKcGRITlFaWEpEYjIxd2IyNWxiblFnTVNBdlJtbHNkR1Z5SUM5RwpiR0YwWlVSbFkyOWtaU0ErUGdwemRISmxZVzBLZUFHRjByMXV3eUFRQU9DTE1tUXJhd2ZMOXliaGxUcDJDdTVTCmozNmxxSmFhVitnWXhKQVZOaXJSdXg2SkhiQlRxVjc0K1RnNHpqRFBINW01VjFwWHVweXl5Nkl0ai9mWjJxT3gKUENRVGdVRDdBMnhVT0VWN1g4a2MrY2hETkI0T2dPSmJGVWIvaDU5VDIrTFpSRmJCaFZERmgxdThwUmJWVVl0YgpaMnUzM0JuWmY4eitrVDFZNTZ2NDdFcWNXeHcrOVpmRWg1VTNSaVhUODVNNEhnbURQeTNqR3oyNWVrZi9JOTQvCmVNenhjZ0I2aGsxVTNwUUViR3BRemhlWFZtVlBNaXp1MG41eTJLdmg2aGdMODdZNDRlQWxQMXI0V3dLVSsrZjgKQ1hhUjBJcFgrOXNFS2p2ZFhPNi84Z2hLRXNyMUkreHpmZGR1ZHJQcmNmSXFQeHU1RjdlU1p0Sk8vSnBmcVpEMQpQTUt6OFM4SFRFWVdyOTBISHJzR1hvR0tCeTd4L3B0ZDF3SnRXRHhFSGdMcit2L1h0WnJUV25oVmk5bnI5M2Q5CjN6Tk1iZjIrLzNQU3EyQVpYaDZuRmpNWC9nVU0rY3d2Q21WdVpITjBjbVZoYlFwbGJtUnZZbW9LTVRZZ01DQnYKWW1vS016TTVDbVZ1Wkc5aWFnb3hNaUF3SUc5aWFnbzhQQ0F2VEdWdVozUm9JREV6SURBZ1VpQXZWSGx3WlNBdgpXRTlpYW1WamRDQXZVM1ZpZEhsd1pTQXZTVzFoWjJVZ0wxZHBaSFJvSURFeE5qZ2dMMGhsYVdkb2RDQXhOakk0CkNpOUpiV0ZuWlUxaGMyc2dkSEoxWlNBdlNXNTBaWEp3YjJ4aGRHVWdkSEoxWlNBdlFtbDBjMUJsY2tOdmJYQnYKYm1WdWRDQXhJQzlHYVd4MFpYSWdMMFpzWVhSbFJHVmpiMlJsQ2o0K0NuTjBjbVZoYlFwNEFlMmRUVy9rU0hybgptZWFpMkRBRVJYdm5VZ01rTWp6d1lzNDE4RVVEQ0JsakxHQmY5eU5VWTREZHF4bytyQXdJWXRibW91aERvM2lkCkFRYk93MzRRVTAyamVGbFkvZ1pEZGdBajN5WTRPa3dJeStHei95QlRMMTFTVlpmZVV0ckZQOVRLNUd2RWo3OTQKSW9JRnNZTWlUSTl2d0lpNlVvaTlzbnk1bUYwdVB2NVNiN3JrU2lubCtYSXJkZXBUclBVbWxrMFIxUVlGZGp2NworNkhnZGFsRDJiMlNwTkNGV2lqeHVwdEZwZ29IYkNCRkdvV0FhRkJ4UEhvWVBydWtUeFpxZ1YveDJzOGlkV0h1CmNhbjZGeUdBT3VPR1l2S3hzQXVpTE11V1dQSGFUWFd5SWFKT2grSS9JQnJBdXFSTHdGT0MyQ3NRTFpjajdtTi8KZWhNSzZrdzlGQlI4SWFrT0gxM2NKVW01SnFwbnVyVER2a2YvOENrcW81N1BhOVdyWWo2UjJuUmFsTk4xMHYyVgpUNUpxSkRxdS8rUEdpRndLRFl1WE84VVhQb2xtVVJWaVdSUmFXTkw5eEw5TkVFZ2hqcXJ2WHVxeWVYUTlRd0ZPCmpySnllN3BUZUJmUHRuV1ZKVytXb3BlWjB0MVBYSmE5UUdpTEZOVzNNOTFzaktqSlNvbDJuR3ZrVCs5MEJxYXkKMStxOUJsR2JMV1lMVmFmaXlrRFVic3BSa3dlaVBWZEt0NjFBbE50K3ByNEYwU3VYUk9nZm5aR2lmRC9kTU5IVwp6cDR2cFZmcXJTNlY3YWVxREVSTmxzVFpFcEZlTis4MjZlZ29MK3RBRkl0VDZzVkFwS01ZY2JSanM5RDZNWnI0CjVwdE54bEZvYTZPamhkSXY5QktPZEpTOE1OM09MN09zeVJxTWRkNXRvVC9hVkdTblpWSysyTnJ4cUxWRTZmY2oKa1pMSWRMdG8rMnVpdmRrR2lRNUxCTTFBaENhbUtsMGlzclhxdjVRclJHNlRSUDV3aVliMTV4ajdBOGc1VWQ1cgo2ZVlYanR6K2ZLWlJmeHRKblVtUy93RkgrNzRKUkpuS2N2UkhHY0o1ZDY2eURFRW1TbnNQb21SVFJGb3Q0KzJCCjZIUUdvaVFCa2Fva21rMUJ0SWdYOGZhMjl0MGM5MGNiSXVvalZjVFJOaHk1R1AxaFZhamNpcXF4YVdaVVZTUVkKNFdiYTl5QXlHeHI3WlJIWGNiRzl1OTkxeWVMNHFLck44U25HL2tRbk03T3FhbDNyNGxCM1lpU1NUUkU1M0JtZApoWkR0MDR2QXphVFgxY1ZhYjhaRjNMWnNKcm4wV2puZkorck1lTUFsNDdVVEhuWkRsMTdMcjRLamNMTTdwdk1ECjFqZmg1NXMzK28ySUdmNUJzQ1phbC8zRVJBdDl6Y0h4dFMwYjNURCthMm1qUmJJd0dxQUJHcUFCR3FBQkdxQUIKR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQgpHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUNCUnpTd1d1ZTlxZi9CL3J5OGoxK1NmbEFpCk84ejM0TlB6cVEydWx4dktHNlpndUp3SFlUaklSK3RqVlRnaXBBZHd0QlFCRVdaYzhlTmNkRU8raTNUNE92L0EKM3ZWVWNSZEVwUTg3M2ZlSUFzM0ZBV0gzblpLYkRFU1kwdWdxVWFSRFppWjhoTlNaMWJxc0N3VnZoZ2tJd3RsRAplcWZ4cGZCYkRhdjMrVmdUZVJDQmFaMVR2NjJ4MUp2emo4NWdmYmo2RDRsd3hKQUdpeHFMRDBDRVhGQnJIcE1zClhSSU5Ua2FpWVNJUGQ0akN2azhVRFk0S25EMmtDNkw3VDBHQzJVNEdvdndxMFNocmdQbGhvdGFuUlFxaTRpRHkKV3U1UGhNbHdXamh5V1IvMTBUOWtpOE5KalZteVVwbjByL2ZqMnRUN2NZR1p4UTRtWG1mTy9HYTJwWng2aituaQo1SXYvMHNlWUJBMHhGcjNXQzQxcWpuYWpPbm1BaVdNYUtkdGxLVzNtSXgvdEpkRkJJSExTUndmUlRyelF4VTVjCjdKcC94OVlYU2EwakZTVkZza2hROGhlLzhJanFvMEFVcVcyMXJmdnRtVHJLSG9hb1djYnlwbktSaS9aZVRGLysKdkZ6SlF2ek9iclJqTWhXOVZOR3VxUTkwdVV5d0JwcmxjaEZqaXNFdmZ1RXdtUXhrZHBpUlNFRFVHYVZEVHpMRwoxVDArV3ltYk55V0lhbGU3dllQNXl4U3RCVVFITzdPWFp2Vk8vY1lvVElPNHB6T2JZQ3FrNWJKTWpwWVdrekp0Ci9XV05hS3NubURoS3I0bTJOSUwvL2tRdUhvanc2YjRxWG5kbUlIS0luR2orMHNqYmNPbm9DQkZGOXExNmk5bjkKU2xVa05yT3kvYXJ4bUNndXJxY0RFYVpHTXdNUjR2S2VDVVJ2NENnUS9VMzBsVGN2VFFrQ3FRK2puYW1SRjdxYgpCNkpPNTgxYi9SWThwYXBIb2k4SElxbTM1anF2RllpaUxRVkhEMFBVbExJOGF0emtWMS81YUtyUWZwd1UvWmZ6Cm1YbjFRdmRodGtqWDY4WGtiWlFNUkpqK2JJRkpUNzlvMERFVVVuOEJvc1ZBaEJuM0hvSUljZFNXcFdUTnhCLzkKMjU2TE5KcTh1TFRvWHg3T1RQUWZRRFFRNm1na3lrc0ZvZ2hFVVNDcU1TK2owZm1MN1ZCci9jTVFoZFlQb3NYawp5Qi9WZTZCNTQ4TVE5MjhEVWZ3L1VSQ2FGR3BOeVFMelZwYjV0MmppRFNveVc2eUpNTUs4MHc5TTFBU2lxUEdOCjJ3dVhIV2J0UzkxQXBBWWlPUHNUaU42QzZGdjhYQkFoc2pHVWdHZ0xrNlFCWFlLais3ZTFHcTBmUk1vTlJFTWgKSURMdWNJcGFVKzlRRUlyeWgyallHUnA1bWVNSEUrbkJVZEdnOVFlaStTWFI4bytZbHV5K3lZSElCcUtROXRaRQpuZm5WN200Z1V1aU1jQXR3VHBRRW5ySWFpWnpmVDBlaWQrZ2tkYTlYNmszMUFGUFl0bUtQUUtUOVh1MWU3L1c2CmE0L1IvODZtTHc4T1oxb2xtUEdzM3pVK1JVbVlYalRHOUhYTHBHcktFOGxxL3dxVk8vU1FlYVEweGpXOXFKTUgKSWFvbmFQM2F2d3JqbWtUVFNUSFRQV1k4UFVoMXZFZ1dzemc2QU5Ha0tERlZYS1R5c2dBUnhyVzg5aFBjNDAyawpSMXRicUpWRzVCZGU1ZFY5SzAxYWNaUEdpdTUydDdwb1h4YTdjVEUzc2tpakx0WExRdFVtamhCSzZSc1hWMDU5Cm9ZOXRyU3ZyUU9UN3VKTU9ST21hWVp4MEZDRjJ6M1FtblRrZGJtQjF5S2xGUklWUWxoT3NuSnhnb1RvSzdjbUcKV3pxem5ZWmp3dnJ3ZGRQSC9ZbHV5TFZMUDl4NFRvQis2SWRTL2tNSDNHWC94ZTMyeGNsUFRuUkJjcjR3M0VWago1VE1jcmM3UGVlUnZQZWIvS0ZWeU4vVGZqcWV0N25ZMno2SUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCCkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUIKR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQgpHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCCkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUJHcUFCR3FBQkdxQUIKR3JpRmdUL2U0dGpIUDlTaWlCUDhQR2h5NnE3WmVaRUhKa0tPU0VVaTNlUk9VRGkvbExNK092eFA2WjNPdjM2UwpHektxS3ZIUjlaMmZ0NldVdG8vU2FNam84ODc0NUZIMWtCR0kzR2pya3dmZnZCTkVzc1RQQTZYYWhJeEExTjQ1CncwRDBCajhQbEw0MUlhTXFDMFREWWxqOXZOUWZwbnJTZGRHM1NUR0xEaCtzMXQ0YkZ6dFQ1ZUtrUyt6cDU3R00KUjNXSDgxbmtYVlRFeGV5bmh6OU5iM1B1SjQ1OWI1Q2hMaldJZkd6TFR4eDViVmUzTzkvZDMyL0w0cWg5eVA2bwowbFdlSzBTVFMxM2JWdGVLL2NTR2JuZTYwKzFiZTlRMEQwbVVLd0JWdFloWGpiOWRSOW52VEY5MXI2d3QyK1lUCjNMZmVGWWgwVlhScG41VGUzNnJyN25lKzNCdUlqaDZVQ0VBZ1doeWs4cVowbmI3TkZmVXZwM3ZSSzFzdUg5WlIKSUlxU3JkMVU2anJxekcySTVPWFdYclRYbFBIREVtMGxtWTZVbmlLUTZza3RpWDc4ajc4UVZ5Y1BHMGQ5bEN5TQpGbzFCelZ1NVhhM0pYL3hqQVNKZHRuZnY3Ni9YU2EvTFJRcWlvNEhvZHBFdGJ3b25yaFQ3b0VTZHNTdTVJR3J6CjY4eWYyTEk4OHVsakVPV2lSQlVpcnBYbVZqMmtnR2krWHllMmRaL0F2dTJ1TG0wTG5mMCtpOUsyY1dmbDdZaksKcG8vMjZ3bUk5RzNML2ZqeGdTZ3BWREhWTHZhVEt0eWdmbjQ2T1pWSXJKT3pXN2FJSHlqaExDK2Rkc2I0cEl2bApWbVAvbUhINWtGVTJacWx2TmVCZnU3NW5TUFNRbmRGNHZlcDI0ZnlocERyK2NNdTkxeGUzR3ZDdkZlZVNhNXZ1CnU2SFE5ODJCNTlNQURkQUFEZEFBRGRBQURkQUFEZEFBRGRBQURkQUFEZEFBRGRBQURkQUFEZEFBRGZ6L1lhQzQKMzkreUhrRUNuanQ4WmltNzMxOXBIK0ZxOG1kSHBKNGgwZXArZnpsKzhIcFRaZjdNWWx0bG1YN3d5N3hYaGtxLwpOL2ZLNE1GUGpzeS9QRHNpUEhyMHJOTE0xTStLUi9yNXN5TXkrcG5WV20vMDRwblZtdEhmcE04S0NZNm16NHVvCk05dTc1bGs1NnRKdkRwOFhrY2h2K3VkRzlLeXFqREEwUUFNMFFBTTBRQU0wUUFNMFFBTTBRQU0wUUFNMFFBTTAKUUFNMFFBTTBRQU0wUUFNMDhNd04zUHdIdi83ODhUWjlqcitTbGR4dUVwbnpNMi83ZlROUmQwNTAvaTJZM0dZegpSSzYvc0pENXk2dnhhV2VHbVZhMnRReHpVcDM5R0QrL3Zqemc4WllLWFBvNkxhL01ydUxGYTY5RlpHWkdJdjhYCmZ1SW4yUERvS2Jva2ltOGkwbXNDSC9zWTA4aHNJRjBobW54QU5NelljMDdVcTE1ZEJOZWpjcldYNFhxVkNEUFkKNVlISXJvbFVCME9iY2VRdWliN3dYU0xKVW1MTThGZHJuOWQ0eUdXaHplTHNGQ3doaWpZVFI5OGp3cVNEY2RSRgo0aWNncXI3VDBUeWFtZWpyR2l4bnZ6Nzd0ZDlJVzd0Q3RMV0hlYUpldi9MNzRqQjlKWWhtczlsMHRydjdkZDA0Cmh3YXd3dlJXRzBoT0xoN1EzTnFUdHZVSEh2TkdEVVR2cDJZNm4rMGFjTForSU5wSW4zMlY2SlcwamUvMnU3VHgKY0ZRR0lqUGJUVnZyckllaERhVXJSTnNqMGRkZGFsRnozcjZkenFmcGJDZHR5MEMwc1hSSjFLc3ZaV0o5dHhlTgpSTTI3YVJTSUJFUkZ0REVnVEoxNXZDNE1SQjVFSGtSbGNOU0M2R1U2ZXlXTjljVkd4bzhSNUpKSTFCZXVCZEhYCm1CTjNUV1Q4bXNodVRoR21ZRDEzSkdweDJwNzZEa1RnRXU5bTAwQ0VPTEtZaEhCejZjb29vb3FCYUU5a2FHdUIKcURNajBYQkRzaUdvYTBTb01CbjZJejhIRWZxaitkZldQL3dNWngrL3ZLdEVkWHQwNnYxK2lra0hVV3VnMGZPWApzOTBwaU80K0JmSEhTLzdZbmtoZmRNUzU4eFBFMFFIR3RUZ1FHUjJaYURhUEVFY1k2emFXSXFYT3k4b3hoK1lwCnVzSUlZNzlJMTZlbVNKY3I4d2I3KzQzY3E1MkQ2UE9GWi9QOS9Jak1zM0d6QnVsSjlOeXFoRHcwUUFNMFFBTTAKUUFNMFFBTTBRQU0wUUFNMFFBTTBRQU0wUUFNMFFBTTBRQVAvanhvNHhmdHJUKzdQUHJ6UjZ3ZGU2M1h4dkVrbwp6dU52aEdPNjhtZnY0UWo3TUVSRHRsZnl2dmdMUEVvOTM1eU5CT1h3NWVKeDdYSTMxZ2VpSDVuZkhmN1g5SHp2CjdiNFg1dUw0b2RUem9yRjF5SHU5OTN6eitQZmQzNWZEWnJ6SU02U1RxMFFydkdNV2YyTTFkMzh2YXpRM0lWZWsKOGMxdzUwV0hEZmp0VTN5Yzc4UENTSlFEQXNtMkV2NVFoK011ejhxSDB4WnBoTC84M2luMSt1TkVJY011SGJJTgpjRU5hRTQwck54TmwyUGxHRm5kOXYyOW53bFVPNlpxanNIWDkrc29Mb2xEY3VTbXg5cm9qSmVFUVBBdDMxL2Y3CjRpRlIwNFgzK1BacE5xaTNuUW5QdVdqOG9EaDNnTDJDaDB2Q2V5eVZTSjNobmJaT1QwNjh4a080VFNrK2RucXgKbjFoeDhiRXQ4S1JBVkVWLzE4cWZ6ZThjUjUzeGNiU3ZmcGU0U2ZUTEdHOWpSQW4xN3FTTERoS3BmcVhxbldUeAo5M2dhTUxKTzFVbDRvYlhPbzBKRnRsYVlZN0xKUUZTcmFDKzJVc2Q1dWREUmJGSkZWU00vTWo4OS9Oc1UxM0w3CjFHdWZSSHRKRWRkeDlCclBHK0hkdnNsaU4vSW9SYkpGOHY1bEVuM2w4Q3lneFE0QXYxVmFUYW9zSzh1c0tBVnYKdHUxTTlyWnFHeXZMWlY2dDhnU3Z2YzFSL1MxaXZibzlUVGdEejRTbWliVkZXUjVYTlJwenVjeXl2UFBPb21WbgpTeXlhQk0vOC9TR3h5L0lJdGFwQWhFakp5Nnhjb3FZTWlCVGVKOWxheWNxOEVyejNWbFZaRmQ0VGZXY2lXWGFICnFteExXMVZWZzRkcGtIR3B4SC9kb2gxbFNabDNxV3BjMHl1Yk5TV0FkYTd4WEhLRlk4cXNBWkhwZHZWQTFJOUUKT2dPUnZhT2R0ZE9pTzlSVld6VWdzbmpFTnJQS0RrUmxLeFVtYlJ5SWJDRENNZExyZHlNUmRtV3QxRmVJMUxkNApXZUgyUXhEVnUrbFZvdHlxRUs5ZnR6Q0NZcGVvRll2M21pWTJING5lZ3NnbmVhWWF0S2hxaG1lVnRLMjZpUlVGCmJmV1dEclZteDA3cmJtR0VEZ2RFeFFTV1JrZUJxSkRvYTF0TVF1VVVheUtVY2tsVUova1MzQWkwYmVOQjlIZDQKTmc5RU9Ib2t1dVhMWEQ4azcwRzBpS3UyVUVPdGdjaTZBN1Mwa2NqdGpvNHkxQnJxc2RmQlVaa2hqZ0pSL3Q1NApvMjJHWi9Na3QzbUpseWVIT0xvbmtVeU56Z1JFT2dsUFpBYWk3dVhPWHBKaHZNckxMaEQ1RXVFMUVJbk9RSlJoCmg3SVZpT29VVDFCaGFVMmtScUt6KzlWYUlLcWthaGJvczBlaXN2L1N2OWJMZ2FpZkdyUTF0RzBRVldpS1ExdkwKTDRoY0lDb3JpLzRvZEFqWVc4R1IxeDlXeEszV1VlWkFoREY3Sk1vRDBTK2xERVIySkVMRVFFUWdnZ1dsYzlSYQpWc0pSNXRMZXFLb01SRm1aTGNNcnIvUDdFKzNpS2xGcnkwQ0VQZ2hsZ2VpcmNIOFJpRkJyVGQyY1ZyWXNTNVNyCjFEYUlFdlNQR1lqSzJ2UTZ5Mnh6WktWRW4vNU9hZlNQUjdkOHVmUUhBdkZpZDZOUklpSzdERVRMdUV5bU8zdDcKY1hNV2lLYlk2d3BYRmhidm84YkF1bEFMcFJmSm9rUkRhS1NPVkI4WHF0NmJXQXcvZFl4OTFhS3FEOHdIaGR4cQp0WThPWTd6SkYwUng4VXNRMVgrTmtSTnRMWEtoOWR2RlBOWSs4a21Oa2Zha0xRVXYvbFdtVHVvVHA5RkRPcFZMClhCdTMvK05UY2YvTlNYMjhPa1pQZmo5SHVOTkw4SlRmeVdsbTNkOWpPUEwvM1ptaVR4cC9FR09vUENra1crRVcKU3JuaHJkcmwrTHJmTXh6WHBlc0xyODdPRnk1TVhPeTcySEtuaFR6Y015TjR4bVI5ZXI1NDVmdVQ0OVhsem9jawpRZ01iVTNrajBTZjdtWWNuQ240dWNyMzVQY2FmSkxxNEdybnhhczZ2OWZPL0YvRlZvaG8zYjlmVFAxL2ZkTGtsClhOR1kwTkUrUktyVjFWeDg0SHRXcVRmUENvY3dORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQUQKTkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRApORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFECk5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQUQKTkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRApORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETkVBRE5FQURORUFETlBBc0RTd1NlZFA5cUlza21oekprWSs2ClNCWHhrNUl1SW5uajNVRmtva2toMWhWZGxCVFJreEtWM3BTdFA1enJ2SE5pcmUvTUNUWTlKVkxabWZLME96UUsKUktrdFFmVEhzdGRQU2lTNnRDREtNL0hHbGwxbnBCVDF0RVNxdFAyaHlTcnhldms4aUxLeWtUNFFuYW5sVVQ4NAp5cDdXVVZhNWthak5sNDJBeU1vVEUxV1ZTM3VUVjZkdFpldDBJRm8rcmFPcThybzNDa1NsZGJveks0dllmc0pVClNsYjFTVC9YUmRJMnRsTmRwSjhCa2NSOVpFRFUyajUrRGtSVkpVWC9FOGxPVzJkbDBhV3JVcDQ4anNRZEdyU3YKdHZ1bDFNK2o5WXRmRS8yVnVJUFFaejl4Njg5TDZlYkIwVmtmaTM4T1JLbzg2VWNpaVgvZmdjaEsvb1NOUHd5cgpJeEZHRWNsT1JxSW5IV21yWGxkaHBKV3Evd2VwS2hDZDJxZTlHNms2VTRXN0VjbTZNNm5DL1pHMWFHOVBtRW9uClplTTdMWmx2eGRZdEFMSHBLVk14a2FYL0d4QXRKazVPM1gvR2ZmWmk4cFJBQWhhUkNyOHU2ZkdaUzVIMlR4clkKZ0dDaUFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnCkFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWcKQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnCkFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWcKQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnCkFScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWcKQVJxZ0FScWdBUnFnQVJxZ0FScDRYQU5kK3JqNTN6NTNaMjUvenVPZThReUowc2U5NHR2bjdtOS9DcytnQVJxZwpBUnFnQVJxZ0FScWdBUnFnQVJxZ0FScWdBUnA0UWdPckp5ejdlMFVmUzVlSUhLL2tCaUw5dlNNZlpPVU1aZDJRCjBXK3ZiS3ZFeHlLNWxsemtKR3pQejRhdnNMZ0tIeDlOUHYzb0xqRzl3VTZMMzlQaG9GUHhZKzZ0U0NXOTZWV2YKNW4xOFFhZTkxRXBreUxLU0JrZnBRS1FyVUVuV1ZFTW1QL2poMHFISUs4Y1pMR2RoSFVXRzVVQVVmZ1BYbWdpQQpKK0pOcjN1VGR4TUJ4WkMwVDR0QUZGWk9BbEVQb2twMEhvZ3ErMzBpSjM0L0hZOGRUaGJSNHpmS0t0ZGJydXo0CkdOSFo2QWduV2FtTjE1RGcyejVabjJsY2VsR3F2U1RLVlNBcXk0dDl3K0YxNmc1dUpNSmgxNG5NY1RqcEJrZG4KdUdRa2ZGaDViN3lXbVJFZlFqaWsvdnRFN2JtalhBY2lXdzJuaHNQa3JGTUNvalNjZFMxVmN2d0JFUTdSdzJIWAppS3kwVjRoNjA2N2tIWWpHYmFHbzc4eTYxRURjV215Wm1oT2dCNkkyUDVGQ2xvWDQ1SjhpSDBOeG5RN0ZmUGhSClNmNXhvczdnY0ZUUjhEdVVNa2JZNEtnM0RZaUMrRW82NDdwMFRWU25QbkVhUkdIelN5eDhpMkE3U052VmlTeDIKSmd0eEo2c0l0TmI4UzRxY3I2ZnNCcUplaTBzN0xYOTVrQ1lTMnhPWjJBU2U1ZFJQNUVYaWxWUk9vVXFNMVZLawo0a0RrdHFQSWRLYlNZRjBjdUtUR2ZwL0FRNlFRY0tucTlzVmpuM3ExUDAzYlhwL1pkaVE2UWlQQ3J4dzFnb1liCkN2RjZJVkdwVUVobi9Eenh1a2l6K2V1RCtMaldDeVhGN3Y3RVRXelZSM1hzRXV0UDNVVHF4Q1dTMit5Y1NFQ1UKU2ZNdWluU1hCcUplZThtcUNrUzRMcE5rSUJMVi94eE5zK3ExODVBbHVzVnVxLy8zZ1l1OGl5TGY3VU9kVDZZUgpzcTdWSW8wS0ZDY0x0ZGlMYXhYdEpQTm9WK1daV3ViOTluVEh1YTl0M3BuNnE4WmFiNXRHbXFhMGFPN0lzamVaCmxnWUJnaTRuNjJjS1JNZTZRSmZnNVoyQ0JHOSsyeDNxYWlDU24rR1NxOTZjK1Q0UTJZSG9tNFA5SGUvMmRrQzAKc3hVMk8xUm1oUWFnQ3BRbXkyVFp0cVdvSFROWFU1UG5XWVpMbWhybnZFVlJUVnUydHJWbEsyVzRQaVhsR1lqVQpRTlFNUkVhdnVqUlhUZ21JOGh4RXpxeTZnM09pR0VSWmIvNEVJZytpWWlJMi8yWi92OXRyM2NGK3Q5L05UU3UvCmRUZ3JSN2VWMitHeXE4ejZDblhYN3hobGN2U3p1S1F0NHh2L25lbFNlMVlGb2d4dGJVM2twVGQ2SUxJZ3lyR3kKQWhGc1NZNGlGZGhycmRkRXFjWm1yMEgwZitwREJLak9GakdJdHZaZkJ5THc3THRERUsxdzJhSkFsSjIwVUt1cQp2QnlKZGsxdTNxMkpVaERWS1dMWUI2SW1FTG5qd1pFYmlZclFPYTJKWEtwenJGVytOMUY4MWllaEhnZEg2V29nCndpV2UrY08wVnpyUDBIQ1Bwd2RIM2Y3cHYzZDczYjQvTkc2c1ROVG9RTlNJTGtIVUJFZUI2QnRUNXRVZnpGYTYKYUJ5SUZJajhPZEZpQWcxSmlDTTRRbHZMTWE3bC9WeXZmQ0JDMkFRaWZTYjVlek02K3Rhc0pKSDJHRVF0YWswcQpTQUpSTlJDSkMwVGRvY0haRlNvekVDRUt3MUtaRjVFYmEyMU5WSnV0Z3lnUXlYSWtDZ0ZaT1JqUDZ5VEVVUlRMCk45OGppaElRK2YwTzFZU0krTTcwdThIUlc1TUxhZ21CT1JLZHpEUzZRRnZ0SG56ZDdhUFdSaUpVNXBxb1Y4c1cKV1lPb252Z3BITDA2ZCtUTjFzNSs0MzlucExFK1E5Z0Zvc1NoQTg0ckc0akFOak9pUTczMVJ1ZGRpbnhLNlhZOApPclJXTXBkaUs0aHlyWEdEVUY0aE11aDE3WGNEMGFsZkUwbWljL1JtY05RakNpRVJSRXZwRWNyeUtsVmpIQVdpCkVObGF2RVUxRFVSOTRvNEhvbEJyZ0prWjlPdVo0UEoxM3Fjb0NSMFNpQlNJcW9Fb3M3TGFWdjNQcEVKUHExdkUKa1p4TTAwYXMvY1BCUVlzNDhoMU1kWWRHU2tnQ1IyaHJhTkFpQ25FazhnMklka0gwcnlHeXZabit6RFhlNW9GbwphR3VoMXNMQmNOVEtINHlzQU5JaE1BYWlWWCtZamtTaGgwSS80VXh2a3R3SzdrYTZmYW1hRThsL0RxSTIrNmZJCnhkYTZENGpzVFA4dmNGd1NWVGdYQXllSWpOYkhnYWk3UXVSQTFBejlVWVBEa2dydEZISUNrUSt0cmZ4WHRINUIKdndWZjNVNkRMYTAwdFVLb3FSTXhXZDc1OUxqRnVQYno3akIxYWhocHJldUNvOWFqcFEyTzdDeFVwa0lQaWR4TApMR1U1K3Q5M0tHQStBNUhLMFI5dHozZnExZ01hanF4dGowNmJJMmxLM0s1Vk5yYmlZaENsdVk4T29yVGVIb25hCmhjYTQ5anF1RSt4UGNqR0xVQk1uOGljMHNiTS9Zc0JCNnNJSDRnaEVvQWxFNkNsUmE5WFVnQU05Y3lBQ1c1emwKN1ptODI5NlIrYlpSeDVrQ1VUVGZpVUJrKzhtcHgzZzJXWTlyTVVMa3I5SEtZOXlBcE1jRGtkTm10VUl4WjRVUgpERkd4eHdDTDhKWi83bElRM1pnUVFHdWlnejhMUkM3NVRlU3NGS3FTb214eHVaSEsvUVRqSzRpaTlNMXhiWEE3CkUzb2k1SGFLdGl1ZHdzMEEvdXNWYnRCT2NJazNGR091YkJ2MkI2aVBFdUZ5OE44cE92OFhLUnJGdWpKcmd6dUoKa3pQY09QektTQmM3VStPNlg2RUpmK1QrYmwwa2lydUpDT1ZmSkVBam9hZEEwL3lzaExBVVdWMGVHcTVtblhwegp2dlRSYitEY2RPbjZ5Z25qZmhEaHZ6dWwyeEdGNEw2aG1LdUZqMnB3MU5XTk41eno4VTNxWXRkbk9Ccit2WFp4CndzWENTSEd4ZXMrRld4R2QzYk93enpyOVZrU2ZsU01Qb2dFYW9BRWFvQUVhb0FFYW9BRWFvQUVhb0FFYW9BRWEKb0FFYW9BRWFvQUVhb0FFYW9BRWFvQUVhb0FFYXVLZUIvd3RVL0RMVUNtVnVaSE4wY21WaGJRcGxibVJ2WW1vSwpNVE1nTUNCdlltb0tOemMyT0FwbGJtUnZZbW9LTWpVZ01DQnZZbW9LUER3Z0wweGxibWQwYUNBeU5pQXdJRklnCkwxUjVjR1VnTDFoUFltcGxZM1FnTDFOMVluUjVjR1VnTDBsdFlXZGxJQzlYYVdSMGFDQTBPRGdnTDBobGFXZG8KZENBeE56QWdMMGx0WVdkbFRXRnphd3AwY25WbElDOUpiblJsY25CdmJHRjBaU0IwY25WbElDOUNhWFJ6VUdWeQpRMjl0Y0c5dVpXNTBJREVnTDBacGJIUmxjaUF2Um14aGRHVkVaV052WkdVZ1BqNEtjM1J5WldGdENuZ0I3WnBCCmkrUElGY2RsZE5DbDZXTEpLZENvUXZhUTY0UWMwZ0hqT3M3WFNFaENqcGtoaHpTa3NUUTByQzdMVkk2N0VPS3YKa0c4UTlZaHNIWDNNM2lLbFlIeE1DUjFTRFlWZS9sV1NiYm5YN1oxSkUwaUl5OWdxVmRWUDcrbGZWY2J2V1VULwprZkl3dWFxYzFLZlYxZlRFMTd1eG9kMTFhQnBnOU9oZFk2aXNkcWVoWTdQcjd4NUdlNTBtTG1qdHllWVFmdmpTCnhpUCtDTllsR3pwYVRTa2pqUG9HYkQ4eDkzN01ablJwYjFubk83aFBrejRKQXc0dHU3ZzFIbFlqckhadWIwYXYKMGRFdmpzUEVXcHNkaGRVVS9rSC84cmhsbHhYRUZYRk56bnVnU2VCaUR4VGdjQUhsbHArNmw1YnJvdE4ydkJjTQpJVEtmdEc0WnV5UzZTVFRWd2lUbTB6cU5iVkptRXVEN0JOVU84SS9jUzVQOFBXNjF3YjN2eXNOM1czY1QyVTF1CktrMGxLNU15THE4aXEzTGg0VHFhMlZnRC9xRlZ1cXBmdDFvZlNNWmJhKzFyVXYvRWRQNU5Ga1YxZDI5dFM0d0MKWExla3RiSTlZTlUwcHRXYkEzalZtdFlCSmt3bnJhV1N1ckk0WjhSelRycTFhQWY4a3djbEcyMVIzeTdBd2ZlMgphZDJyS2F6TURxNjI4SFdyWkhzRU5uSGpyak5GY0p2a0NwWUIzMUJCQXZmczRVYXJ0ci91UmppUGQzTDVpa21hCmZzNFRGMnN5akc4OEhOM3krOTdEY052TlBEei8rWEc0cGNhSkpMRXpxSjB3N2VHNForWjJnQTNhS3l5eExhd08KREpPaDFvbXFhQ0ZZb1FhWXFIRHp3VzNUdEFIK1ZUWGU4eEZZMzJuQWNnZnJmb0FiZy9hcWNvdWtHdFYrREpmdQpsNEN4VitXYTZUWGM5c3Q0bm5uQkJsaDV1QmptK1JCdXlkamZ4VldBcGJ4VGxiSlpWOUYxZ0xGR0dsMHBKMWhWCjNkVS9iZjJvYVduSlJROS9yVjlCc005WUhsZXhjbk9UL09HYXNKOHhWUWFDUldrVXhXVlN6N0MyRDZlcXBUNjIKekZ3SHRldmZtQityUGpJOHQ5Q2VkT2ZWZmlkN1FYLzVFNmVrSXp2ZEdNRUgxZ3ZyTjZMQnkvNldhRVowRDRlRQovMzdCSjYzQ3FJLzQySDk1RXZHUDRNTFFaOEhUM2ZQUmxqL1cwL1A0c3dML2h3cjAyVE51K25ud013eWYwYk1DClp3WE9DcHdWT0N2d1A2a0Fmb3dmbGpWUnp5Wk5xMGw5V2tYc2dRaHlXOGJhbXFTYndrejRBUTNlWllhUEN1OVEKQnRoa3EzQzJoME1XZ0VvZW1pL0R3Y09ScndWNGc4cnZlYlNJTWlOOFkwZzQ0Tk4rN2I2MDRYeE1WUUJHY09KLwp1RE00SkVPWEQ0NXlFUzBqT29UZHpNMEdXQTZ1OENGQzhYQXhoVXQ2UTNlUFlFb29tY0p1RDNOY2JXKzVwSHVrClhWcU9mcFRCVUI4anhncm5Fa0ZoUXpYM2xpMDUzbk5WTGlOdCtYdFd6dG5vZHN0WHEvVVhWK3dyWnBubExuS3oKbXVYQVpGV0tQTXZUUldUaTZMVkpBQ091MHpWU0V2bDFRdC9oMzEvK0ltdmxpc3M4U3NyRUpEVzNYOXN2YWhZdApaNEJ6SG9rb25VYzNMUHBaZ3pUS21uUGtFMVJaYlJBMURWUFZyZ0hmdlZIMzkxcGpSaVN0YkQ5ZklGZWhWcGNwCnl2ejJOa3MwcG9oTFlnak1FVXhQWU1YNUdpRnExYW8yd05LNkxPVWtDM29yVXJ6Y2JjWTBGTUZVTVZrQjcvUXUKWG1zckR5dmtCWlRQZGFCWW02WENaMG5laXFzQjVoNk9PUGpIc0FZc0J4ak9vUmhMVjRKeVRwKy91TUpsN0cwMgp3S0ptVE9jeExGc1JCdUxPTVZjRFhNNE9ZRkZmUkJlQW94SEc5QVFZeVNVLys2Rk1ZT1E2ZkxIQnNxVHlJc2JkCno3Y3d2SlpNTXdLTXBUU1VQYnhOb3dIMjkwenljK0hoK2UzZ05wYUpaTzhZd2UzZFptd3RwbSs0WjJ4UlgwYkIKaUFNVzZmWHREaFpRdXppRTNUZGd0d3lXK2RzOUREVjQ3MkgxR0dZTWxpc2t1amFEWmJkWWVMZjVKZThYc0x3VQozR2ZCZUoreUFrZmwzMkVnMUhiOHJZZkxTbmNqakJYbTRVdkdPSmJucXlYakhmSnZqQ0tXSXhHbmRQMXFKeGp4Ck1zQ0ppYmR3dFBSd3puSSsrK01pV3NhckRway95TCt1dFUwMm5YbUI3NFZRSG1oVi8yTkZoRjJWRExDakhCSEYKR2p1cnpDb1MyT0YvRGltTEVUZ2Z6Z3FjRlRncmNGYmdyTUJaZ2JNQ1p3WE9DcHdWK0s5UVFKMzBZdjgvbnNBNApHUjRUbUFDbjRTR1c4c001M3Y4K0REckFBbGZabHRPV3Q2Tnc1QVBjaXdreHFVNUdIcWw2dUJmMDBiQ1B4WHZ1CkRtRThhU0dLSTBiMlRkMzdoQ3pMc3hjaW5kVWNsbk1YUjh1a1l6RVpoR3VmOFZPT2QzVk1kWEt4aUhnYUk3VHIKRVd6SDBVMXNMbUk4YVpFbkJSOFNLM3RyMDVxdUc5SktMQzU1S3RZU2NEb1hoV25xbTR5SzRrNnAwekJ5RC9Bcwo1VExGUXpheVh5RExvSnEyUVc1S3FrSXJ2bzBicHhhM2RUM0NZb1RuV1NvVUhnOXdHYkVLc09UYmtVZU9Ib2FrCnFaQUxnZnhHdjRNRllHUkZUc1BLdzJXQURRU2JSN0JjejN4R2dudDRmZEp5NVdFUWttTm1HT0NGS0VyODg1OE0KOEZmaWlMdmJKaDFnSG1DMVp2MTExb3VpUXU3aC9nTmhoUW55bGlYVTNzR3RoNnZpWGJZMWMrUVkxSjdBODhGeQpoNlFWVTREcmI0TXJXcVNjd2JKWFc4RHRCaWxEU0NFaFdIaWM2WWpSME9RdE4rb3FCWXNNakY4a3hERUJHckR5CithK1RzTTl1R2VRbHZpZjRHNnh0RXBHSXk1dVp0bGp5eUx5ZGh2MkRUWTVYOUNLanl2d2FtN0RNN21vWGR5NGgKazYzOTR4WWZVTVFUWTNaWnR5ZjZmWE12bnVoOEZ1elR2TjlXbnJTOC8ybytjUW54Uk44SHdVK3dwNXYvQlZMRwpDaFlLWlc1a2MzUnlaV0Z0Q21WdVpHOWlhZ295TmlBd0lHOWlhZ294T0RNeENtVnVaRzlpYWdveE9TQXdJRzlpCmFnbzhQQ0F2VEdWdVozUm9JREl3SURBZ1VpQXZWSGx3WlNBdldFOWlhbVZqZENBdlUzVmlkSGx3WlNBdlNXMWgKWjJVZ0wxZHBaSFJvSURFMk9DQXZTR1ZwWjJoMElEY3lJQzlKYldGblpVMWhjMnNLZEhKMVpTQXZTVzUwWlhKdwpiMnhoZEdVZ2RISjFaU0F2UW1sMGMxQmxja052YlhCdmJtVnVkQ0F4SUM5R2FXeDBaWElnTDBac1lYUmxSR1ZqCmIyUmxJRDQrQ25OMGNtVmhiUXA0QWRXVU8yN0VJQkNHaVZ4czZTTlE1QWhwSTNHWUhDRnRKQ2ZhZ3RKWFNqUUYKMS9ES0Z5QWRrUkFFQnRiN3MwYUpWcWxDZ1VmZnZNd3dRNHczckxGbjI0RWk3cUVYMHd6dUs4ditVZWs5RE5McwpZSXlTL2dJRHV2c25yM0t3b01wdmNPQmxzSWNzZUlUdnd6SXduTUNTaUU0Wk9vUjZOWjhaMmdpV2V0VU1Ud2puCmRiYlprbnBRWDBGMkh4R2VZOG9XY3ZhZ0drZ00wMWtwNXl0TEgra2pTVTZNQU9zeEU0VEtMdysyWGlOQU42VWMKdkFBV2tIZTg0bzEyb2R6VUlIUWg2UCtmMkRuUlcyYzZndWlVemdtRnBTdDk1VjhVVnI0Mlc3Z0JWaGV1NWViZQpnYzBnMkh2SHpkRDAvSGxrQkhZZEhZbFM3SENIMEpEaGtYbFZrR2l1STlNa1N0UEJQUjlrWTFsZ0hBR08xZkozCk9OY3h2SXJKcy9uVnZBeWFUTTVnQmRhem5paTlZRkQ1WlZnT3VZUkRCT2llbmN3d1JsMCs3WTYzdVdtNlVHN3EKaXhCNjhLTCtXZm9HVjRWN0l3cGxibVJ6ZEhKbFlXMEtaVzVrYjJKcUNqSXdJREFnYjJKcUNqTXpOUXBsYm1SdgpZbW9LTXpFZ01DQnZZbW9LUER3Z0wweGxibWQwYUNBek1pQXdJRklnTDA0Z015QXZRV3gwWlhKdVlYUmxJQzlFClpYWnBZMlZTUjBJZ0wwWnBiSFJsY2lBdlJteGhkR1ZFWldOdlpHVWdQajRLYzNSeVpXRnRDbmdCblpaM1ZGUFoKRm9mUHZUZTkwQklpSUNYMEdub0pJTkk3U0JVRVVZbEpnRkFDaG9RbWRrUUZSaFFSS1Zaa1ZNQUJSNGNpWTBVVQpDNE9DWXRjSjhoQlF4c0ZSUkVYbDNZeHJDZSt0TmZQZW12M0hXZC9aNTdmWDJXZnZmZGU2QUZEOGdnVENkRmdCCmdEU2hXQlR1NjhGY0VoUEx4UGNDR0JBQkRsZ0J3T0ZtWmdSSCtFUUMxUHk5UFptWnFFakdzL2J1TG9Ca3U5c3MKdjFBbWM5Yi9mNUVpTjBNa0JnQUtSZFUyUEg0bUYrVUNsRk96eFJreS93VEs5SlVwTW9ZeE1oYWhDYUtzSXVQRQpyMnoycCtZcnU4bVlseWJrb1JwWnpobThOSjZNdTFEZW1pWGhvNHdFb1Z5WUplQm5vM3dIWmIxVVNab0E1ZmNvCjA5UDRuRXdBTUJTWlg4em5KcUZzaVRKRkZCbnVpZklDQUFpVXhEbThjZzZMK1Rsb25nQjRwbWZraWdTSlNXS20KRWRlWWFlWG95R2I2OGJOVCtXSXhLNVREVGVHSWVFelA5TFFNampBWGdLOXZsa1VCSlZsdG1XaVI3YTBjN2UxWgoxdVpvK2IvWjN4NStVLzA5eUhyN1ZmRW03TStlUVl5ZVdkOXM3S3d2dlJZQTlpUmFteDJ6dnBWVkFMUnRCa0RsCjRheFA3eUFBOGdVQXRONmM4eDZHYkY2U3hPSU1Kd3VMN094c2N3R2ZheTRyNkRmN240SnZ5citHT2ZlWnkrNzcKVmp1bUZ6K0JJMGtWTTJWRjVhYW5wa3RFek13TURwZlBaUDMzRVAvandEbHB6Y25ETEp5ZndCZnhoZWhWVWVpVQpDWVNKYUx1RlBJRllrQzVrQ29SLzFlRi9HRFluQnhsK25Xc1VhSFZmQUgyRk9WQzRTUWZJYnowQVF5TURKRzQvCmVnSjk2MXNRTVFySXZyeG9yWkd2YzQ4eWV2N24raDhMWElwdTRVeEJJbFBtOWd5UFpISWxvaXdabzkrRWJNRUMKRXBBSGRLQUtOSUV1TUFJc1lBMGNnRE53QTk0Z0FJU0FTQkFEbGdNdVNBSnBRQVN5UVQ3WUFBcEJNZGdCZG9OcQpjQURVZ1hyUUJFNkNObkFHWEFSWHdBMXdDd3lBUjBBS2hzRkxNQUhlZ1drSWd2QVFGYUpCcXBBV3BBK1pRdFlRCkcxb0llVU5CVURnVUE4VkRpWkFRa2tENTBDYW9HQ3FEcXFGRFVEMzBJM1FhdWdoZGcvcWdCOUFnTkFiOUFYMkUKRVpnQzAyRU4yQUMyZ05td094d0lSOExMNEVSNEZad0hGOERiNFVxNEZqNE90OElYNFJ2d0FDeUZYOEtUQ0VESQpDQVBSUmxnSUcvRkVRcEJZSkFFUklXdVJJcVFDcVVXYWtBNmtHN21OU0pGeDVBTUdoNkZobUJnV3hobmpoMW1NCjRXSldZZFppU2pEVm1HT1lWa3dYNWpabUVET0IrWUtsWXRXeHBsZ25yRDkyQ1RZUm00MHR4RlpnajJCYnNKZXgKQTloaDdEc2NEc2ZBR2VJY2NINjRHRnd5YmpXdUJMY1AxNHk3Z092RERlRW04WGk4S3Q0VTc0SVB3WFB3WW53aAp2Z3AvSEg4ZTM0OGZ4cjhua0FsYUJHdUNEeUdXSUNSc0pGUVFHZ2puQ1AyRUVjSTBVWUdvVDNRaWhoQjV4RnhpCktiR08yRUc4U1J3bVRwTVVTWVlrRjFJa0tabTBnVlJKYWlKZEpqMG12U0dUeVRwa1IzSVlXVUJlVDY0a255QmYKSlErU1AxQ1VLQ1lVVDBvY1JVTFpUamxLdVVCNVFIbERwVklOcUc3VVdLcVl1cDFhVDcxRWZVcDlMMGVUTTVmegpsK1BKclpPcmtXdVY2NWQ3SlUrVTE1ZDNsMTh1bnlkZklYOUsvcWI4dUFKUndVREJVNEdqc0ZhaFJ1RzB3ajJGClNVV2FvcFZpaUdLYVlvbGlnK0kxeFZFbHZKS0JrcmNTVDZsQTZiRFNKYVVoR2tMVHBYblN1TFJOdERyYVpkb3cKSFVjM3BQdlRrK25GOUIvb3ZmUUpaU1ZsVytVbzVSemxHdVd6eWxJR3dqQmcrRE5TR2FXTWs0eTdqSS96Tk9hNQp6K1BQMnphdmFWNy92Q21WK1NwdUtueVZJcFZtbFFHVmo2cE1WVy9WRk5XZHFtMnFUOVF3YWlacVlXclphdnZWCkxxdU56NmZQZDU3UG5WODAvK1Q4aCtxd3VvbDZ1UHBxOWNQcVBlcVRHcG9hdmhvWkdsVWFselRHTlJtYWJwckoKbXVXYTV6VEh0R2hhQzdVRVd1VmE1N1ZlTUpXWjdzeFVaaVd6aXptaHJhN3RweTNSUHFUZHF6MnRZNml6V0dlagpUclBPRTEyU0xsczNRYmRjdDFOM1FrOUxMMWd2WDY5Ujc2RStVWit0bjZTL1I3OWJmOHJBMENEYVlJdEJtOEdvCm9ZcWh2MkdlWWFQaFl5T3FrYXZSS3FOYW96dkdPR08yY1lyeFB1TmJKckNKblVtU1NZM0pUVlBZMU41VVlMclAKdE04TWErWm9KalNyTmJ2SG9yRGNXVm1zUnRhZ09jTTh5SHlqZVp2NUt3czlpMWlMblJiZEZsOHM3U3hUTGVzcwpIMWtwV1FWWWJiVHFzUHJEMnNTYWExMWpmY2VHYXVOanM4Nm0zZWExcmFrdDMzYS83WDA3bWwydzNSYTdUcnZQCjlnNzJJdnNtK3pFSFBZZDRoNzBPOTloMGRpaTdoSDNWRWV2bzRiak84WXpqQnlkN0o3SFRTYWZmblZuT0tjNE4KenFNTERCZndGOVF0R0hMUmNlRzRISEtSTG1RdWpGOTRjS0hVVmR1VjQxcnIrc3hOMTQzbmRzUnR4TjNZUGRuOQp1UHNyRDBzUGtVZUx4NVNuaytjYXp3dGVpSmV2VjVGWHI3ZVM5Mkx2YXUrblBqbytpVDZOUGhPK2RyNnJmUy80CllmMEMvWGI2M2ZQWDhPZjYxL3RQQkRnRXJBbm9DcVFFUmdSV0J6NExNZ2tTQlhVRXc4RUJ3YnVDSHkvU1h5UmMKMUJZQ1F2eERkb1U4Q1RVTVhSWDZjeGd1TERTc0p1eDV1RlY0Zm5oM0JDMWlSVVJEeEx0SWo4alN5RWVMalJaTApGbmRHeVVmRlJkVkhUVVY3UlpkRlM1ZFlMRm16NUVhTVdvd2dwajBXSHhzVmV5UjJjcW4zMHQxTGgrUHM0Z3JqCjdpNHpYSmF6N05weXRlV3B5OCt1a0YvQldYRXFIaHNmSGQ4US80a1R3cW5sVEs3MFg3bDM1UVRYazd1SCs1TG4KeGl2bmpmRmQrR1g4a1FTWGhMS0UwVVNYeEYySlkwbXVTUlZKNHdKUFFiWGdkYkpmOG9Ia3FaU1FsS01wTTZuUgpxYzFwaExUNHROTkNKV0dLc0N0ZE16MG52Uy9ETktNd1E3ckthZFh1VlJPaVFOR1JUQ2h6V1dhN21JNytUUFZJCmpDU2JKWU5aQzdOcXN0NW5SMldmeWxITUVlYjA1SnJrYnNzZHlmUEorMzQxWmpWM2RXZStkdjZHL01FMTdtc08KcllYV3JsemJ1VTUzWGNHNjRmVys2NDl0SUcxSTJmRExSc3VOWlJ2ZmJvcmUxRkdnVWJDK1lHaXo3K2JHUXJsQwpVZUc5TGM1YkRtekZiQlZzN2QxbXM2MXEyNWNpWHRIMVlzdmlpdUpQSmR5UzY5OVpmVmY1M2N6MmhPMjlwZmFsCiszZmdkZ2gzM04zcHV2TlltV0paWHRuUXJ1QmRyZVhNOHFMeXQ3dFg3TDVXWVZ0eFlBOXBqMlNQdERLb3NyMUsKcjJwSDFhZnFwT3FCR28rYTVyM3FlN2Z0bmRySDI5ZS8zMjEvMHdHTkE4VUhQaDRVSEx4L3lQZFFhNjFCYmNWaAozT0dzdzgvcm91cTZ2MmQvWDM5RTdVanhrYzlIaFVlbHg4S1BkZFU3MU5jM3FEZVVOc0tOa3NheDQzSEhiLzNnCjlVTjdFNnZwVURPanVmZ0VPQ0U1OGVMSCtCL3ZuZ3c4MlhtS2ZhcnBKLzJmOXJiUVdvcGFvZGJjMW9tMnBEWnAKZTB4NzMrbUEwNTBkemgwdFA1di9mUFNNOXBtYXM4cG5TOCtSemhXY216bWZkMzd5UXNhRjhZdUpGNGM2VjNRKwp1clRrMHAydXNLN2V5NEdYcjE3eHVYS3AyNzM3L0ZXWHEyZXVPVjA3ZloxOXZlMkcvWTNXSHJ1ZWxsL3NmbW5wCnRlOXR2ZWx3cy8yVzQ2Mk92Z1Y5NS9wZCt5L2U5cnA5NVk3L25Sc0Rpd2I2N2k2K2UvOWUzRDNwZmQ3OTBRZXAKRDE0L3pIbzQvV2o5WSt6am9pY0tUeXFlcWordC9kWDQxMmFwdmZUc29OZGd6N09JWjQrR3VFTXYvNVg1cjAvRApCYytwenl0R3RFYnFSNjFIejR6NWpOMTZzZlRGOE11TWw5UGpoYjhwL3JiM2xkR3JuMzUzKzcxbllzbkU4R3ZSCjY1ay9TdDZvdmpuNjF2WnQ1MlRvNU5OM2FlK21wNHJlcTc0LzlvSDlvZnRqOU1lUjZleFArRStWbjQwL2Qzd0oKL1BKNEptMW01dC8zaFBQN0NtVnVaSE4wY21WaGJRcGxibVJ2WW1vS016SWdNQ0J2WW1vS01qWXhNZ3BsYm1SdgpZbW9LTVRFZ01DQnZZbW9LV3lBdlNVTkRRbUZ6WldRZ016RWdNQ0JTSUYwS1pXNWtiMkpxQ2pNeklEQWdiMkpxCkNqdzhJQzlNWlc1bmRHZ2dNelFnTUNCU0lDOU9JREVnTDBGc2RHVnlibUYwWlNBdlJHVjJhV05sUjNKaGVTQXYKUm1sc2RHVnlJQzlHYkdGMFpVUmxZMjlrWlNBK1BncHpkSEpsWVcwS2VBR2xWd2RZazljYVB2OUl3a3JZVTBiWQp5REtnN0JtWkFXUVBRVlJpRWtnWUlRYUNnTGdveFFyV0xRNGNGUzJLVXJSYUVTZ3UxT0tnYmxEcnVGQkxCYVVXCnE3aXdlczhKb05EMnVmYyt6ODMvSFA3M2ZHZDg2ejNmZndCQVhjaVZTTEp4QUVDT09GOGFFc3RPbnBtY3dxVGQKQXdwQUY2Z0NSNkRLNWVWSjJOSFJFWEFLRU9lS0JlZzk4ZmV5QzJCSWNzTUI3VFZ4N0wvMktIeEJIZy9PT2dWYgpFVCtQbHdNQTVnMEFyWThua2VZRG9HZ0I1ZVlMOGlVSWgwS3NsUlVmR3dCeEtnQUtLcU5yb1JpWWhBakVBcW1JCnh3eVJjb3VZSWR5Y0hDN1QyZEdaR1MzTlRSZGwvNFBWYU5ILzg4dkpsaUc3MGM4RU5wVzhyTGh3K0hhRTlwZngKdVlFSXUwTjhtTWNOaWh2Rmp3dEVpWkVRK3dPQW0wbnlwOGRDSEFieFBGbFdBaHRpZTRqcjA2WEJDUkQ3UW54YgpLQXRGZUJvQWhFNnhNRDRKWW1PSXc4VHpJcU1nOW9SWXlNc0xTSUhZQnVJYW9ZQ0Q4Z1JqUmx3VTVYUGlJWWI2CmlLZlMzRmcwM3hZQTBwc3ZDQXdha1pQcFdibmh5QVl6S1A4dXJ5QU95ZVUyRndzRGtKMVFGOW1WeVEyTGh0Z0sKNGhlQzdCQTBIKzVETVpEa1I2TTlZWjhTS002T1JIcjlJYTRTNU1uOWhYMUtWNzR3SHVYTUdRQ3FXYjQwSHEyRgp0bEhqMDBYQkhJaURJUzRVU2tPUkhQcExQU0hKbHZNTXhvVDZUaXFMUmI1REgybkJBbkVDaWlIaXhWS3VOQ2dFClloZ3JXaXRJeExoQUFITEJQUGlYQjhTZ0J6QkJIaENCQWpuS0FGeVFBeHNUV21BUFd3aWNKWVpOQ21ma2dTd28KejRDNDkrTTQ2cU1WYUkwRWp1U0NkRGd6RzY0Ymt6SUJINjRmV1lmMnlJVU45ZEMrZmZKOWVhUDZIS0crQU9PdgpnUXlPQzhFQUhCZENOQU4weXlXRjBMNGMyQStBVWhrY3k0QjR2QlpueUNObkVDMjNkY1FHTkk2MDlJOXF5WVVyCitISmRJK3VRbHlPMkJVQ2J4YUFZamlIYjVKNlR1aVNMbkFxYkZ4bEIrcEFzdVRZcG5GRUVIT1J5Yjdsc1RPc24KejVGdi9SKzF6b2UyanZkK2ZMekdZbndheGlzZjdwd05QUlNQeGljUFd2TU8ycDAxdXZwVE5PVWExeGpJYkNTUwpxbFV4bkRtMWNvdVI3OHhTNlZ3Ujc4cnF3ZitRdFUvWkd0UHVNQ0Z2VWVONUlXY0svMis4Z0xvbzF5bFhLUThvCk53RVR2bitoZEZMNklMcEx1UWVmT3gvdGlSN0hCeFI3eEJ3Ui9DdUNQbzR4WUlSWlBMa0U1U0liUGlndmY3ZnoKVTg1Rzl2bkxEaGdoMTRzNHk1YnZnaGlXQXh2S3JFQ2UxeENvbnd2emtRZWpMWU04UmR4d2dJd1puN3NSTGVOTwpRSHRKcXg1Z2RxMDhkUUV3NjlXYXo4dTF5S1BkU1RhbDNsQnBMMGtYcnpHUVNPYlVsZ3dMSko5R1VSNEV5eU5mClJvSlNlOVloMWdCckQ2dWU5WnoxNE5NTTFpM1diNnhPMWk0NDhvUllUeHdsamhQTlJBdlJBWml3MTBLY0pwcmwKcUo1b2hjKzNIOWROWlBqSU9ackljTVEzM2lpamtZLzVvNXdhei8xeEhzcmpOUll0Tkg4c1U1bWpKM1U4OTFCOAp4ek1HWmV4L3MyaDhSaWRXaEpIc3lFOGR3NXpoeEtBeGJCa3VERFlEWTVqQ3g1bmhENUU1dzR3UndkQ0ZvNkVNCmEwWWdZOUxIZUl5Y2NXUUhPdStJWVdOMTRWTVZTNGFqWTB4QS9na2hENlR5bXNVZDlmZXZQakluZUlrcW1tajgKcWNMbzhHU09hQnFwQ1dNNngrSXFaOGlFazVVQU5ZbkFBbWlIRk1ZVm5YWXhyQ1hNQ1hOUUpVWlZDRElTbXlYUAo0VCtjQk5LWWRDSTVzREpGQVNiSkpsMUkvMUdNcXBVM2ZGQ3RHcW5lRHFRZkhQVWxBMGwzVk1mR2V3QjNINGtYCnFtai9iUDM0a3lHZ2VsS3RxVUZVYS9uZWN1K29nZFJRYWpCZ1VwMlFuRHFGR2dheEI1cVZMeWlFZHc4QUFuSWwKUlZKUmhqQ2Z5WWEzSEFHVEkrWTUyak9kV1U3dzY0YnVUR2dPQU05ajVIY2hUS2VESjVNV2pNaEk5S0lBSlhpZgowZ0w2OEt0cURyL1dEdEFyTitBRnY1bEI4QTRRQmVKQk1wZ0QvUkRDVEVwaFpFdkFNbEFPS3NFYXNCRnNCVHZCCkhsQUhHc0JoY0F5MGd0UGdCM0FKWEFXZDRDNzhudlNDSjJBUXZBVERHSWJSTURxbWllbGpKcGdsWm9jNVkrNlkKTHhhRVJXQ3hXREtXaG1WZ1lreUdsV0NmWVpYWU9td3J0Z3Vydzc3Rm1ySFQyQVhzR25ZSDY4SDZzVCt3dHppQgpxK0JhdUJGdWhVL0IzWEUySG83SDQ3UHhESHcrWG95WDRhdnd6WGdOWG84MzRxZnhTM2duM28wL3dZY0lRQ2dUCk9vUXA0VUM0RXdGRUZKRkNwQk5TWWpGUlFWUVJOVVFEckFIdHhBMmlteGdnM3BCVVVwTmtrZzR3aTZGa0Fza2oKNTVPTHlaWGtWbklmMlVpZUpXK1FQZVFnK1o1Q3B4aFM3Q2llRkE1bEppV0Rzb0JTVHFtaTFGS09VczdCQ3QxTAplVW1sVW5WZ2Z0eGczcEtwbWRTRjFKWFU3ZFNEMUZQVWE5U0gxQ0VhamFaUHM2UDUwS0pvWEZvK3JaeTJoVlpQCk8wbTdUdXVsdlZaUVZqQlJjRllJVmtoUkVDdVVLbFFwN0ZjNG9YQmQ0WkhDc0tLYW9xV2lwMktVSWwreFNIRzEKNGg3RkZzVXJpcjJLdzBycVN0WktQa3J4U3BsS3k1UTJLelVvblZPNnAvUmNXVm5aVE5sRE9VWlpwTHhVZWJQeQpJZVh6eWozS2IxUTBWR3hWQWxSU1ZXUXFxMVQycXB4U3VhUHluRTZuVzlIOTZTbjBmUG9xZWgzOURQMEIvVFZECmsrSEk0REQ0akNXTWFrWWo0enJqcWFxaXFxVXFXM1dPYXJGcWxlb1IxU3VxQTJxS2FsWnFBV3BjdGNWcTFXck4KYXJmVWh0UTExWjNVbzlSejFGZXE3MWUvb042blFkT3cwZ2pTNEd1VWFleldPS1B4VUpQUU5OY00wT1JwZnFhNQpSL09jWnE4V1ZjdGFpNk9WcVZXcDlZM1daYTFCYlEzdGFkcUoyb1hhMWRySHRidDFDQjBySFk1T3RzNXFuY002ClhUcHZkWTEwMmJvQzNSVzZEYnJYZFYvcFRkTHoxeFBvVmVnZDFPdlVlNnZQMUEvU3o5SmZxMzlNLzc0QmFXQnIKRUdPd3dHQ0h3VG1EZ1VsYWs3d204U1pWVERvODZTZEQzTkRXTU5ad29lRnV3dzdESVNOam94QWppZEVXb3pORwpBOFk2eHY3R21jWWJqRThZOTV0b212aWFpRXcybUp3MGVjelVacktaMmN6TnpMUE1RVk5EMDFCVG1la3UwOHVtCncyYldaZ2xtcFdZSHplNmJLNW03bTZlYmJ6QnZNeCswTUxHWVlWRmljY0RpSjB0RlMzZExvZVVteTNiTFYxYlcKVmtsV3k2Mk9XZlZaNjFsenJJdXREMWpmczZIYitObk10Nm14dVRtWk90bDljdGJrN1pPdjJ1SzJMclpDMjJyYgpLM2E0bmF1ZHlHNjczVFY3aXIySHZkaSt4djZXZzRvRDI2SEE0WUJEajZPT1k0UmpxZU14eDZkVExLYWtURms3CnBYM0tlNVlMS3h0KzNlNDZhVGlGT1pVNnRUajk0V3pyekhPdWRyNDVsVDQxZU9xU3FVMVRuMDJ6bXlhWXRtUGEKYlJkTmx4a3V5MTNhWFA1MGRYT1Z1amE0OXJ0WnVLVzViWE83NWE3bEh1MiswdjI4QjhWanVzY1NqMWFQTjU2dQpudm1laHoxLzkzTHd5dkxhNzlYbmJlMHQ4TjdqL2RESHpJZnJzOHVuMjVmcG0rYjdsVyszbjZrZjE2L0c3MmQvCmMzKytmNjMvSS9aa2RpYTdudjEwT211NmRQclI2YThDUEFNV0Jad0tKQUpEQWlzQ0x3ZHBCQ1VFYlExNkVHd1cKbkJGOElIZ3d4Q1ZrWWNpcFVFcG9lT2phMEZzY0l3NlBVOGNaREhNTFd4UjJObHdsUEM1OGEvalBFYllSMG9pVwpHZmlNc0Juclo5eUx0SXdVUng2TEFsR2NxUFZSOTZPdG8rZEhmeDlEalltT3FZNzVOZFlwdGlTMlBVNHpibTdjCi9yaVg4ZFBqVjhmZlRiQkprQ1cwSmFvbXBpYldKYjVLQ2t4YWw5UTljOHJNUlRNdkpSc2tpNUtiVW1ncGlTbTEKS1VPemdtWnRuTldiNnBKYW50bzEyM3AyNGV3TGN3em1aTTg1UGxkMUxuZnVrVFJLV2xMYS9yUjMzQ2h1RFhkbwpIbWZldG5tRHZBRGVKdDRUdmo5L0E3OWY0Q05ZSjNpVTdwTytMcjB2d3lkamZVYS8wRTlZSlJ3UUJZaTJpcDVsCmhtYnV6SHlWRlpXMU4rdERkbEwyd1J5Rm5MU2NackdHT0V0OE50YzR0ekQzbXNST1VpN3BudTg1ZitQOFFXbTQKdERZUHk1dWQxNVN2QmYvQjdKRFp5RDZYOVJUNEZsUVh2RjZRdU9CSW9YcWh1TENqeUxab1JkR2o0dURpcnhlUwpDM2tMMjBwTVM1YVY5Q3hpTDlxMUdGczhiM0hiRXZNbFpVdDZsNFlzM2JkTWFWbldzaDlMV2FYclNsOThsdlJaClM1bFIyZEt5aDUrSGZINmduRkV1TGIrMTNHdjV6aS9JTDBSZlhGNHhkY1dXRmU4citCVVhLMW1WVlpYdlZ2SlcKWHZ6UzZjdk5YMzVZbGI3cThtclgxVHZXVU5lSTEzU3Q5VnU3YjUzNnV1SjFEOWZQV04rNGdibWhZc09MalhNMwpYcWlhVnJWems5SW0yYWJ1elJHYm03WlliRm16NWQxVzRkYk82dW5WQjdjWmJsdXg3ZFYyL3Zick8veDNOT3cwCjJsbTU4KzFYb3E5dTd3cloxVmhqVlZPMW03cTdZUGV2ZXhMM3RIL3QvblZkclVGdFplMmZlOFY3dS9mRjdqdGIKNTFaWHQ5OXcvK29EK0FIWmdmNzYxUHFyM3dSKzA5VGcwTERyb003QnlrUGdrT3pRNDIvVHZ1MDZISDY0N1lqNwprWWJ2TEwvYmRsVHphRVVqMWxqVU9IaE1lS3k3S2JucFduTlljMXVMVjh2Ujd4Mi8zOXRxMmxwOVhQdjQ2aE5LCko4cE9mRGhaZkhMb2xPVFV3T21NMHcvYjVyYmRQVFB6ek0yek1XY3Zud3MvZC82SDRCL090TFBiVDU3M09kOTYKd2ZOQzgwWDNpOGN1dVY1cTdIRHBPUHFqeTQ5SEw3dGVicnppZHFYcHFzZlZsbXZlMTA1Yzk3dCsra2JnalI5dQpjbTVlNm96c3ZOYVYwSFg3VnVxdDd0djgyMzEzc3U4OCs2bmdwK0c3UytFbHZ1SysydjJxQjRZUGF2NDErVjhICnUxMjdqL2NFOW5UOEhQZnozWWU4aDA5K3lmdmxYVy9aci9SZnF4NlpQS3JyYys1cjdRL3V2L3A0MXVQZUo1SW4Kd3dQbHY2bi90dTJwemRQdmZ2Zi92V053NW1Edk0rbXpEMytzZks3L2ZPK0xhUy9haHFLSEhyek1lVG44cXVLMQovdXQ5Yjl6ZnRMOU5ldnRvZU1FNzJydk5mMDcrcytWOStQdDdIM0krZlBnM0xWM3dIQXBsYm1SemRISmxZVzBLClpXNWtiMkpxQ2pNMElEQWdiMkpxQ2pNek5qY0taVzVrYjJKcUNqRTBJREFnYjJKcUNsc2dMMGxEUTBKaGMyVmsKSURNeklEQWdVaUJkQ21WdVpHOWlhZ296SURBZ2IySnFDanc4SUM5VWVYQmxJQzlRWVdkbGN5QXZUV1ZrYVdGQwpiM2dnV3pBZ01DQTFPVFV1TWpjMU5pQTROREV1T0RnNU9GMGdMME52ZFc1MElERWdMMHRwWkhNZ1d5QXlJREFnClVpQmRDajQrQ21WdVpHOWlhZ296TlNBd0lHOWlhZ284UENBdlZIbHdaU0F2UTJGMFlXeHZaeUF2VUdGblpYTWcKTXlBd0lGSWdQajRLWlc1a2IySnFDakk1SURBZ2IySnFDanc4SUM5VWVYQmxJQzlHYjI1MElDOVRkV0owZVhCbApJQzlVY25WbFZIbHdaU0F2UW1GelpVWnZiblFnTDFOSVFrdFBRaXRJWld4MlpYUnBZMkVnTDBadmJuUkVaWE5qCmNtbHdkRzl5Q2pNMklEQWdVaUF2Ulc1amIyUnBibWNnTDAxaFkxSnZiV0Z1Ulc1amIyUnBibWNnTDBacGNuTjAKUTJoaGNpQXpNaUF2VEdGemRFTm9ZWElnTVRJMUlDOVhhV1IwYUhNZ1d5QXlOemdLTUNBd0lEQWdNQ0F3SURZMgpOeUF4T1RFZ016TXpJRE16TXlBek9Ea2dNQ0F5TnpnZ016TXpJREkzT0NBeU56Z2dNQ0ExTlRZZ05UVTJJRFUxCk5pQTFOVFlnTlRVMklEQWdNQW93SURBZ01qYzRJREFnTUNBd0lEQWdNQ0F3SURZMk55QTJOamNnTnpJeUlEY3kKTWlBMk5qY2dOakV4SURBZ056SXlJREkzT0NBd0lEQWdOVFUySURnek15QTNNaklnTnpjNENqWTJOeUEzTnpnZwpOekl5SURZMk55QTJNVEVnTUNBd0lEQWdOalkzSURZMk55QXdJREFnTUNBd0lEQWdNQ0F3SURVMU5pQTFOVFlnCk5UQXdJRFUxTmlBMU5UWWdNamM0SURVMU5nbzFOVFlnTWpJeUlEQWdOVEF3SURJeU1pQTRNek1nTlRVMklEVTEKTmlBMU5UWWdOVFUySURNek15QTFNREFnTWpjNElEVTFOaUF3SURjeU1pQTFNREFnTlRBd0lEVXdNQ0F6TXpRSwpNQ0F6TXpRZ1hTQStQZ3BsYm1Sdlltb0tNellnTUNCdlltb0tQRHdnTDFSNWNHVWdMMFp2Ym5SRVpYTmpjbWx3CmRHOXlJQzlHYjI1MFRtRnRaU0F2VTBoQ1MwOUNLMGhsYkhabGRHbGpZU0F2Um14aFozTWdNeklnTDBadmJuUkMKUW05NElGc3RPVFV4SUMwME9ERWdNVFEwTlNBeE1USXlYUW92U1hSaGJHbGpRVzVuYkdVZ01DQXZRWE5qWlc1MApJRGMzTUNBdlJHVnpZMlZ1ZENBdE1qTXdJQzlEWVhCSVpXbG5hSFFnTnpFM0lDOVRkR1Z0VmlBNU9DQXZXRWhsCmFXZG9kQW8xTWpNZ0wxTjBaVzFJSURnMUlDOUJkbWRYYVdSMGFDQTBOREVnTDAxaGVGZHBaSFJvSURFMU1EQWcKTDBadmJuUkdhV3hsTWlBek55QXdJRklnUGo0S1pXNWtiMkpxQ2pNM0lEQWdiMkpxQ2p3OElDOU1aVzVuZEdnZwpNemdnTUNCU0lDOU1aVzVuZEdneElERTVOemc0SUM5R2FXeDBaWElnTDBac1lYUmxSR1ZqYjJSbElENCtDbk4wCmNtVmhiUXA0QWNWOGVYeFVSYlp3VmQyMTEvUytyK2wwZHpyN1FqWVNralprWXdteXFDUklNRURDaml4Q1dBUW0KS29nc29vSXNBbzdpd3E2RUVDV0FNQXlpaU9Nb091S0M2SXdqT3M2TWVjN013MldBdnZsTzNRNFI4dWJOenovbQo5Nzd1UHJYZVcvZlVxVk9uempsVnQrZk5uZCtNTktnVk1XajRtUEd6SnlINVV6TWJJZmJpeEpuaklhWWY4MFVJCjNwL1lNczlIY3doeGJ5REVySjAwZS9MTWVGNXhHMEtxUnlmUFdOUnp2elVMb2F3bFU1ckhOOFhyMFRXSTg2ZEEKUVR5UCswR2NOR1htdklYeHZPa1N4RC9PbURXeHA5N1NCdmxsTThjdjdIaytvcy8zM1QxK1puUDgrcHFoRUNmTgpublhQdkhpK2VqL0VUOCtlMjl4elBhNEQvTzlHR0VwTDBTeWtRTk9SZ0FqU3dYY3lRc0xYcWtjUkM3VzBIajZUCmQzZS9kVmRDeVhkSUw4cjV1Mm9ma2VPUGpqeXo3Y2ZtYTJIVlkrSS9vVUJ4L1hvYTh4RXBncEFhUTMyWDZySGUKR3ZrK0NFbzdVVU1xUG9vNGZBVGRsWXAvaFk4Qkl2MVFCTG1SQWFxYlUzK0ZYMEhsZlVxT28vNDNsYUJmNGNPbwpGZzFBQlNpNTk3Wk8xSWh1bFV1Y1BRMGRRZFZ3elkxTkgrM1RORHFLVDBDSG0xSTc4Y3UreXFWVGJSV2RhRlJxCkp4b0VVQWFRQjVDYWVvc050ZUtkNkZHQXB3RVlOQld2UVlzQVZnRThBY0QycHZaQTdnaGUwODZLMGFONEVYTGcKd1ZFVjY3M05aUGZhbENydmU1Mlk3L2lsOTJQYkY4ZXdIWmpyYzJ4djF5REZMVXI4Tkg0S05TRXZmaDRGOFdKVQpnNUx4MWtPUkdkNUdxTnFEWmdPMEFqQnlpUEdlZGsrTzl3Uk9RMEVXd3owaDVHSHh5OTQvWmFkN3Y4enVKTGpkCmV5cmN5VUwwYXcva29nbmVrKzVmZW4vbG51dzlBYkF2WHJVM0FsZTg3TjNqbnVIZDRPbkVXOXU5NjkyZEdPNTUKTEI3TmQ4T3RMM3RuUmpaNW03TGwrcUdiT3NtK2RtOFIxTjhSVlhuekMvM2VQUGNsYjJhNFU4U1FUM2NQOWFaawovOWFiQkRmQ1pUNW9OQmpWZTEzdURkNytVT1Z4VjRiN0F4ekRlL0UybElLM3RRY0hlNDlDRXJwN2FGQ2tjRk1uCnZ2ZFFUWEoyc0JNdmp1YlhKRytLMUlTRGthSGVZS1FxSEliMEhXOEl5NFU3aFZ1RUhDRlZTQlpDZ2w5d0NpYlIKSU9wRXJhZ1dsYUlvQ3AxNGYzdVpseitHOTZFeUlNdStReUl2Y3AzNFJTaGtqK0VYNU1JWERvdXNTRVFrbWpxNwovOUNCZ0QxTm5YaGZoNDZtSVBFeUw2ZjRUdnpDb1hqUkMxRXZTMU9zWEtFak5BMEJoSWhna2FEQnFBMC8zTW1qCkZaYVdNbHVab1ZSZlZGWHh2d1dOY3MzMU1QVi8vOWl3dTIzVGtGRjFiWHZkOVcwNU5OSHRycjkrdWUxNjRuK04KNTgySHF1YnkxTlFoSXhjZGFwazliVkpsYzZDeU1WRFpETkRZdHFabGlxMnRkWUxQZDNEYWJGcmhhMk5DalJNbQpUcUh4K09hMjJZSG1pclpwZ1FyZndSYjV2ajdWazJoMVM2RGlJSnBVZVZ2ZHdVblI1b3IybG1oTFpXQjhSZjJoCkNlVnpHMjU2MXFyZVo4MHQveGZQS3FlTnphWFBtaURmMStkWkRiUjZBbjFXQTMxV0EzM1doT2dFK1ZtMDg1VlQKUjVYZk13KzQwMWM1ZFlpdkxYbFUyNkFSWStyYWZPUHJLenJ4VGlpc21BOFMrU1RTY2NkUk10ZUtIR3dtOGlMVQovVEhBQlJwTHQzZC94WjFCT21sbTk5K1pZaGpWSXhTSVZGYUNUcUtIMFRaMEFQRm9ONlNUMFRpMEJaM0YwMkJ5CmowVWQ2QVBzUVJtd05yQ29FdzFGYitIdTduZlJKUFFjWEQ4UG5VSWIwVUdraG50bUlqUFVyc1BCN3NXUWowSjYKQWxyZS9ReEtRb1hvUVhRY0ZVR3I2MUJYOTU3dVExQTdFdDJPOXFKOWNQOXZjSUFjWkkzZEwzWmZRaUlhQVcwdQpoNXAzdTRkMkh3QnBsd1l5YkRpVUxrY25jSkM1MEQwRjJWQXhZTGNkUFlWMm9GK2piL0Q5dUtON1NuZEw5N251Cno0RlhiY2lGUnNGM0tlN0Fuek1IMkFlN3QzZi9wVnNDU2lTakZIaHFJOXFBbm9YMkQ4RDNKSWorU2p3ZHo4TWIKOEVZU0pmZVREbllGWjVWaVFJY0lTTk5xRUUyejBFTkFnU1BvTlBvSCtpZitsdGdZSFRPUGVhMDdyL3Uva1FvTgpnVjdTbmpTakZ2aXVoTzg2Nk5NeHpPTXNQQkFQeDB2eDQzZ2ovaDFKSWJlVE9yS0FMQ1JmTWNPWXNjd2k1bmZzClBXdzd0NWJid3F1azc3cVBkWi9wUG8rc3NDemNpZWFpWmRDN1UrZ2N1b3l1WUFiYWN1RWdMc2JsZUJ4OFcvRTIKY2dUdndFZkljSHdTbnlONzhlL3hGL2hiZkpWd1JFM01KSlhNSXh2SVBuS0t2TTFNWlRZeVR6Qy9aNzVqU3puQwo3ZUMrNUlQQ0o5SUVhWlgwZG5keDkrZmRQNEtNRlpFZlJxWWNEVU4zb2ZIUTI5bXc5UHdDZXZFQ2ZBL0FxSjFHCnI2R3o4dmNMN0VKZDZFZWdBc0lHN01BNXVCYSt3L0N0ZUJLZWluK0pqOEwzaEl6TDl3UUdnaWlJbmxpSmk0d2kKRThoTTBrck9rMWJHeWFRd2c1a3h6QUg0dnNGOHdGeGxyckljYTJUTmJEVTdDSzFsWjdKYjRidVQzYzIycys5dwpSVndwTjR5N2cydmxWbkZybVluY3U5d0gvREorSGQvT2Y4di9EZVRpVUdHV3NCWkc1eXp3N0srQmwzLzZzRGdKCnNNOUJkNk9KdUFKUFFKdGdOSGJnOFdnMWNGY1RmZ2pvTlJzbGR6Y3d5NWhxa2dYY2NBTGRDOXk2RlMxRnE1aXgKYUVmM1I4eGU5Q0Z3eWd4b3NoWHRZc3VSbTlzTW8zTS95Z0l1K3VtN0FVYjlhYlFmNXNVK29CTkNxZEx0OHJ6egpjeWRRT0JwSmlTU0hROEdrUUtMZkIydUN5K213MjZ3V3M4bG8wT3MwYXBWU0lRbzh4eklFbzdUS1FGV2pyeTNVCjJNYUdBalUxNlRRZkdBOEY0MjhvYUlTNTdtdXJ1dm1hTmgrOWJ6eFUzWFJsRks2YzFPZkthUHpLYU8rVldPY3IKUVNYcGFiN0tnSy90dHhVQlh5Y2VNNklPMGc5WEJPcDliVjF5dWxaT1B5cW5OWkQyKytFR1g2VnRTb1d2RFRmNgpLdHVxV3Fhc3JteXNTRS9EUjZKQUFtVjZHaFVzVWFTaURiZWhnZU9YZ2dSR0Era1ZsVzJPUUVWbG16MEFhYWhqCmdwWGptOXFHajZpcnJIRDYvZlZRQmtVajYrQVo2V2xUMndCUHRFYmRGR2hhMHhsRkV4cHBhdnpZdWpabWZIMGIKYWFSdDZWUGJySUdLTnV2aUwyMC9aYStuS3RmZVVObEdnbFhqbTFkWHRVVWIxd0J4YWJhUjVzYXZoZHlRVVQ1bwpscXlvcjJ2REszcVFvRGhPQTB3cHV2RkZJOWc0emRlbUNKUUhwcXllMWdqRVJTUHIyaDFSaHl5ZDI5RHd1blo3CjFDNW4wdE9PMkpZVis2SDNSOUp2U2IrRnhzVisyN0o0L0tjSDR1WHZuYVN4YmRucFAwQThaR1F2QVRDbFFHQVEKNE5ubW15Zy9KQURJRnRLZ3VSQ3RubGdJZElKUFBZWnVUZ1Y4QnJZUjRCa20yTVlGQjQxdmF4MTFIWTBwRlhIawpHcWRWdEN2c0RubVZLcStINnh0WDYvckRTTUgxdW9CdjlYZXduRGNHdXI2NXVXUjhUd2tmMUgySGFDVWQ2RjVlCmFjUGpyNmRiNkdvYWhGNVBzUVdtMFBGdGtjY1U4Z0ZiNVEwRmtLZWtvVGkzbVdDRkgxN25iL1BWUXdHb20ybEQKT3BGaWVOMUJqTmZWZCtMdUZaMm93bjBFZEd6bXJuRlFuVVpaYldvRlBCOHk2V2xRa09LSFZFYWFyd3FlWEVWNQp4YmZhdDNwUTAycGZsVzhLTUJNYmxHT29hRjVkbndrVUhGVUhkRUszd1JPajljN2VaSE45Zlg5b0o1TzJBN2ZBCjVhdnJvWVZwUFMxQUxCZGx4dUNpckRSWWJablE4TG9SZFcydEZjNjJhRVU5akFLdzc4bmhkVzBuZ1hQcjYrR3EKN0Y1TUFXT3FXc2R4emdHY3MxT2dQamZlQ2lnM3JkQkUvZXJWdE0xUmRRRi8yOG5WcTUycjZYeUw1enN4NmxzUQo3U25vUlBRU1N2Sk8zRG9jN29VbzRIZktZK0FQK0FHdGVrclRmc0RTMXprS2xQcC9UK0g4WHJ6aHpnTEFObCttCmNPRi9pTUpGUDRmQy9YOFdoWXQ3TWIySndpV0FjekdsOElEL093cVgza1Roc245UDRXZ3Yzb0RrTFlCdFZLWncKK1grSXdnTi9Eb1VyZmhhRkszc3h2WW5DVllCekphVnc5ZjhkaFd0dW92Q2dmMC9od2IxNEE1SkRBTnZCTW9XSAovb2NvWFB0ektEenNaMUg0MWw1TWI2THdjTUQ1VmtyaEVmOTNGQjU1RTRWSC9Yc0szOWFMTnlCNU8yQjdtMHpoCk8vNURGQjc5Y3loYzk3TW9YTitMNlUwVUhnTTQxMU1LMzlsTDRhaXpEZDBvaDF2N2lGMzBIeGZNWTI4aWVjTy8KSi9tNDNvNEExbmNCK3VOa2tqZitoMGcrL3VlUWZNTFBJdm5FWGt4dklua1Q0RHlSa3J6NS95UEpKOTFBY3M2QQp5a2tSMk1oM29IcThFbTBuZTlFNmdBckdqWVpCK1Y1STN3N3hBWG9OZXc4NkRSQUZ5QWJvQjBEdi9RTHU5UUJzCkJqdDZETUR6a0Q3QWZvRU9RSG9IMUorRjY3YnplK1g2N1h3UkdrN3I1ZmdNNm9CMEkxenJoemlGQWx3N0VxQUYKUEM3RkVCY0MxRUFiTG9nSEFDekhaOUJ5cUd1RmVCVzB1WnlXQWRCcld3QktBTjlWVUUveHNrSytGWEF3UUY0RgpZQWJvUi9aM255Zjd3VnFoL2h2dzRNQkhEWmJ0NnhEN3dCYVBsOGpGWUs0eFlOMXpVQXR1VWJBSkZVZ0pLUlZjCnIwRmFsQkMvQ0VKd0M5M3cwWU45YmtRbXNQc3RVR29GMjV0KzdNaUJuR0NGdTVFSHJHNGYySmZ4VHlJSzlLU3UKUjBrb2lFSW9ESlo1QkxCTUJWc2ZvWFR3TkdTQ2xaVU4xbHN1MktKNUtCKzhuQWg4Q0VYZ0ZpMUdKWkFlSURlUQpEelVTOXVFcGVDOUpKTGVSdVdROWVabGNaS2F3Sm5ZQyt6Mlh5RFZ5bC9oNS9BZUNBeXpGNWNKMjRiUTRYTnlwClNGSXNWdlpUbmxDdFZuV3ErNmszYVJvMWIycUhhanNUN2s5NFc5ZWllMTEzV2Qra2Y5QkFET01NSHhocmpLK1kKaU9tUDVoenpXa3QveXpRcnNnNjNuclNWd3ZNSjJNeUlQUWUrRmdZb05qRHVTQlV6T3hFTElPbzZFVG9IUVBPUQpaaTVDR21JQllnWml4VVYwRk81QzZJN1VvOUFTQjNGV2RxN2VydzhEbExQck9xLzlrVHQrWldBblczc1ZISFB3CmhQcnV6N2hrN2hpTUJ2VituSSt1REtXRjBndlNDdElYYVRoclRxVzZKcWN1cHdsTk0wNnlMR1RuYXhicUYrWXMKekZQZnFtbld6TWZNWUExT3owclAwR2hRU0JjS0J2TU5lbjFRcnd1SElycFFlbFltbDZMUkJ4bEdHUXJyMHRLegplRnNLelJkenZJMVA4cUJNcFMycG40ckoxL3F4djFpWjcvUTdDeklpK1NuUkRNY0FjMzZCdldSQUoyNCs1RCthCkMwNjZZWmRydTRicHZxKzkzS1UzRkJWbHhvb3lHN3BRV1ZkWkdlU3RSWmtBMktDM0Z0R2ZvV2lsbUpHcUUwK0sKSnptQUJ0U1FuZFdBRzFCQmZsNi9VQ0JSNE0wbWk5V1FYNEI1T1psTFFubjk4bk56d0hBV2VBR1g0b0pjbnVUaApRQmlxQTRsUVY1QmZRSFluRmQ4eGFGYXFaZUN3VzU1T2xUb2VUaTNmTi81M1pTZDNQTEcvdnQ5aXJIYWFWZnYwCmt6RDM5ZXFSRlF1MmZYbXV1WFFQODFwS3hhaGJ4ZzBPcFErWVhYL3R5cVF5dkhGY3pwQVo4NWN4dnZVVjY0NjkKdU9qaGFhVWpwSlBEYjYxK1dJclpwVmQzMTBkcWZ0aTJhM2JGSkpnNTI1azVlS1E4OXFHb2tUekpJTTVxZGFBSQpZMmU1WC91UDFjVHBFUnRXMlZ6eEZTcXI3Y3JPd2t5QXdTUDk4L3pjOFZnSGdXMExqTlpKNDhoNDdqek1uOUtvCndxUlhHQzNRaHVJWTNnN3p6NFMzUjdWUjFNb08xZG5ObGgvOE0wYmFPb1djRlhFeU96NTFkTDNmMWRONEdiUk4KQkY2dnMxcU1nUXdjRG9WRGVicUNmQ01aOTJSbTlZaWNEWXZXVjBVS0xhcUc0bVBjZWVtZFJ6K1JQcGMrKzl2agowbDh1TFp2eCtPN1J0K0xrUDIzQVFlQXhqQ29BSHl2Z1kwVDVVYldvUjBZejRNTU9UVEJTbEdEYkExQlNpSGFUCitRZC8yYjA5QS81KzE2YzM0R0UwRk9SVHhtSnlQZGpxd1dhZHdEUFZUMlZVVVN5MjNoTEtpb3dyUGlxTncvbnIKUHNUQVQzOTdIRnUrdjZkNTZlVTUwa2RmYjVRK2szRVl4c3docDRHdVduUW9PbWtsdjVrbG85a0Y3Qm1SMGFqVgpCUWFWU3FsV0NlQTBFUXNNQ29WU1ZBQS9pSHlCZ2VOWW5pT1lNTGpBd0xLTUdod3JyRVlGcmhYQ01wZzZXc0RGCkltalpXa0dMQkY0SHZXSTJZNjFtczhxZVVBWkROVXgzdVRaVzh1bjEwU3F6MStxK0FUYkZsRzhwc0NzemJLbmkKVXQxcjRyOU9zRkFGZ3dCc2pNMEZWc0VxaElWd1FiakFtb2RQWFVpK3NITGlBOHNucmJxWS9CRjMvUGREWjFXLwpVdjNxcXhETUd2YTUzTis5MGpuY2lpNUFmOU9qRmhUUUtwdEVKVVZRNktkc1FxSTlZV0p6SEwrUzJIVTYxOExRCloyZFo4K1hKRWc3azVacE52TEMzMHBXQXljd1BHbHZlVmQrZW5pS29oQXR2THVnd3d5TmdYRy9IbjVFaFpETkkKRVY5VWlUSVo3T0FROEdrbkxvZXBLN1BxSmQxWEtKTnlxZEZ2OXQrT3Y1ZVVaRFAxRFdQd29TRVpQd1lCbitNVQpSa241SERmUis1djhGRGs2NzY5VGpyWlFrR3NPSEhqMzNRdmdjS2IzdzRkTWsrZEphdFFxWUN2ZURBNU5RbHdHCmhrR0VVZExOQmNhZWFYc2ZsWldVbFhBck0xS1g2azdqQnB5TEEvaTlMVkxHRmlvRmFUdW5vWjN6M0hxWUdZR0QKSXU3RXVWRTF5d3BxVnRqRUlXVzFRdGR5Mm5iNmZLd0lsWlZkL2kxMEk0OEtDWDFBZi9yVnJhRjFKNW52Vnh2cgpkMTY1bS9sZXhpa0tjdHZEUFlrUzBjN29zSHkyaWgzTlRYZmY3Vm5zV1k1WEVqRkZIR09mYmw5aVgrSjZ5YzZoClJKekF1clIyditDeXcrWVQ1MDFJU0RRcTg0eWN6enZmbjZqMi8wSW90TXhLMUlZVDd2TVdKaVpWQnlnZTczZGQKN3RKOTEzVUp1aFFyb2RJdkx2d2dCcm1vaDRDS3U0R0xvaTdXcmc3cVF5cUROaGtwVEVJeXRyTWFuVElaaTJZSQpZQnRPcDhQVTYzOGZhc2czbE9INGVGUGhLQVFnN2M4eFVHbVlRRVdrQUlNMmVNV3ZUOTdYYitTbXBVZXFRK3hoCnBudytUdjcraTBWVkw2MmFVTmprWUxUWElrZXdZZmFzSVhtanBpL2RzSGJJaW1NdDU2VHZuOTIvdUxwNWFINzIKNkdsN1picGtkMy9NT3JpdHNQS2Vqbm9IcVVlbE4wY21wcytQekUvbk40WHdFREZWYVVzMWFaaC9acHZ5Tk9BbwpERVJOK2p6ZEx6U2FiR2RlRWlma1pXdHNtOElWK2s3WUFreFFGbWJNSXQ2STd6NG1USEtyYzI2Z0N0Q0dMZ3BkClFKVExzYTkwWFRwS0g1aHBSVEpKOGpPejdDR2s0RUx1WUdLSVIwd3lZaGt4QzhqaENuaVRrU05vUzhZc0ZvQmMKbVJCNC9FNmdXUWdDSUZacUtpV1dyb1NtN3JzUGFJWWJXSktYYTdGYWNuUGlxd292NUhsd2JrN3ZHaU1FWU4zdwo5eXdxSUt4TUtJQXRYNzZpVHE0NnZHNy9TenNNUWFNclpHbStaZTZXNW83S0VOY2V2UnViUC9sYmRWclZuRjlJCi8vZ3hqSzF2ckNtYnMyWGg0eTBZUDhVUVgrR2owK2N0TEYvODlPdzNYajJ5ZkdTdTIzdXc5YmVTQkdRRkJvYzkKYmphVDJ3NHBEUm9iVFZRUXBhaUJPWERDd1BNQzRURW5pT0RqRjVSa3ZvcjdsbEVMTE5PSnJTL2hUUnB4djdJVAoxeDNpRXFxMU1nVy91MXdTQTY0cWc2aEVYeVJURFFoWEJKT0dTcUFFRUVGNkJkYjc4M0N1SGlhaG5qd3Y1ZUczClkydkpvMXQrOXp2WUhsZ1ZXeUJ4ZUZ3YnMrN2FYVTlLejFEY01DcnZ2c2k2dUZia1E4ZWlxVFdHaDd5a1NGMWwKSEcyY2JHVDdpMnFOZ05US0JLMTJ2c0ZvTkdnVGZBYWpnSXhXcFRVUEVFdU1PalMvMEdyZGh2NEpMSnZuTytQVwo2SVZDeHl4VTZFdXM5c2RIL0x1dTB6RFlYV1V4R08xTHNsNUFSNXBPQTNtaXY0YmlRdzlqYjRQNWtHenpZZ1VKCk1SNVFCMkdmMThlNVlFNG9iQkJnTDV1TWVDY0VvajArTitobzYwcm9jTk94Ym9DVjg0WnhEbE1weHNBa3ljMWgKelNiaVQwd0t4d3hMbzdjOXZmVndhOE9Lek8wenlkZXhwd2JrcEErZitobzJYSlc2RGtqL3JjTXp0eFo3M2xxeQo2Ym1hcUlKaFhwVG1ob3grNmRYZlNHKys5cFk4aGw4QXNUcFl2NnpyNVVRZFhJckFwQ0FZTkFXSVF3NDNzY2d1CktwcjhDNWZFQlNJTTBQWFZ1UlpZSEFRU0hSQ0FMOTZGRCt1L0VOc2d5MGNDR2pMaUJvQjhKS0J2VjlDekFyQXQKKzNKbEhXaUptYzRqaU1HblM4RXBLaGR3dElEREozb0xGTFJBUVF1T0FYSkhRSjBjRDBva1ZtRWpTRS9HRC9yRwp1dDkzcmZpY21DOXNqQjE3NmkweWhuSUFNL0hLUU53cDFWQ2Rjak04bTRWbkswRi9UMGIzUnd2SGFNYm9wNUZwCm1tbjZ4V1NCWHhpa3FkRVR0K2hOWUwxR3dETXNlcXhFNVFtTGJMWnpha0oyd0pHaU1BZVRMZlpJU2llKzY1Qy8KWlpMYzl4SllTcWthS0UvMG1EelJZejlOY0lQTndZbjJJQjhTYkd3cTVoeGlLa3hlT25QdnV3ODNOR0I1ZG9aRApBYi8raGlUajk5RTlFNUJ6TU1vMGptQnllbG5WM2ZQTDc1ZWV4QzhjSHBiOXlOQ2wwdnhYeVFKWUFhTzNSbXJuCkZFNnNYeUY5RnR2QURBOFVQUEpvamtzcWlvMlpOdkN1cC90N1kxYzU0OVk3RjZ5cHp3eW41amZ1V1hmUGZxRDgKbU80TDNCenVTMFR0bFlQUllpZTNHVy9pR0M5dzNmMTRKYmZLeUkwU21RZmRlcjJaNys5bTFQM05DZy94ZU94TQpOaW5XWmVzZFBrVzIzZTcxN2ZCUGl4TWdyZ1ZEOTRIcFliTEdaUjNsQVdEeC9zaGxEUnBEMnFBenBMSW9jcERHCnBNc0JyVGhCSjdnZ3h5RW1CMk5RV1pRMmRRNUtNRUFnT3ZnY0VIa1FVTUdHNHl3ZkQybkJmU0RtUkd3RnRTK1EKaVBRNkF4VnZvQndMdk44WER1bEJDL1FIV0EvdXB6L2xmNjM5WSttN3YzOTc4WjRCbmxPTzlRZWtEN3ZSaTEvdQpQNHFyazdrdnBRdkgxdTJVM3BGZWt5VHBWM3ZxSC92NnllUGJmb3YzNDhwemY1UjUvM25nazRuQUo5VDJtQnoxCnJ0UnZNcEFjVWVWSkFQYTFpbUsyMGVIUUJMVjJ1K01EZjh1cTZ4b0JaUUZVRml1THlSMFBZWXMrYUE3eEFpZXcKQWlNUWdlT1ZPaEY2YTRGQVlWRGxZTUVFOXA0c3hWTm92NEswSjNUTjB4SGdCcGtGOUNhQndOQ2ZhNzVsM3VCaQpSOExIZjVlZWVvT013cG03TnRadGt4Nk1IZGhyRHMrcVh6T3FHdXR4eHRVdG5QSERVOUs3ZnprdXRjdDlBRDJHCjdZSStVSXQyV0RSSjhMQ3NpdkdBK3FFUVBVcVZxQ1pxTlVIOFZGS3NjR2daTVlqc0dtMG5WaDN5Yjd6ZUlabXAKTDE4QytVVkhsYTdzSlhTRW9YdFUydWg3QUI5Z002OXRZRkt2bldlV1hEMUZ2Tnp4RHFsOHI2UTlBSStHajZ4UApzWHNobzBCRlVSdkZRdEdEQlQ4ZE8xVHlrNVdxVGp3YW5ueXhoNVR5azZuYy94OFBEQnhncmw1N2k3d2J5endqClAraEFySWsrWXdlTVY2YmMxN0tvWDFSNEdFSllUSlNDeUFwQm5uTm9zREtvUW5hMVd2TzB2MlUyUEVRMzdITFAKcktXUnJJa1ZaVUlQcWRnQ2M1VHFVWDU5WU1kWmN1M3MyUmg3Rmd5WUhlU3VLd1BKZ2RnSXVVOW40YUhyNFhrTQpzdExqUTBjQkJZUXlRSkxKNWkvSnpNcUdkZ0puejhLZG9NeUI3UVJqTVFTdTUxQjIxQWhhSVBHd25NZzRCRXlDCm9KanljTEJsRklpVGNUZUlFN0NoS0dwZzZsQ016UDd0WjhqWDEwWkFjLzg0QU8yQkhPT3QwSjRSL1NaYVg0R0gKTUxDb0toZ0x0ak1mWXM2SVhZeEo1VlNQeG5YTSsvZ1Q1bjNWSjJvbHEyUTFsZVJCd280Z213bUpLSk0xaGNwQwpUVFVaVFZxSUVHelNLQWxqQURWVnBUWXd2Q2hiUVZSZDNoYlZLTDJNaW8rcE1ZbHB2QVlvZWRtSTdDWktSTEFoCkFNTkw5c3RGUmZDelhhSkNNRzc4V1lGVHdJaUFzeWtITmVwT3ZMY0Q3QlE2eEh2YkNXRldjclVaaTJQczB0TXIKdVhpY25ZVWE1czdCY3h2bUdQMEtER1RYOThzSFV4ZlVFNHRaSDlpTTNYZ25maFk3anJOU3cydlNHTzRFZC94cQppTDF3WlNBek1mM2NncXNSOXNQMC9FLzdYWHNTQm9CUU9uTXBRQmZxeTJtSm1ncHdJVStvQ2g3RzFiaU9jRUJ2ClFqdGxsZlVRcW9RUU9FR2taSlJLeklzd0tsRDNFc2M2MUlKSXIxSXFrRjJsN3VHWW14aUdMdW54U1FFZExhTFcKVXVyS3BXQVFVUjBNbGlMS1B4aCsyLzlLdmpyKysxakNDZElma0I3RDdyd3lrSDMrNnAyQUgxMkxobmVmNTc0RwpHWnlBcU9kb2RUUnRKVGl6enVCWHlSdmlXU1UvVURUM1QyQ2MvUVdGaTdoY0trTTI0L0RZc2xWMnQrZWpQbUszClYraktZaWNIT1RRaEhGUUV1WkJGYThzQlM5dVFneDBpcEhROHBLeHFjdzQyRWdqc1NtY08wck1ReUhLV0J2UUQKdWdXeVd2UTZnZlFJVklNZkdmSjBpRXBiazhIUHNOdU9yZDkxV3Rvb3ZYRHFoY2RQd0RFUzUxK2x2Ly8xa3ZTSApIN0JaeTMxNTVWWHBuSFQ0UWpmNncwZDRNRTU1SCt1dVBJTVhmUWNXVUlsMFJucm5zblNRR3dmalJHWFRqMEFICkplQTNQcG8zVlQzVnNFaTkyTURXbU9wTVUweUxUYXdnZXZRNm5SSnJFNmpFVW9xRU42aFpoY21VelRvc0NRb1EKVm1iTHZ4QldNV3E3eG1XVkRzZ0NFeHBUUDR0UjFubDVrS29CSkMrMWZsQ1FENUNOcC8vMndXZFN6aG1tZFdINQpQZEk4dlBiQlhkenhUOS9ZM3gzYndCN3A3NVdZdVk5U25ocmV2VVllSnpONDdTNUZwMDlscHBrWE1TdU1tNXhuCm5QeGdWNzF6akt2SlBOKzgwSFhZL29aRExCUnRUdUswMjdIWjRYUTRIQWpiTWJKN0RKQ3lPK3dPcDgxTStDU0UKOVI0eklweUdGckQrc0wrL2hnbjN4NXpDQTJ0ckpDbGJZVStPOUIxa1ZKWUx5MnJjUEFmZWl5dVYxaUl3ejJVegpIYS9VcFpha2xrQjRPaFdFbUt4YmVrTzhUaFZLQ0FyQlJIVlNEdkpwUFRrNHhFTXFvUFRuWUs4T2dxQVl6b0VECkhIRkxnZzQrcUNTb0lTaUV0VGdRWDA0TlZCT0JaWWdYMkh4cTRPZGY1d1VkK0hRdk5uMHg4bGR6cEwybjlzbWMKc09MWStrRGVNbW4wak9RZFRTZnZ2QVhZNHIra3Y0QnlSdGhGTDZUbi8rRUNyb2t6QkxESXVnZmVXT2JRMjVmZAp1M0VLSmkweWQ3d0xpL0VQRW5YVUFzM2gzQjYzVUo3SFlmUjQxQ0JvQnVFYXJoN1hjVk81SnROQ1RyUWNnOE5HCmR1VEVybWg1d084TE5Scm1HT2FiR0lQSGEzS1pHYi9IWW1KRGhxU2dCeWtVVHNHaklpR1hVL1FGemQ2Z2hjbE8KbU9wMFJNUlFNS3dFT24vZzMzaXpFbmNaZkEzdnd6SmVVaUxyOE1CQzFIOTNYWWx2Z0ptZlNoMGZtSnBZTWk4eAovaHlxby9HQ0Izc3hxR3RXTStnbW1SaDhVcFRmbU9xMXo4NGRNRWx5bkNHN2Q4OThaK2FFTzBaekFxTXlaRnhXCnFsbTEwRlMwV0NvK3c3aG1yMyt5eUFNdWlCM1o0MkxMZCtjRzVyYStkbHVreXVRM2x0engzYVBaenRocW9FbGoKOTNudzhINHBlNHFsNkxoSVFqZ1FDdVZyOC96Vm9RbWh4ZG9GU1lycG9rMXJEWko2N1JUdDNrUkdxZTJmbUpTbwpaRmlYN1VGVFptYXFxNytKWWZ1bktyS0lVaXZxa3hLOXlWbFplbHZRT2tnTUpqdHl2RUg5SUJUTXRHZm5QTzJmCjFxTUJnRWJYbzlmQ1pES0EvVVhoQmdXUHNtTkdMTGRoaml4NWFwTXo5RjRra2hBSnBRZjVvQ1BFcElGL096MUQKanJnVTBIdmRSbThxY3BwdHFkaHV3K2xzS2xLRVZhazRxTUlaa0JZaUVIZ01McWkwUUNCTEpaMU8xZ0NwWElyYgp1WlJGcWFVckd6L1VyZzJIWkZMbjlVdWlsaytBVWowUmZLbFdpendXWmhOTCtiZ0FZNC9RYitLVjJXUGJod3g5CjVzeXJJOWFDRWZRblBQQllRdmFkRjlxMmppays5L2JHRVd1bEovOHEvZGUyYlF5cHhSZVdEbHZ2SzMxNllXNU8KTUQwdGIremgxNlhmZjlkU2RzL2pFMmJrK0xJeUU0c25uNzc4M3RvMS84V3FxTzdoQjFrRzZ6d1lJLzJpRHN4NwprRUJZa1JwSjZDcGhnaHg3bGJlTGEyRnBwejQzYXNkZXZtNG4wZlVkZUFsVUtkQTI4dGl6a3Y1TlNjOGRQM0RsCkg1d1dCQ1J0Ry9ZeHVIN1F0Z3E5RXAyZGpQTUpMTmpNYUhZeU01bHRJUXZGaC9DRHJDcXNLaUFGWEtFNGhlTmcKQ2NOTUVQeUJuQ2lBcHpCbzREa2VZbEVSTkNoVlN0bGJHSVF6MkNyQ2lTcHdFd284UFlpbFVNS0pPQ1hQZ2tRUwpWYUlDQ3dxSGhzRjJ0YVlUcXcvNTExR2x4QTRlTDl0cDNURDc5eERGWlN4ZDQwdEthQnF2ckFVaHBEdEpYVmx5CnBMc2hpcStKL29BQzU4cS9BTWFPdnhHdFpQd25Yb0RuZFVsR3d2MGd6U04vSjIvRjNpWTVzWDZ4QkRJV2VKMzIKdXhyNlRYZGxIb21tUE1SaVV6SWJORENFUVVFREdBd2NuUEFWTU1PQ1J3MTZ4eWdVTEZJQnhSa1dUcEpFRlR3aApIQi9FOUx3d2VnblpsYlFQOWpqNWkyd3dvUWRrNmtCcmtZY0I1ck9OYXJkbFZycVFaNEEvRGpwRGZaNmd2QndHClp5b2pJcEJmSzhGRkp3ZDA2aHRwVDJCNTF4dFR2Z2JWWk9lZlkrZlBUQUlOc1pTY3VyWWgxa2FHTS9UTkFBYU4KQkQ4RFBlR1hJTy9nZkJvdFRNbkNTaDNvWmE1d2JvMXVxbUthVGlnU0RXb0Y0OHdSa2hSdW5kcGRuRW95SXNXSAppMGx4VGtyUW9CTTQwUlZPdExvNjhlcG93T3IyQ21GM2hvcTQ4MVFsUWttSnl5UkVVblluT1VxZEVkZmdoSENoCmZVRHBLM2d6TU9NUnZBbkYxZWllNlhzcGRycFhSUURYaEVGMjhGSkJsdEdWMFVVRkc4ZzNlUUluNXhlWUUySEYKQ3VMOEJEK3llWngrWlBHWndHMmRpQXFJSHpuY1ZqOHdLd1R5aW5HVDR5a0pmQkVGK1FPd0ZzdnVPZk5OdnJ0Uwo4RUdCaU5TYnFNT2l3QXhyU3lLNDdHbEVOemtLakZnN2Q5aGQ5WnY4VTNKbVRzZ2VoVHRLemVvSEZqOWM3RmZ1CjVuNTQ5bmpMZkd0UTdkR25wSVVhVWl5S2dyZVhiRHgrZFBQcWQ4YWtEZHI1bU5uRmF6V3V6TWw0aHBobVN4ODcKYW1qS3FOZTMxZFJzaVcxMkpUTE1DalZmSG9qV1RIdnBvWTNQR2ZFbHVxNjBkSC9HQnJsVFNBOTI3K3hveGs1aApsK3RERjVNb0puZ0lCN3Q1Yms3UUt6MXVsY29VRmgwK1I0WXVBMGVRSGt6ZGxmN2pEZGVWODB1WFpLRVkzK2dwCjA0Ti9VNmFleldEaGxSYmVGTUlHSlFSbXdSckNSb1VuQk1RQ1M1WktMVkRrS1NrTWVoT1JLV0FPSlBYNDZhakEKeW0wNVVQeGM0eHYvL1A3QzR0dHlpbmFTU1k4OTl2QzlSMExWcDdoVHNiL1dqcEM2cE11UzFGWWNxRjIxOU9zVAplejU3K2QzTjR3N0theVdjYW1YT3NjUGtIY2hkMGN4ZGRyekZ0bHZjYTJNR2kvcHRKb1l4OFc2SG9IR0RSU0E0Cm5WWmQySURCUmFsM3VKVmhxOTBGWi8yRlEvNjVTM3M0Qm5wV1V0dFZWUFN2TFBsKzRQQUpxczNLRU5JYWRkQkwKYXNQYklRYzJ2RisyNFZVV1RRaHNlQWdVTmo1RWJYai92N0RocWZodVFKYTRCUi9mN0FLdXlLWHNRRURQekJYSQpCMTlZRCtqbUx0cy9PT3VoOWJNZnNCL3cvTzNZZTFldzRYMFhPNnp0dzRrUDdKNzU5STZMcXhhY2Z3M25mZ1ZICmN2dHpNSzZGM1JlWUxoaFhGWEtqQmRHY0FtMjFkclIyRjd2SHlRVkZFMGx3NjVEb2RndEdKWEZiVlZ5R01VTVgKMFJzY1hsWFlZZmQ0Vi9ybmx0L1kvZGdsc0R6cEp0NVBZK3V3dVJSS2hMRk5CWDF6UVlEc0pJU1VUakVFSFpSSApGM3BsK01rZlp3WVYya3F0Z0R6YUxaVFh6NUQ3L2ZvZFMzZnNYUHpRSHJ4NlZOYUFGNTRwMnovcmtIVGwyOC93ClhWOS9lUFkzcjU1N2t4VDA4d3doN2l1bEd5Zlc0ZlFyZjhHalFZYlVkRjlnSFNCRFhIQ2lQSWpWMFVXYnhTY2MKdTd3TXB5VUpuTW1zTlNTWVRWRjExQ1JHSEhpSTZtWG1ESDZkT2VQOFNQeFk4WUgzbzhEWDFxOERxalA2TXdZeQpWdVQ4U1FsYkxlNmtJbDRRTEg2M1MxQzZMYXFnc05tMXkzVVk1Z0FidENRRVhaeGRxUmIwNE50M2h6bEhPQ2xECkNOdnRvZkQ3L3AxeDVnZHJUMmI5OTJPeVh4OEVKZ2lXaGw2RkFOWTIyYmN0VDRjcUZHQTVCbzVnWTlpbzhvSm4KeHFBejZrdzZsbGNIRTUxSklmQyt1a1BZNDFaWWhSQlNtYlVock5FR0hING80aUFRYmNCWHNETUFoS1pyUHppQgplaFNBbE5TVSsvQ2NCalNuZ2JJUWRZNzU0eDV1eWtDZ3BNTG1LRGlGVUs2c2ZpWEN6aW5wK0tBdzM2Qzc5aTMzCjZPYUhiOHN5SFJSdXpSNjU2SmFSYjRCbWF2c2o5cXFTQjcrd1pEZUhBMnoxOU50SHpCajh6TE92TmVSWEZ6K1cKTWR5bEF4dVV4d1NYUzZINVZmY2ZXbzB2eHRka0Z3Z1NLL2NlN1AzWFJsTUZONjkwTXpqQlZHVFI4QWFsSFJZaApyVVlmc1JvRVE0TFdxeVhhYXlhN3pYN05QM2xabk1WaURVV25xVjJpdTFFSktKUDN0d3pVZXd2cVl3YXdERyttCjNsUDQ1dVhtdlJRbzY5QW5XVjEyMVVoZmUwZjd4bzFjZWIreGhEeEg4TzB2cnJ2V3hHeGZ0MXRlYndaSXhjelgKd0N0ZStUekI0V2h0dm1tUU9FaFJKOVlySGxMdmNlNTI3d252VEQzaVZFVkZ4cElZMFo1V0pzS1N3dklSdDExcApjQ3NUTW9TTURNN0ZaRmd5MGlPY0kwdXREV3RLUTJHWFBUUHJoZ2x5dWF1SWNrRHMwbmV3YnZUNCttQ215TU1lCkY0TnBnV1NIUjZWUEN1cENBVThvaEpJZEVPaFZXajlLMEtvMVFYZGlDSWVkRVpBVGFqQXNleGFTSHQxT1Z1M28Kek1uTHBSYUhQekVVanU5bUZPVExxMFVTSFZsMGZiZGMzdGZBWk1tNDNMeWRKYk9sc3k5OG96MnNDUTk0NEoxbwppTW5mc3ZSRjZTb1dqdUtLNTM1eG9pcTRZY21wVzlPa2Q5bnkwc0RBbGRkeTNtcTVzTzM1bW5ESitqcytIVG44CkIzQXdhSENHdE9OaysxMWJYenArWU9KeWtnNzB4UEQyQlpKbGlnV05pcWJCckJGaG4xTU1zMkhqZkdHK0tCbzEKeEFpYmpYbzNMNWpWU2sxRTZiQmhjd1JaN0ZZYnZBSjJ5RDhoTGxPb2p0ZXpYTURHR0VnVU9CSUFoSklYQTlsZApUeGRHOEhqRTlWWjlZSGxITkhmMC9YOGVsWDdFazcxeTlzc2RJUHd2anZBWFBWdi95OWdJOG14TFFkM1dEMkx3CkFpSmR5d0EvWEF3NkVqMkxrUjkxQ1YreWdEVFB5UDU1NE51SXdGQVAvZDZmTURrZEt6bmR5M2J5RGoxMVVsRWYKL2ZMRDhHRlRybjdBSGFlK2Y0eGFvZS9VUGxlaFhkR21lb0w3aTlnTys4bThsUi9OVGVZVzhRdUZsZHdSNWl4egpBWFpIUWNVVUJRVkRscFBIZ1NrWlVnVDcxQ3dITzlIOFRBTlFUUlRndUQvSEswU091bmxCVjJaNHBjQXJlWWNHCmRvVWlTQVdLWnJ0L3doRnNpV3N0bEdBbG9LeDlaWk50c0pJeVdjVUVOVlBXTXBmcWZpMXZUVGR3UzNVbmRXS0oKU0JWb0tnN21RbGVvaWhuQWdqN1ErZ0orK3l0cEVqNzRsZFMrK1FYdStMVjkrSXcwS3phQnVGWkxkOHY5V3dXZApwSHNRRElwRVlSUjc5bmhKQkhabVdlNEdrdjIwcVNINzRRS3JPanJpMjdOeC91Q0RiRFdjNWxrUkxZWWRlaTJmCllCV3RXbXRDV0F5RENLMngzNkdhckZJSGdrcUhPMkJYRXRZYTlMdXRiZzB2d0w2T0s4Z1lsY2tnTFBRUmVEc04KdHpzaTlLVzhLS3d4R1VHWUhQWndjaWZXM01oRWwzU1h1eTVmMzNRRzNSdWNnMTJ5TzRBcWNOYzVDczZuZ0FpQgpDWFJkNHdMR2t1MmhtemlzUGRxdmZrN3JzTFNra21lYVB4cVdjbXg2N2JRbkRqc2lzeWZ0Nm1BenQ5eWFOS0FzCnFlcU9VZHR2V3hjcklGOVBINzV1Wit3eGNteG16cEJmdmtNNVQrWTdwZ3ZrREQzek5DNmFmWmcvd3hPV04vRmgKVXdzL1QrQk1hbUt5NlVDVFFyeE5wWFFJNFBwUVJ4UU9GODZ3UmV6STdnUjE5cWJwRVY5UzR0SUUrdFgxMHhTaApxcmI1aHE3UU9RSXlYb3RoeHVEbCs0YnVuWEpwZU5waGQ5YXlhR1J3WWJxekErOEMvTWVOZkdyME0zU3VUQ2hwCjBsaks4K1pNamIwRHlNSklGOE5lcngvMEpEWDQ5TzNvMFdqdUZuR1Q3Z25MOCt4dWNhZHVqNlZUZkVQOGtQMVMKKzJlVHVyL0l1MjJDMm0xUTJRVzczVXpDQ1E2bkltd0dkMDBuVm9DMjFMTWF4bzNqWGprb0wzdHBjQ3d0cERJcQpZT1hTa3hBV3JKRGlOSkJTbXRRaGhIVVFpQlpRamhndEJQTGFSZ1BxZFVzeXlBNEZhcjFhY2cyd2lzRXVIb29yClJIOVlrVFgwNlBPYk5qMExMNlZkazM3NFZMcUdEWC9pNStHRW5adkdQWDZ0ZmQ4bDVvTDBEYWlITWVsRm5Ib04KbFBBbzFZbGFwTnZaSUhSZEM3dis4NkpwZThSZFZwSXMrbHg2TGU4MkN3bTgxdTFTSldwSjJPWklVb0ttNjQ4awpKdGdEU2Y5UzA1WFZJYnFQTC9mUlpYRWl6aEZpUThnSkhlTXNFR0M3Tm9RWXE5d251VnRVMzZYYWJYek1aUDBXCjU4YjVFMTRFb3VzMG1BRDZBSGw5VjdEcTZMSEtJSVJTeG9IODZKMzN2aXdkbnJkMTBjaXM0bzVGdjN1dmRlekIKWTAxYmw0emV5UnhjTnlpNVJQb3o5UEdaVFhmbGVRYkZQcVc4V0NMZERyeFlEWDMwb2NYUjNFSmJqYTNPdGh2dgo0bmE3K0dUUllHVlVicDlnNUJtM1EyWFJDcUQ0V1NKbWt3Tk9MN2p0L3NRYjFqVlo3NVVWdjU2dTl2VFU2VlZyCjRDM1FFSEZDLzlSZUNKQ0xBZFhFbytyUi9PTCtDQVBkaTQyN0kramEzYk9HQmZTeTlrYzNxWDRNVjdhL1VoMU8KSGRRNWZ4ZCs1TTZjakgwdnBUKzFZSi8wajloWnZHemNycmJ4bTljMFBQV2I5MG5wd0tTcWpWZkFnMUp6TzFiRApHMmNZRDc0dXI4aDY2S2NlM1JvTmhabVFwb0NwWmxtdHFDTmFoVjZoRG90MHV1bVZvc09JcVc2TDdBWmpKNjRFCkFSSlhPNmlmSGtRcWFHcTFaYWRqWU1ISFBZanhkVWllWXIxNmh6NndhcC81dWVtY3phMXo2aDVhRHlMaFNQNDIKd3B4Z3lJRzVzUzJVNXVYZEh6SXZzMFBvbVVXY0VYMmtVTEdGMjJSNHdyVEZ2Q1dGVDA0S2h2UDlWZjdxcE9ydwpIVW1qdzVPU0pvY1dxUmRwRm1sYkF2T1M1Z1huaFhaNmRxY1pHVkQ1dUhRMnc0Z2NacWZWWlRPbm16S1NFMVJUCndTdVhIeVRCUkkyU1RUWGFYbmU1alFMcnp0aWFxc29VRkZvZEVWQ21QOVBodFZsc1lXdHBja2dJSnp1eXRkNncKcmhTRk0reFoyZTI5ZWlxSXlyaWVVcVNERk8xdVVTYUVQZDRyY0tUS29qUHV0aHFLMDBuSURPNHF2OWJyUndwNAo3eGlEeDhvUCt3aVFjaHVnekdteStiRXZJZEdQL0lsYWpSaFcrbkVvcUZDQ0I4c1A3OEpENE5HNy9OUnJGYmVNCjQ3djA4bzZsUEJXdVQzQzZOeUQ3clc1MFc4bnlXdmlmZml1WUlLRXcvbFlNVnV4dTJqSWdmTThqcTI2Wjk4bVIKZjB3ZlNQWnlvZEluSmsydFRCNjI0RlQ1MUk4LysvYU1nQS9qNFdPeVJvKytzeklKTlB6RWxFSDNiWGxsM1pncApBM0txaDBXclV1eEdkMlphNWVPUG5QdjRhZkpQV0xlczNkOFNCVGNHcE9ESWx6UVp5cE5hT0Z0VUZnMnlsaUlyCncydVZlZ2QxcEdBK2dzeGFjd0xqQlovTE5RdnNkSUlPMjJNbDl0RmhNK2xpRkN2cDBzVXV5WXNrMVZ5cFBYdmQKMWcvbFVUVjI5OHY3OW9YTTJScVB5VHN3dkd6TVk0OXhZNlR6RzJLVmhVWndFSzlUaVBkTkpxOXRBRjRucUxYNwpDK1l6a0Z2MGJPMjRhUDlPMHhzbW9qQ0tKcnZSYmtybUZ6QWZnbEtCT0swUzhSb2xCekxhSnRoc1lIcG1LQ05xCmxjT0JJeFRaOTY1clBmTFdOR1YvR1A2NHZsb0dEdDM0Z2dsZTNEaWlNSE9wc1ZZZzJ3OXdsbEFmeElXT3JBZGUKcVFoMjdDV0JmcE0zZkRrcW5XNXp4b3BHOW12Y1BlWkpvcjM2N2k4SHBOejJ4TWhWNUNNSDFaZkFxY2J0WURQaApUeEY4MFdYVjdGNEZkQWxYQ1lOVUs1blY0Z3JsbStRMDg3cHdWbnhkZVZhbG1pUk1FNXVWVTFVdHdpS3hSYmxJCnRVSllyVkxTYTBrMXN3QXQ1SmpSeVpaa3NDclpZbHpNUG9JZllYa0ZpeGtWQVNWS0RhZVZSYVdLRVpSYUdDVFkKVWQ0bU11eHBKVkdjVmlHOFRXM1hVRE1EbEtmTHR0cFlVVkh2enk1cmZhQlFnZUlBZmk1clVjT1FFWXVpYWk1aQpnQjZqaUVHdFZuR3dkUUEvOEhwMUtPQW9JUngyV1JNMVVrOGIrQWc1ZWlFdktFUTRma2pMdGZUQW9Vb04zWlp2CmxmMS9LM1ZMVDl2QUF4Zy9OU2ducU5Pc3Q0U3FhWFBtekFGTnpVbHluZlN3bXdwMHRRL2ZmdmZOOXo3cGtNNGUKdS9DN1k5SnZZQ081Z3hsNjdRaFRmZlZkWnNDMVY0R2c4QkJ3c2pLZlExSUZaNmtQS3NXeU5qNzNJT0xMMnBoYwozS2JPYk5OOEFPOWlLL1dHZzBRc0txTDdyazVzQlQyUXFvS2VQMy8vejAra3pYalJWOUwza25RSkwySXpwWlY0CkVSZTdHdnNFcjVmdUprSEtiMlpwa0d3M1VhM2d6ZWpkcTgwUDJYYlpHS3JyRmhwcURIV0d5Y0lDWm9HdzFyUUYKVHJodk1XKzJiTGJ1UnJzdHVobzB4Rnh0UFd0bUs3alhPYktTMjRsMjBuWEh5aVVsY3phejFRSzZ1Rm10U25DTApXcXBFV0p3d1lCekNCNnhtMndIMUl4YlFKZDZQRzRYVXQzckpGaCtybm9HS3N5b01ZUTZjRTZSdVZpcXZZV2lpCkJqTWNPN2ZNTkZpdE5nN2ptY0IxTm5DNlV0TFRTSVFZcUp5ZE5VYyttSm5MTXdRT1cxRkJJaDhEeXkrQUU0SkEKZVlieG53azlNS0Y4ZSt2MlVNU1RtYUxMeWRSeHBWcHAzbHV3Z2NGbVRwWWVrNzU1VVpyVXdZdlBhWGkvVFh3OAppUjEyYlF0elA2VVZuT3RpT21CdTB2M1ZHZEh5QXI0R2pVWjFlRFEvR1UzQmsva0ZuQUp6UEI4QnhERGRVd1VICkFDWkZvUEhER2RRaVlCK2x3SlVLRGpVem1HNnN0dmNxVXJJS0tHLzNnM09XSGpTSTc3Y1VaVUt2NUgxVjNGQ0EKL1hsK000YU5jTnlQM0J2cllFcGpxOGpxYTYzNG5YVU0yckVoQnJOdkVNTGQ1K0U4Ynl2M0lYREszR2pwRm42TApjUSsveDdUTHp3bEdxekZzaEIxdjd5WVQ3eldvbzVwYWRhM1A2MlVzNldZbW5RVkxMa2lsbnVWRlIrQXgwZkNxCjJwNFU3TVRNSWYrblBjZThaYi85VHdlY1lqbzQzMlhQZEhSMTJSeFVBWTk3dVRrNHdnM1crd0FNV2s4NEQzUngKU0lHL0UrYVlHMTgveTROWGJtOW8vM05pYWR2QkFZblAvcmlqeUJzYytPdVRGVUZ1NndPcStZWVhYbjk3WnRrOQp4cm5tdXdmTWZmYVZpK2E1MnRhcUpiTTNEWC9Nb044ODZoRTZGMUtnZitlaGYwbXdYenhzazNLVGFwTjlsM0tuCmFxZDlkNkpRbEFUT0UzRG9jNzRrUzRKV3d4bHNQRkVuc0FiUjc3RmJXS01yYXF3MTFQcVNrbHhpdXNLVjdqUXEKa09GVnJlMHgxdmVpQzg0bmhlVCtsanpYNCtXTWIxUlFoZUhHdmxKYlRMYkhhQUMvZUw5aFQ3V256NnpWQWwwRgpBNlNuMDNBQXNaVFNBNDYxNERVRGc5N0NaekFaVzVKWWVyQ3RMUEhQQjZldkMxYjhpbVE4T256ejdPVVZpN1Z6CnpXdnFPNTZkWFRySE9OY3dQenI5N1RkM0crZHJIMW16K2RHUm0vV1U5K1JQZHpQODc4Qy8rcFJDSVNQelpmd04KamdSNGI0TytxeEYvVTRPdUpXN3FRK3Q5OTRLK2VmRS8zN21nNzFwVW9FcFVKZjhQd2lENDd3LzZid2ZENEY5bgo2UDh4aklUL1dMZ04vdm5nRHNyMGFBejhiOEZZMkMwZmh4cGxoT2dxZ09VVVQ5OFpHVlZUUHVUVzh0U2E1aGt0CnpmT21UaHdQTmZIYW5nUldRd0g0a25BYVFBbkFVSUN4QURNQWxnQ3NCZGdPc0IvZ0ZZQzNBQzRDZkFOd0RRaWkKQm5BQnBBR1VBQXdGR0Fzd0EyQUp3RnFBN1FEN0FWNEJlQXZnSXNBM0FOZUFXR29BRjBBYVFBbkFVSUN4QURNQQpsZ0NzQmRnT3NCL2dGWUMzQUM0Q2ZBTndEZXg0TllBTElBMmdCR0Fvd0ZpQUdRQkxBTllDYkFmWUQvQUt3RnZkClBSOUtvOTQwUnI0K2VkQ3hiNm9QOThrbjk4bkRmeEhkZEQzc0hkMlVUK3VUcDk2ZEc1K2YwU2NQaTg1TjlkbDkKOGpsOThybDk4aUFqYjdvL3IwKytmNS84TFgzeTVYM3ljQmo4cHZZcSt1UXIrK1NyK3VScit1VEJHTDZwdmFGOQo4clY5OHNQNjVHL3RreC9lSjA5UFNOMUkzNUY5OHFQNjVHL3JrNi9yazYvdms2Y3o2Y2IySi9USlQreVRiK3FUCmwrWEhEZnczcVU4OS9FdldUZTFQNlpPZjJpYy92VTkrUnA4ODNRMjhFVi9xZ2JveFA2dFBmbmFmL0p3KytibDkKOHZmMHljL3JrNS9mSjcrZ1QzNWhuL3lpUHZuRmZmTDM5c2t2cGZuL0IzanVSbmdLWlc1a2MzUnlaV0Z0Q21WdQpaRzlpYWdvek9DQXdJRzlpYWdveE16TXlOZ3BsYm1Sdlltb0tNekFnTUNCdlltb0tQRHdnTDFSNWNHVWdMMFp2CmJuUWdMMU4xWW5SNWNHVWdMMVJ5ZFdWVWVYQmxJQzlDWVhObFJtOXVkQ0F2V1V4WFYwTk5LMGhsYkhabGRHbGoKWVNBdlJtOXVkRVJsYzJOeWFYQjBiM0lLTXprZ01DQlNJQzlVYjFWdWFXTnZaR1VnTkRBZ01DQlNJQzlHYVhKegpkRU5vWVhJZ016TWdMMHhoYzNSRGFHRnlJRE16SUM5WGFXUjBhSE1nV3lBM05EUWdYU0ErUGdwbGJtUnZZbW9LCk5EQWdNQ0J2WW1vS1BEd2dMMHhsYm1kMGFDQTBNU0F3SUZJZ0wwWnBiSFJsY2lBdlJteGhkR1ZFWldOdlpHVWcKUGo0S2MzUnlaV0Z0Q25nQlhaREJic01nRUVUdmZNVWUwME9FblROQ3FsSkY4cUZKVlRjZmdHRnRJZFVMV3VPRAovNzVBblZUcVlRL016SU5oNWJsNzY4Z25rQjhjYkk4SlJrK09jUWtyVzRRQkowK2lQWUh6TnUybnF0blpSQ0V6CjNHOUx3cm1qTVlCU0FrQitabVJKdk1IaDFZVUJYNHAyWTRmc2FZTEQvZHhYcFY5ai9NWVpLVUVqdEFhSFk3N3UKM2NTcm1SRmtSWStkeTc1UDJ6RlRmNG12TFNMa1JwbG9meXZaNEhDSnhpSWJtbENvcHRIcWN0RUN5ZjJ6ZG1BWQo5K1NwMWFwT1kyek5QNXlDbGk4K0s5bVZPYmVwZTZoRlN3RlArRnhWRExFOFdPY0hqQmx3ZGdwbGJtUnpkSEpsCllXMEtaVzVrYjJKcUNqUXhJREFnYjJKcUNqSXlNZ3BsYm1Sdlltb0tNemtnTUNCdlltb0tQRHdnTDFSNWNHVWcKTDBadmJuUkVaWE5qY21sd2RHOXlJQzlHYjI1MFRtRnRaU0F2V1V4WFYwTk5LMGhsYkhabGRHbGpZU0F2Um14aApaM01nTkNBdlJtOXVkRUpDYjNnZ1d5MDVOVEVnTFRRNE1TQXhORFExSURFeE1qSmRDaTlKZEdGc2FXTkJibWRzClpTQXdJQzlCYzJObGJuUWdOemN3SUM5RVpYTmpaVzUwSUMweU16QWdMME5oY0VobGFXZG9kQ0EzTVRjZ0wxTjAKWlcxV0lEazRJQzlZU0dWcFoyaDBDalV5TXlBdlUzUmxiVWdnT0RVZ0wwRjJaMWRwWkhSb0lEUTBNU0F2VFdGNApWMmxrZEdnZ01UVXdNQ0F2Um05dWRFWnBiR1V5SURReUlEQWdVaUErUGdwbGJtUnZZbW9LTkRJZ01DQnZZbW9LClBEd2dMMHhsYm1kMGFDQTBNeUF3SUZJZ0wweGxibWQwYURFZ05UazRPQ0F2Um1sc2RHVnlJQzlHYkdGMFpVUmwKWTI5a1pTQStQZ3B6ZEhKbFlXMEtlQUhGV0h0d0ZFVWEvM29ldXhzU05JRkFOZ25MekRwc1hwc1lRalE4aFNYcwpoamNHQXJpTEJIYVRiRWdpa1JTR25HakJwVlE4V1RDbmNuQUtub0xlY1FJaVE2QndFZzZNbHA1YXB4N3ErVHlyCmZLS1dKZWM5NU1wbjVuNDltNnlFVWlwL1VONTBmZk05Kyt1dmY5M1RzenV0YTlkRmFTaTFrMGlWeXlJdDlXUmQKR1JQQUNtdWJJeTF4UGYxejhLemF0bFkxcnN2UEVZbGI2MXRXTmNmMXBNVkV5WGV0V3IyK3IvK0lWQ0wyWmtNMApVaGYzMDNmZ1pRMHd4SFYyQmZpWWh1YldHK042K2tmZ2p0VnJhdnY4SXh6UWJjMlJHL3ZHcDNlZ3E5ZEhtcVB4CitJeDA4REV0YTI1b2plc2pQd1V2YkZrYjdZdG5RU0xwZW1Ld0NyU0drdWc2c2tOS1JWdEZaUDgwK1M2UzRPVisKWEtzZU1WOVllZW1VczVUR2h5VmFPZi9YRm4rejY2RmRYMFcveTAyKzIvRTFERW45OFp6YjhudnppVklZL0dlUwo3MDU0ckg2NENRWlZlMWszeWF5TFZuclpFK3c0VGFVcktKOWNOQXp1cVBjSjlpY3FQODl5Z2lZTnNOQVQ3SEdhClQxZlJlTXBMZERNb1RGZGJsdXkrUkYwMEV6SG5wdTQrTHpWMXM1T1ljSjNYWU1mVXdJWkdwOStnS3E5QnMwSFQKUUZlQ3ZON3BUbXBuZStrdTBHNlFTSTFzQzYwSGJRYmRCNUlTMGo1b1hXeExwK1R3ZGJQMWxNWG0rSklsWlhGNgpwdUlja3F5OFlqRGIwUWVVdDV3ZkhtZVoyRnp2czh6T29aUTBmUWpielI2a09sTFlIOGpEYnFKWmxNZDJIc2xmCnJZVGgya2N0b0hhUWFOMFoyOWM1ZXB4eWtoV1NSMkxvazBPakpYWk0rYVNrU0RsZFlnaXNVM2txMTVEQW5od04KelhlcDB1TjZRSG5DdFVvNUNUb1FkKzNQUjhReFpaOXJ0Ykp0dE1GMmRpcjN1QXlHUG5mSDJUb1h1aDVUbXZOMwpLSFVsbG4vZURrTTQwS2xNaEgrcEwxa3BtK0JXcm5SOXBCVG5HZzRHdmNnMVR5a29lVkVaZzQ0SVU1SFU0MHRUClJybTJLWlBnR3UwSzVFNENIV2Y3MlM0cVlMczZQWE9VYm9pWTdwSForUk4yR096bUk3UHlTandHdThsWE5pdHYKUi82c1hFLytQTVdUWDVHYkMzbnBjL2JiN05mYXA5dkgyYjMyUEh1TzNXM1B0cWM3aGpsU0haYzRVaHhESEE2SAozV0NQZGs1VGJNZlpBWm9HV0E0Y2NkZ2Nzc0VlZzFFNnpnNWF4b09QT3lTSDRDQkh1bUcrZHhUUElxVWI3TUJSCi9sUVNoR00yUzdJWjdPQ1J1T21nVDVHNEpGbU9WSUhMdU9GT0FuTUlOSWQwZHFkaG8wMGoyNlk1cHcyYm1qYXgKd3Y5VHQ3RGw2Yjk3Zi9weU1wZStZMjVWVU4vdkN1bmp1R0M2UXYzaHpuN2hKM25yT3JpaTVWN3YzRVhyajdTMQpOTlVIb2xvZ3JBV2lvTEMrcGEzQnFiZlhxT3JocGhidVVIVXhKMXhUMjhCNUpLcTNhRkcvM3FUNTFjTnRWci96CjNQWGMzYWI1RDFOOVlISHdjTDB2NnU5czg3VUZ0SWcvZEtTbWZHMzFnTEUySjhaYVcvNGpZNVh6Wkd2NVdEVlcKdi9QR3F1YnVHajVXTlIrcm1vOVY0NnV4eHVLVER6UldsZC9RaXQycEJocm5xbnBlbFQ1NzRiS2dya1pDZm9QdApoZEcvamtqdW9WVDVCT1hKN1pRbEZaTkNaTDRGZXB2ejNpWG14L0t6bE5yYmJQNUxuSXhWN2VJazlFNmJRajEwCkorMmlRMlNqUnlEbjBRcTZsNTVuVFhpNGw5TlJlcDJOcHN2eGJwRElvSG4wQWpQTmw2bWVmby80Vm5xS3R0TmgKU2tHZlpob0Jid2Z6bURkQjkwR3VvZHZNaDJnTVRhRGI2UVJOUk5ZT09tUHVNNC9BdTRpVzBINDZnUDUvWVpwdwpXQnB1UG1aK1JBNWFpSnkzd2ZPeU9jODhoTk91RUdkWUpheTMwVW5tRWQ4Mkc4aEprMUhkL2ZRZzdhRW42WE4yCkN6dHFOcGh0NWluemZleFZKNDJpS3JRTjdDaDdYendrM1c3ZWIzNW05Z0tKUENyQXFHSGFSZzhqL3lHMEhoejkKQVhZZGEyWGIySGJCSjl3aUhKVTJ5Um05M3dPSGZKeW1NM0UwcmFFN2dFQVhQVTMvcHEvWkY0SlRUQlZieFdmTQpLODMvVURMTnhTejVUS0xVaHZZcnRBN002VGl6c2JGc0JxdGtHOWh2MkhiMnFsQWdMQkdDd2krRUc0V1B4UVhpCmNuRzkrS3AwZzlRcGI1WHZ0U1gzbmpXUG04K2FyMUVHWGd2WDBscmFpTms5UmFmb1MvcUdpY2cxaW5uWVpGYk8KVnFDMXMxMUNGOXZEdW9SSzFzTk9DZnZadSt4RDlnWDdWcENGRkdHRTRCVmFoVzNDQWVFcDRTV3hVZHd1M2llKwpLNTZWcHNxQ3ZFYytiZlBZLzk1YjA3dTU5eVZ6c3ZtKytSWE9XQWU1c1RMbHRJQldVZ1N6YmNHcjU1ZVl4VUcwClExaTFwK2taZXQ1cUg3SlJkSWErQWdyRWhyRXNObzdOUjF2QXJtYjFySkU5d0xyUlRscTEvRmZBUWdoSlFwcVEKSVl3U3FvUWFvVmxvRjE0VDJzVnNzVUNjSXk0VEQ2RTlKNzR1Zml0K0s4blNjR21FTkZPYVRWdWxabWtuMmw3cApFYWxUK3FzOFVaNHFMNUNYeXUzeVpubXJXQ3UvTEw5dTIyanJzSFhhdnJEOUUrZmlQUHNhKzFhc3p2UFlzMDlpCkwvOXdTV3dNcWg5SDExTXQ4N01hMm9IVjJNTWlGTVB1cW1OM0FLOFd5ak9yeFkzaVRHRXNkc05KdWhtN2RTZHQKb00zaWN0cGp2aW51cHpld1UxWWpaVHY5VVNvbmwveGJyTTR0TkJhNzZJZTJEYXUrbXg3RmMzRUFPQkY1ZTVkWQp6NTFiUGttNXZ2eUMvTHpjSE04WTdUSzNpbmZDcU95c1RHZkd5QkhwdzRlbHBRNU5TUjZTNUxEYlpFa1VHQlVHCnRJcXdxdWVFZFNsSG16V3JpT3RhQkliSU9ZWXdublZWcnhnWW82dThYd1N1QVpFK1JOYWZGK21MUi9vU2tTeFYKblVKVGlnclZnS2JxTC9vMTFXRExGZ1loMytuWFFxcCt4cExuVy9KZGxqd1VzdHVORG1yQTJlQlhkUlpXQTNwRgpXME1zRVBZWEZiSXVIeUFZVWxUSUR4WWZKZlBFT3MySWJNQUpURE40UkVEUDB2d0JQVk9EREovb0NVVHE5TXFGCndZQS8yKzBPd1FiVG9pREdLQ3BzMUZFbmJVbXAwK3EyR0Q2cUNYTXBzanlvaTVHUUxvUjVyalN2bnFINTlZeWIKVGp0L1VQdWx3Tlp6bkxyZ3FZaEVZeFc2TDd3RjRISTF6TFhJVm1oenExU2tGVGFGZ2pyYjFGY0VyN0VKbGZKeQo0eThOVDdoSjFaTzBjcTBoMWhRR3VMUW8ySm5seTdKT1o1MHFnNTJadmt4TEtTcnNjbTZjN01ic3U0cW1GMDNuCmZMTGJ1VEhPUDdrMWJuK2xoM1BueHFmZkE1KzdLQUVBNHdob3MxR25ydFphZzJnb2RnSy9SU2RRckhZQ2NNSVYKWXBobUkrcVpvUXZZTTZKSGx6MnpJM3A3Vlg4WkRmNTRjZUVtZjJkU1pwYjFsaW9QSVQ0Y1M1MkVsVUo4cXFiRwp6dUoxSHRiT2ZEN1FFdW16MkR5cFo0azcrVUluOW9yT0l2MXlHMytiZWpEckJxZld3TmUzelZwVDZKb3pjSTRCCk9vZUcxNnluNHcxZkdYVHJhZ2dHL053c25HdFFVbVh3TUdNZElZT1ptd3p5dTdyd0cxdGN1UUx1UXI3Vkd2MFkKSDBwUklRd0Zia2lYRjZvVkdMbUM3eFUxcHNabTE4WFVDclVCbTBueVdCeU9hQ3hVREFTcmdzQ0pGbU5FWHlnNwpJVVpEb1VuSVU4enpvQXZDWXlGa2FPckxBRzZaaXI5SDBOaEN2RzNGbk1yZ3dxRGU3cy9XZmY0UVZnSGJ0NmN5CnFQZGc1NFpDaUNwSlZJcUsrVS9yZU0zalVITkpBZnlsOFN6NGNkT09GS0ZZak9lc0NtcHV2U2NXeTQ3eDV5MnUKRzR6T04vajZEQWJ4RUE2NXdkb3IwUmRNYzJkYmErRFczQ2dyeERHOUFsdTZmMGZoUi8yRkVTNUwxSTJlNDFGdAptWVh3aEl1RThNVEJJRHhwVUFoUFRsUTZBT0VwcUhreVIvaXFudy9ocVFNUW5uWmhoSDJKdWxIa2RGVHJzeEF1CnYwZ0l6eGdNd3Y1QklSeElWRG9BNFFyVUhPQUl6L3o1RUo0MUFPSFpGMFo0VHFKdUZEa1gxYzZ4RUo1M2tSQ2UKUHhpRUZ3d0s0YXNUbFE1QXVCSTFYODBSWHZqeklieG9BTUpWRjBaNGNhSnVGTGtFMVM2MkVGNTZrUkMrWmpBSQpCd2VGY0NoUjZRQ0VsNkhtRUVmNDJnVEN2bXlkemoySDI4ODdkdW1pSDh6TEIwQmVmV0hJVnlRbWdxcFhvdndWCkZ1VGhpd1I1WkRDUTF3d0s4dHBFcFFNZ3IwUE50Unp5NlA4Ujh2cHpJSmVIVWJuOEpZWHhJN1gvbTE4Sy91bWwKUUhjbkxQZytTZndycDREL1JDU2R3bjlwRWQ4TVo4US9sRG1LRFpKQWpsU0Q2QlNJNjVERmR5Q0QyOEZGOEtSMwpxQnU5aUpaNnU1RkpCaDliVXBybVRzc0ZsVXNkeG5jZnlDZSttV0ZJODcvRmh4ZU1IVGJmbHJmSnA2bVVYdVFqCmRlT3Zob1JPOGV3Q1JoTDZSckpCdGhWUHowYmRMaG9KeWdHVmdTcEFTMEgxb0RiUTdhQWRvTDJnWTZBL2c0WlcKVDVmcE5RaW5RVUsxUVM3VW1vMk0yY2pPWlFXeVVvemFjNmpZcW4wb3BWc2MzMzhzbm9SeGVWbERFWnlHeVNhQgpPOUhKQnA0RnpzQjVFZzZHKzlUWWt1SGpTM091dkdLOE5yNjBiSHlaZXh4bGFKY3o3VEs3RFIrMDNMWVI2UmxnCkl6TkdsbzRiWHphKzFHYTNhWmZsNW9qaGdxY0Y0UjhGZjd1cytuNDIvRE1tWHZKdzl0N3RqN2RNelJZdUwvaisKVTVFSi9vTHZ6enF2aWo3ZkZTbk5mSGpremR1K2Z1T2VXSzZRMHBIdjlYZzZIci85Zzk2M2ozZnN2Vy94cG83UwppVm5Pamx2RHUvZUY3djcwZHlkMjNjTmt2cTdXWlVieG4vM0hMdmlaSUFYV3JWM0R2UXhmSVBqYzhhRVgzNHdwCk5PK2FhMmJNOTg2S3JtNkx0amJXUnF3SXk0MGIvRFRLN0x1NE1TRXo5Vkd1L3cvNVAxdHpDbVZ1WkhOMGNtVmgKYlFwbGJtUnZZbW9LTkRNZ01DQnZZbW9LTXpFME5BcGxibVJ2WW1vS01TQXdJRzlpYWdvOFBDQXZWR2wwYkdVZwpLSE5oYlhCc1pTMWtiMk4wYjNJdGNISmxjMk55YVhCMGFXOXVMV1p2Y20wdWNHUm1LU0F2VUhKdlpIVmpaWElnCktHMWhZMDlUSUZabGNuTnBiMjRnTVRBdU1UVXVNaUJjS0VKMWFXeGtJREU1UXpVM1hDa2dVWFZoY25SNklGQkUKUmtOdmJuUmxlSFFwQ2k5RGNtVmhkRzl5SUNoUWNtVjJhV1YzS1NBdlEzSmxZWFJwYjI1RVlYUmxJQ2hFT2pJdwpNakF3TnpJM01EYzFPVFF5V2pBd0p6QXdKeWtnTDAxdlpFUmhkR1VnS0VRNk1qQXlNREEzTWpjd056VTVOREphCk1EQW5NREFuS1FvK1BncGxibVJ2WW1vS2VISmxaZ293SURRMENqQXdNREF3TURBd01EQWdOalUxTXpVZ1ppQUsKTURBd01EQTNNamMxTUNBd01EQXdNQ0J1SUFvd01EQXdNREF4T1RFeElEQXdNREF3SUc0Z0NqQXdNREF3TlRRMApORGtnTURBd01EQWdiaUFLTURBd01EQXdNREF5TWlBd01EQXdNQ0J1SUFvd01EQXdNREF4T0RreElEQXdNREF3CklHNGdDakF3TURBd01ESXdNalVnTURBd01EQWdiaUFLTURBd01EQXdOVFkyTXlBd01EQXdNQ0J1SUFvd01EQXcKTURNM01ETTFJREF3TURBd0lHNGdDakF3TURBd01ESTFPVEFnTURBd01EQWdiaUFLTURBd01EQXdORGc1TkNBdwpNREF3TUNCdUlBb3dNREF3TURVd09EZ3pJREF3TURBd0lHNGdDakF3TURBd016YzFPVGdnTURBd01EQWdiaUFLCk1EQXdNREEwTlRVMU1pQXdNREF3TUNCdUlBb3dNREF3TURVME5ERXlJREF3TURBd0lHNGdDakF3TURBd016Y3cKTlRZZ01EQXdNREFnYmlBS01EQXdNREF6TnpVM09DQXdNREF3TUNCdUlBb3dNREF3TURBMU5EQTNJREF3TURBdwpJRzRnQ2pBd01EQXdNRFUyTkRRZ01EQXdNREFnYmlBS01EQXdNREEwTnpZd09TQXdNREF3TUNCdUlBb3dNREF3Ck1EUTRNVEkzSURBd01EQXdJRzRnQ2pBd01EQXdNRFE1TVRVZ01EQXdNREFnYmlBS01EQXdNREF3TlRFek9DQXcKTURBd01DQnVJQW93TURBd01EQTFNVFUzSURBd01EQXdJRzRnQ2pBd01EQXdNRFV6T0RnZ01EQXdNREFnYmlBSwpNREF3TURBME5UVTNNeUF3TURBd01DQnVJQW93TURBd01EUTNOVGc0SURBd01EQXdJRzRnQ2pBd01EQXdNREl6Ck1EWWdNREF3TURBZ2JpQUtNREF3TURBd01qVTNNU0F3TURBd01DQnVJQW93TURBd01EVTBOVGt5SURBd01EQXcKSUc0Z0NqQXdNREF3TmpnM05qTWdNREF3TURBZ2JpQUtNREF3TURBME9ERTBOeUF3TURBd01DQnVJQW93TURBdwpNRFV3T0RZeUlEQXdNREF3SUc0Z0NqQXdNREF3TlRBNU1qQWdNREF3TURBZ2JpQUtNREF3TURBMU5ETTVNU0F3Ck1EQXdNQ0J1SUFvd01EQXdNRFUwTlRReUlEQXdNREF3SUc0Z0NqQXdNREF3TlRVd056UWdNREF3TURBZ2JpQUsKTURBd01EQTFOVE15TkNBd01EQXdNQ0J1SUFvd01EQXdNRFk0TnpReElEQXdNREF3SUc0Z0NqQXdNREF3TmpreQpORFlnTURBd01EQWdiaUFLTURBd01EQTJPRGt5T0NBd01EQXdNQ0J1SUFvd01EQXdNRFk1TWpJMklEQXdNREF3CklHNGdDakF3TURBd05qazBPVFVnTURBd01EQWdiaUFLTURBd01EQTNNamN5T1NBd01EQXdNQ0J1SUFwMGNtRnAKYkdWeUNqdzhJQzlUYVhwbElEUTBJQzlTYjI5MElETTFJREFnVWlBdlNXNW1ieUF4SURBZ1VpQXZTVVFnV3lBOApOR1ZtTXpReVpqY3daV1F6WTJGak9UVXdNbU15TVRBelkyRTJNRGc1TVRNK0NqdzBaV1l6TkRKbU56QmxaRE5qCllXTTVOVEF5WXpJeE1ETmpZVFl3T0RreE16NGdYU0ErUGdwemRHRnlkSGh5WldZS056STVOemdLSlNWRlQwWUsK");
			attachment.addProperty("title", "Surgical Pathology Report");
			content1.add("attachment", attachment);
			content.add(content1);
			resource19.add("content", content);

			jsonObjectFullUrl19.add("resource", resource19);
			enrtyArray.add(jsonObjectFullUrl19);

			// Practitioner
			com.google.gson.JsonObject jsonObjectFullUrl20 = new com.google.gson.JsonObject();
			jsonObjectFullUrl20.addProperty("fullUrl", "Practitioner" + "/" + "MAX5001");

			com.google.gson.JsonObject resource20 = new com.google.gson.JsonObject();
			resource20.addProperty("resourceType", "Practitioner");
			resource20.addProperty("id", "MAX5001");

			com.google.gson.JsonArray identifier4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject identfier4Obj = new com.google.gson.JsonObject();
			identfier4Obj.addProperty("system", "https://www.mciindia.in/doctor");
			identfier4Obj.addProperty("value", "MAX5001");
			identifier4.add(identfier4Obj);

			resource20.add("identifier", identifier4);

			com.google.gson.JsonArray name5 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name5obj = new com.google.gson.JsonObject();
			name5obj.addProperty("text", "Laxmikanth J");

			com.google.gson.JsonArray prefix2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo6 = new com.google.gson.JsonObject();
			demo6.addProperty("ar2", "Dr");
			JsonElement jsonElement8 = demo6.get("ar2");
			prefix2.add(jsonElement8);

			com.google.gson.JsonArray suffix4 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo7 = new com.google.gson.JsonObject();
			demo7.addProperty("ar2", "MD");
			JsonElement jsonElement9 = demo7.get("ar2");
			suffix4.add(jsonElement9);

			name5obj.add("prefix", prefix2);
			name5obj.add("suffix", suffix4);
			name5.add(name5obj);

			resource20.add("name", name5);

			jsonObjectFullUrl20.add("resource", resource20);
			enrtyArray.add(jsonObjectFullUrl20);

			// Procedure

			UUID uuidFullUrl28 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl21 = new com.google.gson.JsonObject();
			jsonObjectFullUrl21.addProperty("fullUrl", "Procedure" + "/" + uuidFullUrl28.toString());
			com.google.gson.JsonObject resource21 = new com.google.gson.JsonObject();
			resource21.addProperty("resourceType", "Procedure");
			resource21.addProperty("id", uuidFullUrl28.toString());
			resource21.addProperty("status", "completed");

			com.google.gson.JsonObject code8 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coding6 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coding7 = new com.google.gson.JsonObject();
			coding7.addProperty("system", "https://projecteka.in/sct");
			coding7.addProperty("code", "90105005");
			coding7.addProperty("display", "Biopsy of soft tissue of forearm (Procedure)");
			coding6.add(coding7);
			code8.add("coding", coding6);
			code8.addProperty("text", "Biopsy of suspected melanoma L) arm");
			resource21.add("code", code8);

			com.google.gson.JsonObject subject3 = new com.google.gson.JsonObject();
			subject3.addProperty("reference", "Patient" + "/" + patientID);
			resource21.add("subject", subject3);

			resource21.addProperty("performedDateTime", currentDate);

			com.google.gson.JsonObject asserter2 = new com.google.gson.JsonObject();
			asserter2.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			asserter2.addProperty("display", "Dr Akshatha M K");
			resource21.add("asserter", asserter2);

			com.google.gson.JsonArray performer = new com.google.gson.JsonArray();
			com.google.gson.JsonObject performer1 = new com.google.gson.JsonObject();
			com.google.gson.JsonObject actor = new com.google.gson.JsonObject();
			actor.addProperty("reference", "Practitioner" + "/" + "MAX5001");
			performer1.add("actor", actor);
			performer.add(performer1);
			resource21.add("performer", performer);

			com.google.gson.JsonArray complication = new com.google.gson.JsonArray();
			com.google.gson.JsonObject complication1 = new com.google.gson.JsonObject();
			com.google.gson.JsonArray coding8 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject coding9 = new com.google.gson.JsonObject();
			coding9.addProperty("system", "https://projecteka.in/sct");
			coding9.addProperty("code", "131148009");
			coding9.addProperty("display", "Bleeding");
			coding8.add(coding9);
			complication1.add("coding", coding8);
			complication.add(complication1);
			resource21.add("complication", complication);

			jsonObjectFullUrl21.add("resource", resource21);
			enrtyArray.add(jsonObjectFullUrl21);

			// CarePlan
			UUID uuidFullUrl29 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl22 = new com.google.gson.JsonObject();
			jsonObjectFullUrl22.addProperty("fullUrl", "CarePlan" + "/" + uuidFullUrl29.toString());
			com.google.gson.JsonObject resource22 = new com.google.gson.JsonObject();
			resource22.addProperty("resourceType", "Procedure");
			resource22.addProperty("id", uuidFullUrl29.toString());
			resource22.addProperty("status", "draft");
			resource22.addProperty("intent", "proposal");
			resource22.addProperty("title", "Tentative Plan for next 2 months");
			resource22.addProperty("description",
					"Actively monitor progress. Review every week to start with. Medications to be revised after 2 weeks.");

			com.google.gson.JsonObject sub1 = new com.google.gson.JsonObject();
			sub1.addProperty("reference", "Patient" + "/" + patientID);
			resource22.add("subject", sub1);

			com.google.gson.JsonObject period = new com.google.gson.JsonObject();
			period.addProperty("start", currentDate);
			period.addProperty("end", currentDate);
			resource22.add("period", period);

			com.google.gson.JsonObject author = new com.google.gson.JsonObject();
			author.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			author.addProperty("display", doctorname);
			resource22.add("author", author);

			com.google.gson.JsonArray note2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject note3 = new com.google.gson.JsonObject();
			note3.addProperty("text", "Actively monitor progress.");
			note2.add(note3);
			com.google.gson.JsonObject note4 = new com.google.gson.JsonObject();
			note4.addProperty("text", "Review every week to start with. Medications to be revised after 2 weeks.");
			note2.add(note4);
			resource22.add("note", note2);

			jsonObjectFullUrl22.add("resource", resource22);
			enrtyArray.add(jsonObjectFullUrl22);

			// Appointment
			UUID uuidFullUrl30 = UUID.randomUUID();
			com.google.gson.JsonObject jsonObjectFullUrl23 = new com.google.gson.JsonObject();
			jsonObjectFullUrl23.addProperty("fullUrl", "Appointment" + "/" + uuidFullUrl30.toString());
			com.google.gson.JsonObject resource23 = new com.google.gson.JsonObject();
			resource23.addProperty("resourceType", "Appointment");
			resource23.addProperty("id", uuidFullUrl30.toString());
			resource23.addProperty("status", "booked");
			resource23.addProperty("description", "Review progress in 7 days");
			resource23.addProperty("start", currentDate);
			resource23.addProperty("end", currentDate);

			com.google.gson.JsonArray participant = new com.google.gson.JsonArray();
			com.google.gson.JsonObject participant1 = new com.google.gson.JsonObject();
			com.google.gson.JsonObject actor1 = new com.google.gson.JsonObject();
			actor1.addProperty("reference", "Practitioner" + "/" + "MAX191101");
			actor1.addProperty("display", doctorname);
			participant1.add("actor", actor1);
			participant1.addProperty("status", "accepted");
			participant.add(participant1);
			resource23.add("participant", participant);

			jsonObjectFullUrl23.add("resource", resource23);
			enrtyArray.add(jsonObjectFullUrl23);

			// start eight object

			// eight obj end

			// object nine start

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("Main json obj=======" + jsonObject.toString());
		 return jsonObject.toString();

	}
}
