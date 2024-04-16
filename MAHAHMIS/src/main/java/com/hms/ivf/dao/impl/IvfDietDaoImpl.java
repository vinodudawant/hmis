package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfDietDao;
import com.hms.ivf.dto.IVFBmiMasterDTO;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;

@Repository
public class IvfDietDaoImpl implements IvfDietDao {
	@Autowired
	SessionFactory sf;

	@Override
	public int saveIVFDiet(IVFDietDTO obj) {
		try {
			  if(obj.getDietMasterId()==0) {
				  sf.getCurrentSession().merge(obj);
				  return 1;
			  }else {
				  sf.getCurrentSession().merge(obj);
				  return 2;
			  }
			
			
		}catch (Exception e) {
			
		}
		return 0;
	}

	@Override
	public IVFDietDTO editIVFDiet(Integer dietMasterId) {
		IVFDietDTO obj=new IVFDietDTO();
		try {
			  obj=(IVFDietDTO) sf.openSession().get(IVFDietDTO.class, dietMasterId);
		}catch (Exception e) {
			
		}
		return obj;
	}

	@Override
	public List<IVFDietDTO> getIVFDietListByTreatmentId(Integer ivftreatmentId) {
		List<IVFDietDTO> list=new ArrayList<IVFDietDTO>();
		IVFTreatmentDTO tobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, ivftreatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(IVFDietDTO.class);
			c.add(Restrictions.eq("ivfTreatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public int deleteIVFDiet(String dietMasterIds, Integer userId) {
		int msg=0;
		try{
			
			
			Query itemInfo = sf	.getCurrentSession().createQuery("update IVFDietDTO set deleted='Y',deletedBy="
					+ userId	+ ",deletedDateTime=now() where dietMasterId in("+dietMasterIds+")");
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public List<IVFDietDTO> getIVFietListByDietIds(String dietIds) {
		System.err.println("dietIds opd...."+dietIds);
		List<IVFDietDTO> lstdiet=new ArrayList<IVFDietDTO>();
		try{
			List<Integer> Ids=new ArrayList<Integer>();
			String ids[]=dietIds.split(",");
			for(String dietID:ids){
				Ids.add(Integer.parseInt(dietID));
			}
			Criteria c=sf.openSession().createCriteria(IVFDietDTO.class);
			c.add(Restrictions.in("dietMasterId", Ids));
			
			lstdiet=c.list();
			System.err.println("lstdiet opd...."+lstdiet);
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstdiet;
	}

	@Override
	public int saveIVFPatientBMI(IVFBmiMasterDTO obj) {
		try {
			 
			if(obj.getOpdBmiMasterId()==0) {
				
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
	public List<IVFBmiMasterDTO> getIVFBMIListByTreatmentId(Integer treatmentId) {
		List<IVFBmiMasterDTO> list=new ArrayList<IVFBmiMasterDTO>();
		IVFTreatmentDTO tobj=(IVFTreatmentDTO) sf.openSession().get(IVFTreatmentDTO.class, treatmentId);
	try {
		Criteria c=  sf.openSession().createCriteria(IVFBmiMasterDTO.class);
		c.add(Restrictions.eq("ivfTreatObj", tobj));
		c.add(Restrictions.eq("deleted", "N"));
		list=c.list();
		
	}catch (Exception e) {
		e.printStackTrace();
	}
	
	return list;}

	@Override
	public IVFBmiMasterDTO editIVFBMI(Integer opdBmiMasterId) {
		IVFBmiMasterDTO obj=new IVFBmiMasterDTO();
		try {
			obj= (IVFBmiMasterDTO) sf.openSession().get(IVFBmiMasterDTO.class, opdBmiMasterId);
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

}
