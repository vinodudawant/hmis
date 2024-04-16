package com.hms.ipd.daoimpl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipd.dao.IPDMisDao;
import com.hms.ipd.dto.IPDMisReportDTO;
import com.hms.ipd.dto.OPDMisReportDTO;

//added by vishant pawar
@SuppressWarnings("unchecked")
@Repository
public class IPDMisDaoImpl implements IPDMisDao {

	private @Autowired SessionFactory sessionFactory;

	@Override
	@Transactional
	public List<IPDMisReportDTO> fetchIPDMisReport(String fromDate, String toDate, Integer searchBy) {

		Session currentSession = sessionFactory.getCurrentSession();
		try {
			Query prefixSp = currentSession.createSQLQuery("call sp_get_ipd_mis_report(:fromDate,:toDate,:searchBy)");

			prefixSp.setParameter("fromDate", fromDate);
			prefixSp.setParameter("toDate", toDate);
			prefixSp.setParameter("searchBy", searchBy);

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IPDMisReportDTO.class));
			@SuppressWarnings("unchecked")
			List<IPDMisReportDTO> misReportDTOs = prefixSp.list();

			return misReportDTOs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public List<OPDMisReportDTO> fetchOPDMisReport(String fromDate, String toDate, String searchBy,
			Integer specialityId, Integer doctorId) {

		Session currentSession = sessionFactory.getCurrentSession();
		try {
			Query prefixSp = currentSession.createSQLQuery("call sp_get_opd_mis_report(:fromDate,:toDate,:searchBy,:specialityId,:doctorId)");

			prefixSp.setParameter("fromDate", fromDate);
			prefixSp.setParameter("toDate", toDate);
			prefixSp.setParameter("searchBy", searchBy);
			if(searchBy.equalsIgnoreCase("All")) {
				
				prefixSp.setParameter("specialityId", null);
				prefixSp.setParameter("doctorId", null);	
			}
			else if(searchBy.equalsIgnoreCase("SpecialityWise")) {
				
				prefixSp.setParameter("specialityId", specialityId);
				prefixSp.setParameter("doctorId", null);
			}
			else if(searchBy.equalsIgnoreCase("DoctorWise")) {
				
				prefixSp.setParameter("specialityId", specialityId);
				prefixSp.setParameter("doctorId", doctorId);
			}
			
			

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OPDMisReportDTO.class));
			@SuppressWarnings("unchecked")
			List<OPDMisReportDTO> misReportDTOs = prefixSp.list();

			return misReportDTOs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}
