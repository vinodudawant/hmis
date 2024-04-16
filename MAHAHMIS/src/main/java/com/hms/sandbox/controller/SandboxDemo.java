package com.hms.sandbox.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import com.google.gson.JsonElement;

public class SandboxDemo {

	public static void main(String[] args) {
		System.out.println("inside main method");
		DiagnosisData(123);
		System.exit(0);
	}

	@SuppressWarnings("unchecked")
	public static String DiagnosisData(Integer patientId) {
		// LOG.info("Inside a Send Diagnosis Data ");

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		com.google.gson.JsonObject jsonObject = new com.google.gson.JsonObject();

//	Integer unitId=1;
//	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);
//	criteria.add(Restrictions.eq("sandboxIntegrationFlag", 'Y'));
//	criteria.add(Restrictions.eq("hospitalUnitId", unitId));
//	HospitalDetails hospitalDetails = (HospitalDetails) criteria.uniqueResult();

//	if (hospitalDetails == null) {
//
//		throw new RuntimeException("Hospital Details is null in dignostic report");
//	}

//	List<RegistrationDto> patientRecordsbypatientId = regService.getPatientRecordsbypatientId(patientId);
//	RegistrationDto sandBoxPatientInfo=patientRecordsbypatientId.get(0);
//	
//	String patientName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getlName();
//	String patientId2 = sandBoxPatientInfo.getPatientId().toString();
		String patientId2 = "123";

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

//	         jsonObjectFullUrl1.addProperty("fullUrl", "Composition"+"/"+uuidFullUrl1.toString());
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
			jsonObjectSubject1.addProperty("reference", "Patient/" + patientId2);

			jsonObjectFullUrl1Resource.add("subject", jsonObjectSubject1);

			com.google.gson.JsonArray attesterArray1 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonattesterobj1 = new com.google.gson.JsonObject();
			jsonattesterobj1.addProperty("mode", "official");
			com.google.gson.JsonObject jsonpartyobj1 = new com.google.gson.JsonObject();
			jsonpartyobj1.addProperty("display", "Max Super Speciality Hospital, Saket");
//		jsonpartyobj1.addProperty("display", hospitalDetails.getHospitalName());

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
			jsonObjectFullUrl9.addProperty("fullUrl", "Organization" + "/" + "MaxSaket01");

			com.google.gson.JsonObject resource9 = new com.google.gson.JsonObject();
			resource9.addProperty("resourceType", "Organization");
			resource9.addProperty("id", "MaxSaket01");
			resource9.addProperty("name", "Max Super Speciality Hospital, Saket");
//		resource9.addProperty("name",hospitalDetails.getHospitalName());

			com.google.gson.JsonArray addressArray8 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject address8 = new com.google.gson.JsonObject();
			address8.addProperty("city", "New Delhi");
//		address8.addProperty("city", hospitalDetails.getHospitalState());
			address8.addProperty("country", "India");

			com.google.gson.JsonArray line9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject de = new com.google.gson.JsonObject();
			de.addProperty("ar", "");
			JsonElement jsonElement = de.get("ar");
			line9.add(jsonElement);
			address8.add("line", line9);
			address8.addProperty("postalCode", "");
			address8.addProperty("state", "MAHARASTRA");
			addressArray8.add(address8);
			resource9.add("address", addressArray8);

			com.google.gson.JsonArray alias9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo = new com.google.gson.JsonObject();
			demo.addProperty("ar", "");
			JsonElement jsonElement1 = demo.get("ar");
			alias9.add(jsonElement1);
			resource9.add("alias", alias9);

			com.google.gson.JsonArray endpoint9 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject endpointobj9 = new com.google.gson.JsonObject();
			endpointobj9.addProperty("display", "Website");
			endpointobj9.addProperty("reference",
					"https://www.max.in/hospital-network/max-super-speciality-hospital-saket");
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
			jsontelecomFullUrl9.addProperty("value", "");
			com.google.gson.JsonObject jsontelecomFullUrl91 = new com.google.gson.JsonObject();
			jsontelecomFullUrl91.addProperty("system", "fax");
			jsontelecomFullUrl91.addProperty("value", "");
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
//		String doctorname = "";
//		String sql = "select doctor_id from ehat_treatment where patient_id=" + patientId + " ";
//		SQLQuery sQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
//		String doctorIds = (String) sQuery.uniqueResult();
//		String[] doctorArray = doctorIds.split(",");
//		int docCount = 1;
//		for (String doctorId : doctorArray) {
//			String sqlDoctor = "select doc_name from doctor where Doctor_ID= '" + doctorId + "' ";
//			SQLQuery sdocQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
//			String docName = (String) sdocQuery.uniqueResult();
//			if (docCount == 1) {
//				doctorname = docName;
//			} else {
//				doctorname = doctorname + "," + docName;
//			}
//			docCount++;
//
//		}
			// end doctor details

			com.google.gson.JsonArray name2 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name2obj = new com.google.gson.JsonObject();
			name2obj.addProperty("text", "Manju Sengar");
//		name2obj.addProperty("text", doctorname);
			name2obj.addProperty("family", "Sengar");

			com.google.gson.JsonArray given = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo1 = new com.google.gson.JsonObject();
			demo1.addProperty("ar1", "Manju");
			JsonElement jsonElement2 = demo1.get("ar1");
			given.add(jsonElement2);

			com.google.gson.JsonArray prefix = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo2 = new com.google.gson.JsonObject();
			demo2.addProperty("ar2", "Dr");
			JsonElement jsonElement3 = demo2.get("ar2");
			prefix.add(jsonElement3);

			com.google.gson.JsonArray suffix = new com.google.gson.JsonArray();
			com.google.gson.JsonObject demo3 = new com.google.gson.JsonObject();
			demo3.addProperty("ar2", "MD");
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
			jsonObjectFullUrl3.addProperty("fullUrl", "Patient" + "/" + patientId2);// "RVH1002"

			com.google.gson.JsonObject resource3 = new com.google.gson.JsonObject();
			resource3.addProperty("resourceType", "Patient");
			resource3.addProperty("id", patientId2);

			com.google.gson.JsonArray identifier13 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject jsonIdentifierFullUrl13 = new com.google.gson.JsonObject();
			jsonIdentifierFullUrl13.addProperty("system", "https://projecteka.in/PHRID");
			jsonIdentifierFullUrl13.addProperty("value", "navjot.singh.2001@ncg");
			identifier13.add(jsonIdentifierFullUrl13);

			resource3.add("identifier", identifier13);

			com.google.gson.JsonArray name3 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject name3obj = new com.google.gson.JsonObject();
			name3obj.addProperty("text", "abc");
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
			subject4.addProperty("reference", "Patient/" + patientId2);

			resource4.add("subject", subject4);

			com.google.gson.JsonObject period4 = new com.google.gson.JsonObject();
			period4.addProperty("end", currentDate);
			period4.addProperty("start", currentDate);

			resource4.add("period", period4);

			jsonObjectFullUrl4.add("resource", resource4);

			enrtyArray.add(jsonObjectFullUrl4);
			// end fourth obj

			// getting Dynamic Report
//		Criteria c = sessionFactory.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
//		c.add(Restrictions.eq("patientId", patientId));
//		c.add(Restrictions.eq("deleted", "N"));

//		List<SandBoxPatientDignosis> listdigno1 = c.list();
////			List<SandBoxPatientDignosis> collect = listdigno1.stream().filter(x->x.getDeleted().equals("N")).
////			collect(Collectors.toList());
//		System.out.println("digno====" + listdigno1);
//		for (SandBoxPatientDignosis pobj : listdigno1) {

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
			subject5.addProperty("display", "Navjot Singh");
			subject5.addProperty("reference", "Patient/" + patientId2);
			resource5.add("subject", subject5);

			com.google.gson.JsonArray performer5Array = new com.google.gson.JsonArray();
			com.google.gson.JsonObject performer5obj = new com.google.gson.JsonObject();
			performer5obj.addProperty("reference", "Organization" + "/" + "MaxSaket01");
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

			resource5.addProperty("conclusion", "ad");
//			resource5.addProperty("conclusion", pobj.getComment());

			jsonObjectFullUrl5.add("resource", resource5);

			enrtyArray.add(jsonObjectFullUrl5);
			// end fifth obj

//			Criteria c1 = sessionFactory.getCurrentSession().createCriteria(SandBoxPatientDignosis.class);
//			c1.add(Restrictions.eq("patientId", patientId));
//			c1.add(Restrictions.eq("deleted", "N"));
//
//			List<SandBoxPatientDignosis> listdigno = c1.list();
//			System.out.println("digno====" + listdigno);

//			for (SandBoxPatientDignosis pobj2 : listdigno) {

			// start sixth obj

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
//				code6.addProperty("text", pobj2.getDiagndesc());
			code6.addProperty("text", "adedeqf");

			resource6.add("code", code6);

			com.google.gson.JsonObject subject6 = new com.google.gson.JsonObject();
			subject6.addProperty("display", "Navjot Singh");
			resource6.add("subject", subject6);

			com.google.gson.JsonArray performerArray6 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject performerobj6 = new com.google.gson.JsonObject();
			performerobj6.addProperty("display", "Dr. Manju");

			performerArray6.add(performerobj6);

			resource6.add("performer", performerArray6);

//				resource6.addProperty("valueString", pobj2.getDiagoName());
			resource6.addProperty("valueString", "sdf");

			jsonObjectFullUrl6.add("resource", resource6);

			enrtyArray.add(jsonObjectFullUrl6);
			// end sixth obj

			// start Seven obj

			com.google.gson.JsonObject jsonObjectFullUrl7 = new com.google.gson.JsonObject();
			jsonObjectFullUrl7.addProperty("fullUrl", "Observation" + "/" + uuidFullUrl7.toString());

			com.google.gson.JsonObject resource7 = new com.google.gson.JsonObject();
			resource7.addProperty("resourceType", "Observation");
			resource7.addProperty("id", uuidFullUrl7.toString());

			com.google.gson.JsonObject textReference7 = new com.google.gson.JsonObject();
			textReference7.addProperty("status", "additional");
			textReference7.addProperty("div", "<div xmlns=\"http://www.w3.org/1999/xhtml\"></div>");

			resource7.add("text", textReference7);
			resource7.addProperty("status", "final");

			com.google.gson.JsonObject code7 = new com.google.gson.JsonObject();
			code7.addProperty("text", "Further investigation");

			resource7.add("code", code7);

			com.google.gson.JsonObject subject7 = new com.google.gson.JsonObject();
			subject7.addProperty("display", "Navjot Singh");
			resource7.add("subject", subject7);

			com.google.gson.JsonArray performerArray7 = new com.google.gson.JsonArray();
			com.google.gson.JsonObject performerobj7 = new com.google.gson.JsonObject();
			performerobj7.addProperty("display", "Dr. Manju");

			performerArray7.add(performerobj7);

			resource7.add("performer", performerArray7);

			jsonObjectFullUrl7.add("resource", resource7);

			resource7.addProperty("valueString", "Correlate with Pathology Report");

			enrtyArray.add(jsonObjectFullUrl7);
			// end Sevan obj

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
//			}
//		}
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("Main json obj=======" + jsonObject.toString());
		return jsonObject.toString();

	}



}
