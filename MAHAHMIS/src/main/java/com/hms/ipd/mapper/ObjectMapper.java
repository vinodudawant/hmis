package com.hms.ipd.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.hms.dto.Assessment;
import com.hms.dto.RouteDTO;
import com.hms.model.DocBean;

public class ObjectMapper {

	public static List<DocBean> setDocBean(List<Map<String, Object>> listDetails) {
		List<DocBean> documentsList = new ArrayList<DocBean>();
		for (Map rs : listDetails) {
			DocBean obj = new DocBean();
			obj.setHiddenR((Integer) rs.get("idtreatment_docs"));
			obj.setTreatmentID((String) rs.get("treatmentID"));
			obj.setDocument((String) rs.get("image_name"));
			obj.setNotes((String) rs.get("notes"));
			obj.setDate((String) rs.get("date"));
			documentsList.add(obj);
		}
		return documentsList;
	}

	public static List<RouteDTO> setRouteDTO(List<Map<String, Object>> list) {
		List<RouteDTO> routeList = new ArrayList<RouteDTO>();
		for (Map map : list) {
			RouteDTO objRoute = new RouteDTO();
			objRoute.setRouteId((Integer) map.get("idroute_master"));
			objRoute.setRoute_name((String) map.get("route_name"));
			objRoute.setPrepId((Integer) map.get("preperation"));
			String preperation = (String) map.get("preparation_name");
			objRoute.setPrep(preperation);
			routeList.add(objRoute);
		}
		return routeList;
	}

	public static List<Assessment> setAssessment(List<Map<String, Object>> list) {
		List<Assessment> arrAssessments = new ArrayList<Assessment>();
		for (Map rs : list) {
			try {
				Assessment objAssessment = new Assessment();
				objAssessment.setDiagno_slave_id((Integer) (rs.get("id")));
				objAssessment.setDiagnosis((String) (rs.get("diagnosis")));
				objAssessment.setDiagno_description((String) (rs.get("diagno_Description")));
				objAssessment.setIcd10_code((String) (rs.get("icd10_Code")));
				objAssessment.setDate((String) rs.get("date"));
				objAssessment.setDiagno_type((String) (rs.get("diagnosis_Type")));
				objAssessment.setComment((String) (rs.get("comment")));
				objAssessment.setDiagnosed_by((String) (rs.get("user_name")));
				arrAssessments.add(objAssessment);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return arrAssessments;
	}

}
