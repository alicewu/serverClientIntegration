package com.github.syqnew.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import com.github.syqnew.dao.ClientDao;
import com.github.syqnew.dao.impl.ClientDaoImpl;
import com.github.syqnew.domain.Client;

public class ClientServlet extends HttpServlet {

	// curl localhost:8080/client/?email=pandas
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setStatus(HttpServletResponse.SC_OK);
		
		ClientDao dao = new ClientDaoImpl();
		Client client = dao.findByEmail(request.getParameter("email"));
		response.getWriter().println(client.getId());
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		response.setStatus(HttpServletResponse.SC_OK);
		// adminServices.updateMarketState(request);
		ObjectMapper mapper = new ObjectMapper();
		Client client = mapper.readValue(request.getReader(), Client.class);

		ClientDao dao = new ClientDaoImpl();
		dao.persist(client);
		response.getWriter().println("POST");
	}

}