package com.hms.pathology.serviceImpl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pathology.service.UpdateDuplicateProfileService;

@Service
@Transactional
public class UpdateDuplicateProfileServiceImpl  implements UpdateDuplicateProfileService{

	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int updateDuplicateProfileIds(int treatmentID) {
		Session s = sessionFactory.getCurrentSession();
		   try {
			   Query querySp = s.createSQLQuery("call sp_pathology_get_duplicate_master_id(:treatmentId)");
				querySp.setParameter("treatmentId", treatmentID);
				querySp.executeUpdate();
				return 1;
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

}
