package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.IVFDignosisDao;
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
@Repository
public class IVFDignosisDaoImpl implements IVFDignosisDao{
	
	@Autowired
	SessionFactory sf;

	@Override
	public int saveIVFDignosis(IVFDignosisDTO obj) {
		try {
		   if(obj.getDignosisMasterId()==0) {
			   sf.getCurrentSession().merge(obj);
			   return 1;
		   }else {
			   sf.getCurrentSession().merge(obj);
			   return 2;
		   }
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<IVFDignosisDTO> getListOfIVFDignosis(Integer ivfTreatId, Integer unitId) {
		List<IVFDignosisDTO> list=new ArrayList<>();
		   try {
			   IVFTreatmentDTO ivfobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, ivfTreatId);
			  Criteria c= sf.openSession().createCriteria(IVFDignosisDTO.class);
			  c.add(Restrictions.eq("deleted", "N"));
			  c.add(Restrictions.eq("ivfTreatObj",ivfobj));
			  list=c.list();
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public IVFDignosisDTO editIVFDignosis(Integer ivfdignoMasterId) {
		IVFDignosisDTO obj=new IVFDignosisDTO();
		try {
			
			obj=(IVFDignosisDTO) sf.openSession().get(IVFDignosisDTO.class, ivfdignoMasterId);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteIVFDigno(String ivfdignoMasterId, Integer userId) {
		try {
			String hql="UPDATE IVFDignosisDTO set deleted='Y',deletedDateTime=now(),deletedBy="+userId+"  where dignosisMasterId in( "+ivfdignoMasterId+") ";
			Query q=  sf.getCurrentSession().createQuery(hql);
			//q.setParameter("dignosisMasterId", ivfdignoMasterId);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int updateDignosisStatus(String ivfdignoMasterId, Integer userId, String callFrom) {
		try {
			String hql="UPDATE IVFDignosisDTO set diagnosisType='"+callFrom+"'  where dignosisMasterId in( "+ivfdignoMasterId+") ";
			Query q=  sf.getCurrentSession().createQuery(hql);
			//q.setParameter("dignosisMasterId", ivfdignoMasterId);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

}
