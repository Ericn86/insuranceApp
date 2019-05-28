InsuranceManager = function(app) {

	const clientsData = require('./data/clients.js');
    const policiesData = require('./data/policies.js');
	var clients = [];
	var policies = [];
	
	// get client data by Id
	app.get("/clients/id/:id", function (req, res) {
		var id = req.params.id;
		clients = [];
		for (i = 0; i <= clientsData.length-1; i++) {
			if (clientsData[i].id === id) {
				clients.push(clientsData[i]);
			}
		};
		if (isAdminorUser(clients)) {
			res.status(200).send(clients);  
		}else{
			res.status(200).send('Not Authorized');
		}
    });
	
	// get client data by  name
	app.get("/clients/name/:name", function (req, res) {
		var name = req.params.name;
		clients = [];
		for (i = 0; i <= clientsData.length-1; i++) {
			if (clientsData[i].name === name) {
				clients.push(clientsData[i]);
			}
		};		
		if (isAdminorUser(clients)) {
			res.status(200).send(clients);  
		}else{
			res.status(200).send('Not Authorized');
		}
    });
	
	// get policies by client username
	app.get("/policies/clients/:username", function (req, res) {
		var username = req.params.username;
		clients = [];
		policies = [];
		for (i = 0; i <= clientsData.length-1; i++) {
			if (clientsData[i].name === username) {
				clients.push(clientsData[i]);
			}
		};
		for (i = 0; i <= policiesData.length-1; i++) {
			if (clients.length > 0) {
				if (policiesData[i].clientId === clients[0].id) {
					policies.push(policiesData[i]);
				}
			}
		};
		if (isAdmin(clients)) {
			res.status(200).send(policies);  
		}else{
			res.status(200).send('Not Authorized');
		}
    });
	
	// get client by policy n?
	app.get("/policies/:id", function (req, res) {
		var id = req.params.id;
		clients = [];
		policies = [];
		for (i = 0; i <= policiesData.length-1; i++) {
			if (policiesData[i].id === id) {
				policies.push(policiesData[i]);
			}
		};
		if (policies.length>0){
			for (i = 0; i <= clientsData.length-1; i++) {
				if (clientsData[i].id === policies[0].clientId) {
					clients.push(clientsData[i]);
				}
			};	
		}
		if (isAdmin(clients)) {
			res.status(200).send(clients[0]);  
		}else{
			res.status(200).send('Not Authorized');
		} 
    });
	
	
	// auxiliary functions
	function isAdminorUser(clients) {
		for (i = 0; i <= clients.length-1; i++) {
			if (clients[i].role === 'admin' || clients[i].role === 'user') {
				return true;
			}
		};
		return false;
	}
	
	function isAdmin(clients) {
		for (i = 0; i <= clients.length-1; i++) {
			if (clients[i].role === 'admin') {
				return true;
			}
		};
		return false;
	}
	
}
exports.InsuranceManager = InsuranceManager;