package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.doctordesk.dto.OPDCoverSheetVitalDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfCoversheetVitalDao;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfCoverSheetVitalDTO;

@Repository
public class IvfCoversheetVitalDaoImpl  implements IvfCoversheetVitalDao{
	
	@Autowired
	SessionFactory sf;

	@Override
	public List<IvfCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId, Integer unitId,
			String CallFrom, String userDate) {List<IvfCoverSheetVitalDTO> list=new ArrayList<IvfCoverSheetVitalDTO>();
			IVFTreatmentDTO tobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, treatmentId);
			try {
				Criteria c=  sf.openSession().createCriteria(IvfCoverSheetVitalDTO.class);
				c.add(Restrictions.eq("ivfTreatObj", tobj));
				c.add(Restrictions.eq("deleted", "N"));
				c.add(Restrictions.eq("unitId",unitId));
				if(!CallFrom.equalsIgnoreCase("all")) {
				c.add(Restrictions.eq("vitalDate",userDate));
				}
				list=c.list();
				
			}catch (Exception e) {
				e.printStackTrace();
			}
			
			return list;}

	@Override
	public List<CoversheetVitalInfo> lstCoversheetVitalInfo(Integer patientId) {
		List<CoversheetVitalInfo> list = new ArrayList<CoversheetVitalInfo>();
		try {
			 Query q=sf.getCurrentSession().createSQLQuery("CALL sp_get_all_vitals_ivf_by_patient_id(:patientId)");
			  q.setParameter("patientId", patientId);
			  q.setResultTransformer(Transformers.aliasToBean(CoversheetVitalInfo.class));
			  list=q.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
