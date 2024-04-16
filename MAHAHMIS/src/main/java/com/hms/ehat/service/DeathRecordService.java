package com.hms.ehat.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.DeathPatientView;
/*import com.hms.ehat.dto.DeathPatientView2;*/



public interface DeathRecordService {

	int saveOrUpdateDeathRecord(String patientId,
			HttpServletRequest request, int docId, String narration, int deathId, String deathFlag, String deathDate, String deathTime);

	List<DeathPatientView> getDeathList();

	boolean deleteDeathRecord(Integer deathId, HttpServletRequest request);

	List<DeathPatientView> getMarkVisitList();

	DeathPatientView autoSuggestionMarkVisit(String letter, String usertype);

	List<Doctor> setDoctorList();

	List<DeathPatientView> getdeathpatientsList(String fromdate, String todate,
			String callfrom);

}
