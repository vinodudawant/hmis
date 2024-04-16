package com.hms.ehat.dao.impl;

import java.sql.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.LaundryLinonProcessDao;

import com.hms.ehat.dto.LaundryLinonProcessDto;
import com.hms.ehat.dto.LaundryLinonSubDeptDto;
import com.hms.ehat.dto.ProcessCsdDto;

@Repository
public class LaundryLinonServiceDaoImpl implements LaundryLinonProcessDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveOrUpdateProcessingMaster(LaundryLinonProcessDto procDto) {
		
		int val=0;
		try {
			if (procDto.getProcessId() == 0) {
				Query bet = sessionFactory
						.getCurrentSession()
						.createQuery(
								"SELECT count(*) FROM LaundryLinonProcessDto WHERE deleted='N' AND (processCode= :processCode)");
				bet.setParameter("processCode", procDto.getProcessCode());
				//bet.setParameter("shortNo", procDto.getShortNo());
				long count = (Long) bet.uniqueResult();

				if (count == 0) {
					procDto.setCreatedDate(new Date(new java.util.Date()
							.getTime()));
					sessionFactory.getCurrentSession().merge(procDto);
					val = 1;
				} else {
					val = 3;
				}
			}else
			{
				procDto.setCreatedDate(new Date(new java.util.Date()
				.getTime()));
				sessionFactory.getCurrentSession().merge(procDto);
				val = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return val;
		}
		return val;
	}

	
	@Override
	public List<LaundryLinonProcessDto> getProcessingMasterData() {
		List<LaundryLinonProcessDto> ltprocess = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinonProcessDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("processId"));
			//criteria.setMaxResults(10);
			ltprocess = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return ltprocess;
	}


	@Override
	public boolean deleteProcessyRecord(Integer processId, Integer userId) {

		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			LaundryLinonProcessDto freqDto = (LaundryLinonProcessDto) sessionFactory
					.getCurrentSession().get(LaundryLinonProcessDto.class, processId);
			freqDto.setDeleted("Y");

			freqDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			freqDto.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(tempMaster);

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return false;
		}
		return true;
			
	}


	@Override
	public int saveOrUpdateSubDeptMaster(LaundryLinonSubDeptDto subDepDto) {
		
		int val=0;
		try {
			if (subDepDto.getSubDeptId() == 0) {
				Query bet = sessionFactory
						.getCurrentSession()
						.createQuery(
								"SELECT count(*) FROM LaundryLinonSubDeptDto WHERE deleted='N' AND (subDeptCode= :subDeptCode)");
				bet.setParameter("subDeptCode", subDepDto.getSubDeptCode());
				//bet.setParameter("shortNo", procDto.getShortNo());
				long count = (Long) bet.uniqueResult();

				if (count == 0) {
					subDepDto.setCreatedDate(new Date(new java.util.Date()
							.getTime()));
					sessionFactory.getCurrentSession().merge(subDepDto);
					val = 1;
				} else {
					val = 3;
				}
			}else
			{
				subDepDto.setCreatedDate(new Date(new java.util.Date()
				.getTime()));
				sessionFactory.getCurrentSession().merge(subDepDto);
				val = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return val;
		}
		return val;
	}


	@Override
	public List<LaundryLinonSubDeptDto> getSubMasterMasterData() {
		List<LaundryLinonSubDeptDto> ltSubDep = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinonSubDeptDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("subDeptId"));
			//criteria.setMaxResults(10);
			ltSubDep = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return ltSubDep;
	}


	@Override
	public boolean deleteSubDeptRecord(Integer subDeptId, Integer userId) {

		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			LaundryLinonSubDeptDto subDto = (LaundryLinonSubDeptDto) sessionFactory
					.getCurrentSession().get(LaundryLinonSubDeptDto.class, subDeptId);
			subDto.setDeleted("Y");

			subDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			subDto.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(tempMaster);

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return false;
		}
		return true;
			
	}


	@Override
	public List<LaundryLinonProcessDto> autoSuggestionForProcess(String letter) {
		List<LaundryLinonProcessDto> ltProc = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinonProcessDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("frequencyId"));
			//criteria.add(Restrictions.like("fullName", letter + "%"));
			criteria.add(Restrictions.like("processName", letter + "%"));
			criteria.setMaxResults(10);
			ltProc = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return ltProc;
	}


	@Override
	public List<LaundryLinonSubDeptDto> autoSuggestionForSubDept(String letter) {
		List<LaundryLinonSubDeptDto> ltSub = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LaundryLinonSubDeptDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("frequencyId"));
			//criteria.add(Restrictions.like("fullName", letter + "%"));
			criteria.add(Restrictions.like("subDeptName", letter + "%"));
			criteria.setMaxResults(10);
			ltSub = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return ltSub;
	}


	@Override
	public int saveOrUpdateProcessingMasterCsd(ProcessCsdDto procDto) {
		
		int val=0;
		try {
			if (procDto.getProcessId() == 0) {
				Query bet = sessionFactory
						.getCurrentSession()
						.createQuery(
								"SELECT count(*) FROM ProcessCsdDto WHERE deleted='N' AND (processCode= :processCode)");
				bet.setParameter("processCode", procDto.getProcessCode());
				
				long count = (Long) bet.uniqueResult();

				if (count == 0) {
					procDto.setCreatedDate(new Date(new java.util.Date()
							.getTime()));
					sessionFactory.getCurrentSession().merge(procDto);
					val = 1;
				} else {
					val = 3;
				}
			}else
			{
				procDto.setCreatedDate(new Date(new java.util.Date()
				.getTime()));
				sessionFactory.getCurrentSession().merge(procDto);
				val = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return val;
		}
		return val;
	}


	@Override
	public List<ProcessCsdDto> getProcessingMasterDataCsd() {
		List<ProcessCsdDto> ltprocess = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProcessCsdDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("processId"));
			//criteria.setMaxResults(10);
			ltprocess = criteria.list();		
			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return ltprocess;
	}


	@Override
	public List<ProcessCsdDto> autoSuggestionForProcessCsd(String letter) {
		List<ProcessCsdDto> ltProc = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProcessCsdDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("frequencyId"));
			//criteria.add(Restrictions.like("fullName", letter + "%"));
			criteria.add(Restrictions.like("processName", letter + "%"));
			criteria.setMaxResults(10);
			ltProc = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return ltProc;
	}


	@Override
	public boolean deleteProcessyRecordCsd(Integer processId, Integer userId) {

		try {

			//TempMasterDto TempMaster = new TempMasterDto();

			ProcessCsdDto freqDto = (ProcessCsdDto) sessionFactory
					.getCurrentSession().get(ProcessCsdDto.class, processId);
			freqDto.setDeleted("Y");

			freqDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			freqDto.setDeletedBy(userId);

			//sessionFactory.getCurrentSession().merge(tempMaster);

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return false;
		}
		return true;
			
	}

}
