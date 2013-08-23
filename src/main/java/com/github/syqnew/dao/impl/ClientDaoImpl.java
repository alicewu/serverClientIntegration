package com.github.syqnew.dao.impl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.github.syqnew.HibernateUtil;
import com.github.syqnew.dao.ClientDao;
import com.github.syqnew.domain.Client;

public class ClientDaoImpl extends BaseDaoImpl<Client> implements ClientDao {
	
	public ClientDaoImpl() {
		super(Client.class);
	}

	public Client findByEmail(String email) {
		// TODO Auto-generated method stub
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session session = sf.openSession();
		
		Query query = session.createQuery("from " + Client.class.getName() + " where email = :email");
        query.setParameter("email", email);
        Client client = (Client) query.list().get(0);
		
		session.close();
		return client;
	}

}
