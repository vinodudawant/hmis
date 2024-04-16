package com.hms.ipd.serviceimpl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.BedStateMgtDao;
import com.hms.ipd.dto.BedStateSettingDTO;
import com.hms.ipd.service.BedStateMgtService;

@Service
@Transactional
public class BedStateMgtServiceImpl implements BedStateMgtService{

	private @Autowired
	BedStateMgtDao bedStateMgtDao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<ChargesMasterSlave> getHallMasterList() {

		return bedStateMgtDao.getHallMasterList();
	}
	
	@Override
	public Beds viewBedsOfHall(int hallId) {

		return bedStateMgtDao.viewBedsOfHall(hallId);
	}
	
	@Override
	public int deallocateCleanedBeds(String bedIds,int userId) {

		return bedStateMgtDao.deallocateCleanedBeds(bedIds,userId);
	}

	@Override
	public void autoDeallocateCleanedBeds() {
		
		String hql = "update Beds set bedstate=:bedState where bedstate=:curBedState";
		Query qry = sessionFactory.getCurrentSession().createQuery(hql);
		qry.setParameter("bedState", "4");
		qry.setParameter("curBedState", "2");
		qry.executeUpdate();		
	}
	
	@Override
	public BedStateSettingDTO getBedStateSetting() {
		
		BedStateSettingDTO obj = new BedStateSettingDTO();
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BedStateSettingDTO.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			@SuppressWarnings("unchecked")
			List<BedStateSettingDTO> lstSetting = criteria.list();
			obj.setLstBedStateSetting(lstSetting);
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
