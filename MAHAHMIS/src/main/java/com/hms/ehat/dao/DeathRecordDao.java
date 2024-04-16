package com.hms.ehat.dao;

import java.util.Date;
import java.util.List;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.DeathPatientView;
/*import com.hms.ehat.dto.DeathPatientView2;*/



public interface DeathRecordDao {

	
	int saveOrUpdateDeathRecord(String patientId, int docId, Integer userId, Integer unitId, String narration, int deathId, String deathFlag, Date deathDate, String deathTime);

	List<DeathPatientView> getDeathList();

	boolean deleteUnit(Integer deathId, Integer userId);

	List<DeathPatientView> getMarkVisitList();

	DeathPatientView autoSuggestionMarkVisit(String letter, String usertype);

	List<Doctor> setDoctorList();

	List<DeathPatientView> getdeathpatientsList(String fromdate, String todate,
			String callfrom);
}
