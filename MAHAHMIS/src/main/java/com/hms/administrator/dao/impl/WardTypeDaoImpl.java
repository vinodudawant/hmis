package com.hms.administrator.dao.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.WardTypeDao;
import com.hms.administrator.dto.BedStatus;
import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HallManagementDto;
import com.hms.administrator.dto.HallType;
import com.hms.dto.HallTypeCharges;
import com.hms.ehat.dto.ChargesMasterSlave;
@Repository
public class WardTypeDaoImpl implements WardTypeDao{


	@Autowired
	SessionFactory sessionFactory;
	@Override
	public List<BedStatus> fetchipdbedstatus() {
		List<BedStatus> list = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BedStatus.class);
			criteria.add(Restrictions.eq("bedStateStatus", "Y"));
			list = criteria.list();
		} catch (Exception e) {
			e.getMessage();
		}
		return list;
	}

	@Override
	public List<ChargesMasterSlave> fetchWordTypeList(Integer id) {
		List<Object[]> list = null;
		List<ChargesMasterSlave> li = new ArrayList<>();
		try {

			Criteria crit = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			ProjectionList projList = Projections.projectionList();
			crit.add(Restrictions.eq("isCategory", "Y"));
			crit.add(Restrictions.eq("deleted", "N"));
			crit.add(Restrictions.eq("chargesMasterDto", 2));
			crit.add(Restrictions.eq("selfId", 0));
			crit.addOrder(Order.desc("slaveId"));
			projList.add(Projections.property("slaveId").as("slaveId"));
			projList.add(Projections.property("categoryName").as("categoryName"));
			crit.setProjection(projList);
			list = crit.list();

			for (Object[] obj : list) {
				ChargesMasterSlave salve = new ChargesMasterSlave();
				salve.setSlaveId((int) obj[0]);
				salve.setCategoryName((String) obj[1]);
				li.add(salve);

			}
			return li;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return li;
	}

	@Override
	public String saveHallTypeCharges(HallType halltype, List<HallTypeCharges> list) {
		Session session = sessionFactory.getCurrentSession();
		String str = "";
		try {
			if (halltype.getIdhall_type() == 0) {
				Criteria c = sessionFactory.getCurrentSession().createCriteria(HallType.class);
				c.add(Restrictions.eq("hall_type_name", halltype.getHall_type_name()));
				c.add(Restrictions.eq("deleted","N"));
				c.setProjection(Projections.rowCount());
				Long count = (Long) c.uniqueResult();
				if (count == 0) {
					halltype.setStatus("Y");
					halltype.setCreatedDate(new Date());
					Serializable id = session.save(halltype);
					Integer ll = (Integer) id;
					if (ll > 0) {
						for (HallTypeCharges obj : list) {
							obj.setIdhall_type(ll);
							obj.setHall_type_charges_id(0);
							session.save(obj);
						}

					}

					str = "Save successfuly.";
				} else {
					str = "Already HallType Register charges.";
				}
			} else {
				halltype.setStatus("Y");
				halltype.setUpdatedBy(halltype.getCreatedBy());
				halltype.setUpdatedDate(new Date());
				session.merge(halltype);
				for (HallTypeCharges htc : list) {
					htc.setIdhall_type(halltype.getIdhall_type());
					htc.setUpdatedBy(halltype.getCreatedBy());
					htc.setUpdatedDate(new Date());
					htc.setHall_type_charges_id(0);
					session.merge(htc);
				}

				str = "Update successfuly.";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return str;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<HallType> fetchHallTypeCharges(String name) {
		List<HallType> list = null;
		try {
			if (name.isEmpty()) {

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HallType.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				list = criteria.list();
				System.err.println("list size..." + list.size());
			} else {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HallType.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.like("hall_type_name", name, MatchMode.ANYWHERE));
				list = criteria.list();
				System.err.println("list ..." + list);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public Integer deleteHallType(Integer id, Integer userid) {
		Session session = sessionFactory.getCurrentSession();
		try {
			HallType hallType = (HallType) sessionFactory.getCurrentSession().get(HallType.class, id);
			hallType.setDeleted("Y");
			hallType.setDeletedDate(new Date(new java.util.Date().getTime()));
			hallType.setDeletedBy(userid);
			session.merge(hallType);

			String hql = "update HallTypeCharges htc set htc.deleted ='Y' where htc.idhall_type=:idhall_type";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("idhall_type", id);
			query.executeUpdate();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public HallType updateHallTypeId(Integer id) {
		HallType hallType = null;
		List<HallTypeCharges> list = null;

		try {
			String hql = "from HallType ht where ht.deleted='N' and ht.idhall_type=:idhall_type";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("idhall_type", id);
			hallType = (HallType) query.uniqueResult();
			String hql1 = "from HallTypeCharges htc where htc.deleted='N' and htc.idhall_type=:idhall_type";
			Query query1 = sessionFactory.getCurrentSession().createQuery(hql1);
			query1.setParameter("idhall_type", id);
			list = query1.list();
			hallType.setListHallTypeCharges(list);
			System.err.println(hallType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hallType;
	}

	@Override
	public List<ChargesMasterSlave> fetchWardName() {

		List<ChargesMasterSlave> list = new ArrayList<>();
		List<Object[]> obj = null;
		try {
			Criteria crit = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			ProjectionList projList = Projections.projectionList();
			crit.add(Restrictions.eq("isCategory", "N"));
			crit.add(Restrictions.eq("deleted", "N"));
			crit.add(Restrictions.eq("chargesMasterDto", 2));
			crit.add(Restrictions.ge("selfId", 0));
			crit.addOrder(Order.desc("slaveId"));
			projList.add(Projections.property("slaveId").as("slaveId"));
			projList.add(Projections.property("categoryName").as("categoryName"));
			projList.add(Projections.property("selfId").as("selfId"));
			crit.setProjection(projList);
			obj = crit.list();
			for (Object[] o : obj) {
				ChargesMasterSlave salve = new ChargesMasterSlave();
				salve.setSlaveId((int) o[0]);
				salve.setCategoryName((String) o[1]);
				salve.setSelfId((Integer) o[2]);
				list.add(salve);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<ChargesMasterSlave> fetchHallName() {
		List<ChargesMasterSlave> list = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("selfId", 0));
			list = criteria.list();
			System.err.println("list" + list);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public Integer saveHallInformation(HallManagementDto hall, List<Beds> list) {
		try {

			if (hall.getHall() == 0) {
				Criteria c = sessionFactory.getCurrentSession().createCriteria(HallManagementDto.class);
				c.add(Restrictions.eq("hallName", hall.getHallName()));
				c.add(Restrictions.eq("deleted", "N"));
				c.setProjection(Projections.rowCount());
				Long count = (Long) c.uniqueResult();
				if (count <= 0) {
					hall.setCreatedDate(new Date());
					Integer id =  (Integer) sessionFactory.getCurrentSession().save(hall);

					if (id > 0) {
						for (Beds b : list) {
							b.setHall_ID(id);
							 sessionFactory.getCurrentSession().merge(b);
						}
					}
					return 1;
				}
				return -1;
			} else {
				/*
				 * String hql = "delete from Beds b where b.hall_ID= :hall_ID"; Query query =
				 * session.createQuery(hql); query.setParameter("hall_ID", hall.getHall());
				 * query.executeUpdate();
				 */

				
				/*
				 * Query itemInfo = sessionFactory .getCurrentSession().
				 * createSQLQuery("update beds set deleted='Y',status='N',updated_date_time=now(),updated_by="
				 * +hall.getCreatedBy()+" where Hall_ID ="+hall.getHall()+" ");
				 * 
				 * itemInfo.executeUpdate();
				 * 
				 * 
				 * hall.setUpdatedBy(hall.getCreatedBy()); hall.setUpdatedDate(new Date());
				 * session.merge(hall); for (Beds b : list) {
				 * b.setUpdatedBy(hall.getCreatedBy()); b.setUpdatedDate(new Date());
				 * session.merge(b); }
				 */
				sessionFactory.getCurrentSession().merge(hall);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	@Override
	public List<HallManagementDto> fetchHallInfo() {
		List<HallManagementDto> list = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HallManagementDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			list = criteria.list();
		} catch (Exception e) {

			e.printStackTrace();
		}
		return list;
	}

	@Override
	public HallManagementDto editHallType(Integer hall_id) {
		HallManagementDto hall = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HallManagementDto.class);
			criteria.add(Restrictions.eq("hall", hall_id));
			criteria.add(Restrictions.eq("deleted", "N"));
			hall = (HallManagementDto) criteria.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
		}
		return hall;
	}

	@Override
	public HallManagementDto addHallType(Integer id) {
		HallManagementDto hall = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HallManagementDto.class);
			criteria.add(Restrictions.eq("hall", id));
			criteria.add(Restrictions.eq("deleted", "N"));
			hall = (HallManagementDto) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return hall;
	}

	@Override
	public Integer addBedHallType(List<Beds> list, HallManagementDto hall) {
		Session session = sessionFactory.getCurrentSession();
		try {
			HallManagementDto hallType = (HallManagementDto) sessionFactory.getCurrentSession()
					.get(HallManagementDto.class, hall.getHall());
			hallType.setNumberOfBed(hall.getNumberOfBed());
			hallType.setDeletedDate(new Date());
			hallType.setDeletedBy(hall.getCreatedBy());
			session.merge(hallType);

			String hql = "delete from Beds b where b.hall_ID= :hall_ID";
			Query query = session.createQuery(hql);
			query.setParameter("hall_ID", hall.getHall());
			query.executeUpdate();

			for (Beds b : list) {
				session.merge(b);
			}

			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public Integer deleteHallType(HallManagementDto hall) {
		Session session = sessionFactory.getCurrentSession();
		try {
			HallManagementDto hallType = (HallManagementDto) sessionFactory.getCurrentSession()
					.get(HallManagementDto.class, hall.getHall());
			hallType.setDeleted("Y");
			hallType.setDeletedBy(hall.getDeletedBy());
			hallType.setDeletedDate(new Date());
			session.merge(hallType);

			String hql = "update Beds h set h.deleted ='Y',h.deletedBy=:deletedBy,h.deletedDate=:deletedDate where h.hall_ID=:hall_ID";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("hall_ID", hall.getHall());
			query.setParameter("deletedBy", hall.getDeletedBy());
			query.setParameter("deletedDate", new Date());
			query.executeUpdate();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<Beds> deleteHallbeds(Integer id) {

		List<Beds> beds = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Beds.class);
			criteria.add(Restrictions.eq("hall_ID", id));
			criteria.add(Restrictions.eq("deleted", "N"));
		//	criteria.add(Restrictions.ne("bedstate", "3"));
			beds = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return beds;
	}

	@Override
	public Integer deletebedhalladmin(Beds beds) {
		Session session = sessionFactory.getCurrentSession();
		try {
			Beds hallType = (Beds) sessionFactory.getCurrentSession().get(Beds.class, beds.getBed_ID());
			hallType.setDeleted("Y");
			hallType.setStatus("N");
			hallType.setDeletedBy(beds.getDeletedBy());
			hallType.setDeletedDate(new Date());
			Beds bed = (Beds) session.merge(hallType);
			if (bed != null) {

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HallManagementDto.class);
				criteria.add(Restrictions.eq("hall", beds.getHall_ID()));
				HallManagementDto hallmanagementdto = (HallManagementDto) criteria.uniqueResult();
				int count = Integer.parseInt(hallmanagementdto.getNumberOfBed());
				Integer total = count - 1;
				String totalbed = Integer.toString(total);
				HallManagementDto b = (HallManagementDto) sessionFactory.getCurrentSession()
						.get(HallManagementDto.class, beds.getHall_ID());
				b.setHall(beds.getHall_ID());
				b.setNumberOfBed(totalbed);
				session.merge(b);
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int addbedInHall(Integer hallId, Integer numberOfBed, Integer numberofbed) {
	
		Integer totalBed=numberOfBed+numberofbed;
		
		try {
			String sql="update  HallManagementDto set numberOfBed="+totalBed+" where hall=:hall";
			Query query=sessionFactory.getCurrentSession().createQuery(sql);
			query.setParameter("hall", hallId);
			query.executeUpdate();
			
			Criteria c = sessionFactory.getCurrentSession().createCriteria(Beds.class);
			c.add(Restrictions.eq("hall_ID",hallId));
			
			c.setProjection(Projections.rowCount());
			Long count = (Long) c.uniqueResult();

			System.err.println("count..........."+count);
			for(int i=1;i<=numberOfBed;i++) {
				Beds obj =new Beds();
				count=count+1;
				
				obj.setBed_ID(0);
				obj.setHall_ID(hallId);
				obj.setBed_name(Long.toString(count));
				obj.setStatus("Y");
				obj.setAvailability("Y");
				obj.setBedstate("4");
				sessionFactory.getCurrentSession().merge(obj);
			}
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveBedState(BedStatus obj) {
		try {
			  if(obj.getIdbedState() == 0) {
				  sessionFactory.getCurrentSession().merge(obj);
				  return 1;
			  }else {
				  sessionFactory.getCurrentSession().merge(obj);
				  return 2;
			  }
		}catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public BedStatus editBedState(Integer idbedState) {
		BedStatus obj =new BedStatus();
		try {
			 obj =(BedStatus) sessionFactory.getCurrentSession().get(BedStatus.class, idbedState);
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteBedState(Integer idbedState) {
		String sql="";
		try {
			sql="UPDATE BedStatus set bedStateStatus='N' where idbedState =:idbedState";
			Query query =sessionFactory.getCurrentSession().createQuery(sql);
			query.setParameter("idbedState", idbedState);
			query.executeUpdate();
			return 1;
		}catch(Exception e) {
			
		}
		return 0;
	}

}
