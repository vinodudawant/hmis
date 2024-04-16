package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.OPDCoversheetVitalDao;
import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.doctordesk.dto.OPDConstultantDoctorDto;
import com.hms.doctordesk.dto.OPDCoverSheetVitalDTO;

import com.hms.ehat.dto.TreatmentDto;

@Repository
public class OPDCoversheetVitalDaoImpl implements OPDCoversheetVitalDao {

	@Autowired
	SessionFactory sf;
	@Override
	public List<OPDCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId, Integer unitId,
			String CallFrom, String userDate) {
		List<OPDCoverSheetVitalDTO> list=new ArrayList<OPDCoverSheetVitalDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDCoverSheetVitalDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			if(!CallFrom.equalsIgnoreCase("all")) {
			c.add(Restrictions.eq("vitalDate",userDate));
			}
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
	@Override
	public List<CoversheetVitalInfo> lstCoversheetVitalInfo(Integer patientId) {
		List<CoversheetVitalInfo> list = new ArrayList<CoversheetVitalInfo>();
		try {
			 Query q=sf.getCurrentSession().createSQLQuery("CALL sp_get_all_vitals_by_patient_id(:patientId)");
			  q.setParameter("patientId", patientId);
			  q.setResultTransformer(Transformers.aliasToBean(CoversheetVitalInfo.class));
			  list=q.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
