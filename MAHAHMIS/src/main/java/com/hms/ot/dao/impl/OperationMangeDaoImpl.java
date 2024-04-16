package com.hms.ot.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ot.dao.OperationMangeDao;
import com.hms.ot.dto.OperationTypeTbl;

@Repository
public class OperationMangeDaoImpl implements OperationMangeDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@SuppressWarnings("unchecked")
	public List<OperationTypeTbl> fetchOperationType(String letter) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationTypeTbl.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.like("name", "%"+letter+"%"));
		List<OperationTypeTbl> list = criteria.list();
		return list;
	}

	@Override
	public String saveoperationType(OperationTypeTbl obj) {
		String res="";
		Session session = sessionFactory.openSession(); //create session object from the session factory
		session.beginTransaction();
		if (obj.getIdoperationTypeTbl() > 0) {
			OperationTypeTbl op = (OperationTypeTbl) sessionFactory
					.getCurrentSession().get(OperationTypeTbl.class, obj.getIdoperationTypeTbl());
			op.setStatus("Y");
			op.setName(obj.getName());
			res="Operation type updated successfully";
		}else {
			obj.setStatus("Y");
			session.save(obj);
			res="Operation type saved successfully";
		}
		session.getTransaction().commit(); //commit the transaction
		session.close();
		return res;
	}

	@Override
	public String deletePT(int pTId) {
		OperationTypeTbl object = (OperationTypeTbl) sessionFactory.getCurrentSession().get(OperationTypeTbl.class,pTId);
		object.setStatus("N");
		return "Procedure Type is deleted Successfully.";
	}
}
