package com.hms.doctordesk.dao.impl;

import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.NotesDao;
import com.hms.doctordesk.dto.DoctorDeskCountDto;
import com.hms.doctordesk.dto.HistoryMaster;
import com.hms.doctordesk.dto.NotesDto;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.RegTreBillDto;

@SuppressWarnings("unchecked")
@Repository
public class NotesDaoImpl implements NotesDao {
	
	static Logger log=Logger.getLogger(NotesDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public String getNextNotesID(Integer treatmentId) {
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="select COUNT(*) from NotesDto WHERE treatment_id ='"+treatmentId+"' and deleted ='N' ";
		try{
		Query query=session.createQuery(hql);
		Long id = (Long) query.list().get(0);
		System.out.println("ID :"+id);
		//tx.commit();
		return new String("ID="+id);
		}
		catch(Exception e)
		{
		tx.rollback();
		session.close();
		log.error("Exception----> ",e);
		return new String("");
		}
		}
	@Override
	public int saveNotes(NotesDto notes, HttpServletRequest request) {
		try {
			sessionFactory.getCurrentSession().merge(notes);
	        return 1;
		
		} catch(Exception e) {
			log.error("Exception----> ",e);
	    }
	    return 0;
	}
	@Override
	public List<NotesDto> getAllNotes(int treatmentId) {
		List<NotesDto> lstNotes=new ArrayList<NotesDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(NotesDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatment_id", treatmentId));
			System.out.println("treatmentId="+treatmentId);
			lstNotes = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstNotes;
	}
	@Override
	public NotesDto editNotes(Integer notesId) {
		NotesDto obj=new NotesDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(NotesDto.class);
			criteria.add(Restrictions.eq("notesId", notesId));
			obj=(NotesDto) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}
	@Override
	public boolean deleteNotes(Integer notesId, Integer userId) {
		try {
			NotesDto obj=	(NotesDto)sessionFactory.getCurrentSession().get(NotesDto.class, notesId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}
	/*@Override
	public NotesDto notesCount(Integer unitid) {
		NotesDto notesDto=new NotesDto();
		
		try {
			String hql="select COUNT(*) from NotesDto WHERE deleted= 'N'";
			Query query=sessionFactory.getCurrentSession().createSQLQuery(hql);
				  query.setParameter(0, unitid);
			BigInteger countnotes=(BigInteger) query.uniqueResult();
			  long longValuenotes = countnotes.longValue(); 
			  notesDto.setCountNotes(longValuenotes);
		}
		catch(Exception e)	
		{
			e.printStackTrace();
	log.error("Exception ..> ", e);
	}
		return notesDto;
	}
	*/
	@Override
	public String getNextNotesID() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<NotesDto> getAllNotesCount(int patientId) {
		List<NotesDto> lstNotes=new ArrayList<NotesDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(NotesDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("patientId", patientId));
			System.out.println("patientId="+patientId);
			lstNotes = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstNotes;
	}
	@Override
	public List<NotesDto> viewNotesById(int treatmentId, int notesId) {
		List<NotesDto> lstNotes=new ArrayList<NotesDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(NotesDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatment_id", treatmentId));
			criteria.add(Restrictions.eq("notesId", notesId));
			System.out.println("notesId="+notesId);
			lstNotes = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstNotes;
	}
	
}

