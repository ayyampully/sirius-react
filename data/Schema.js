"use strict";
module.exports = function(mongoose, _) {
	
	var crypto = require('crypto');

	var UserSchema = new mongoose.Schema({
		uid : Number,
		login : String,
		name : {
			first: String,
			last: String
		},
		role: String,
		about : String,
		projects: [{
			projectid: Number,
			title: String,
			joineddate: Date,
			role: String
		}],
		tickets: [{
			ticketid: String,
			title: String,
			role: String
		}],
		watchlist: [{
			ticketid: String,
			title: String
		}],
		icon : String
	});
	var ProjectSchema = new mongoose.Schema({
		title : {type:String, unique:true},
		projectid : Number,
		flagurl : String,
		created : Date,
		modules : [ 
			{
				label : String,
				count : Number
			}
		],
		tags : Array,
		owner : {
			uid : Number,
			login : String,
			name : String
		},
		coowner : String,
		team : [{
			uid: Number,
			login: String,
			name: {
				first: String,
				last: String
			},
		}],
		description : String
	});
	var TicketsSchema = new mongoose.Schema({
			title: String,
			ticketid: String,
			project: {
				id: Number,
				title: String,
				icon: String
			},
			createddate: Date,
			modifiedddate: Date,
			createdby:{
				uid: Number,
				login: String,
				name: String
			},
			assignedto:{
				uid: Number,
				login: String,
				name: String
			},
			status: String,
			type: String,
			priority: String,
			watchers:[{
				uid: Number,
				login: String,
				name: {
					first: String,
					last: String
				},
			}],
			attachments: Array,
			subtickets: Array,
			tags: Array,
			description: String,
			comments: [{
				message: String,
				createddate: Date,
				createdby:{
					uid: Number,
					login: String,
					name: String
				}
			}]
	})
	
	var Projects = mongoose.model('Projects', ProjectSchema),
		Tickets = mongoose.model('Tickets', TicketsSchema),
		Users = mongoose.model('Users', UserSchema),
		publicAPI = {};
	
	publicAPI.getProjects = function(callback) {
		var user = Projects.find(function findProjects(err, projects){
			if (err) {
				// No valid user
				callback(false);
			} else {
				
				callback(projects);
			}
		});
	};
	
	publicAPI.getProjectDetails = function(projectid, callback, isOverview) {
		/* var kk = new Projects(projectid)
		kk.save(function(e,s){
			if (e) console.log(e) 
			console.log('added')
		}) */
		var project = Projects.find({projectid:projectid}, function (err, projects){
			if (err) {
				// No valid user
				callback(false);
			} else {
				if(!projects || !projects.length){
					callback([]);
					return;
				}
				if(isOverview){
					var pdata = projects[0], fDone = 0, fProgress = 0, fPending = 0, fTotal = 0,
						bDone = 0, bProgress = 0, bPending = 0, bTotal = 0;
					
					Tickets.find({'project.id':projectid}, function (err, tickets){
						if (err) {
							// No valid user
							callback(false);
						} else {
							tickets.forEach((data, i)=>{
								let status = data.status;
								if(data.type == "feature"){
									if(status == "completed"){
										fDone++
									}else if(status == "progress"){
										fProgress++
									} else {fPending++}
									fTotal++
								}else{
									if(status == "completed"){
										bDone++
									}else if(status == "progress"){
										bProgress++
									} else {bPending++}
									bTotal++
								}
							})
							
							var dataRequired = {
								"title": pdata.title,
								"projectid": pdata.projectid,
								"flagurl": pdata.flagurl,
								"year": pdata.year,
								"features": {
									"label":"Features",
									"data":[{"label":"Completed","count":fDone}, {"label":"In progress","count":fProgress}, {"label":"Pending","count":fPending}],
									"total":fTotal
								},
								"bugs": {
									"label":"Bugs",
									"data":[{"label":"Completed","count":bDone}, {"label":"In progress","count":bProgress}, {"label":"Pending","count":bPending}],
									"total":bTotal
								},
								"owner": pdata.owner,
								"coowner": pdata.coowner,
								"team": pdata.team,
								"description": pdata.description
							}
							
							
							
							callback(dataRequired);
						}
					})
				} else {
					callback(projects[0]);
				}
				
			}
		 });
	};
	
	publicAPI.getTicketsList = function(projectid, callback){
		this.getProjectDetails(projectid,(data)=>{
			Tickets.find({'project.id':projectid}, 'title ticketid modifiedddate createdby assignedto status priority', function findProjects(err, tickets){
				if (err) {
					// No tickets
					callback(false);
				} else {
					var ticketExd = {
						"title": data.title,
						"owner": data.owner,
						"module": data.module,
						"projectid": data.projectid,
						"tickets": tickets
					};

					callback(ticketExd);
				}
			})
		
		},false);
		
	}
	
	publicAPI.getTicketDetails = function(ticketid, projectid, callback){
		//this.getProjectDetails(projectid,(data)=>{
			Tickets.find({'ticketid':ticketid, 'project.id':projectid}, function findTicketDetails(err, ticket){
				if (err) {
					// No tickets
					callback(false);
				} else {
					
					//var extended = _.concat(data, ...ticketExd);
					callback(ticket[0]);
				}
			})
		
		//},false);
		
	}
	
	publicAPI.updateTicket = function(ticketid, ticketupdate, callback){
		
		Tickets.findOne({'ticketid':ticketid}, function findTicket(err, ticket){
				if (err) {
					// No tickets
					
					callback(false);
				} else {
					ticket.title = ticketupdate.title;
					ticket.description = ticketupdate.description;
					ticket.modifiedddate = new Date();
					
					ticket.save(()=>{
						callback({data:{status:200, message:"Updated ticket"}});
					})
					//var extended = _.concat(data, ...ticketExd);
					
				}
			}) 
		
		/* Tickets.update({'ticketid':ticketid}, ticketupdate, function (err, ticket){
				if (err) {
					// No tickets
					callback(false);
				} else {
					ticket = ticketupdate;
					ticket.save(data=>{
						callback(data);
					})
					//var extended = _.concat(data, ...ticketExd);
					
				}
			}) */
		
	}
	var userObj = [{},{login:"rohith.ayyampully@gmail.com",name:"Ayyampully, Rohith",uid:1}]
	publicAPI.addComment = (commentObj, callback)=>{
		var activeUser = userObj[commentObj.activeUser];
		
		Tickets.findOne({'ticketid':commentObj.ticketid}, function (err, ticket){
			if (err) {
				// No tickets
				
				callback(false);
			} else {
				let newComment = {
					message: commentObj.comment,
					createddate: new Date(),
					createdby: activeUser
				};
				ticket.comments.push(newComment);
				ticket.modifiedddate = new Date();
				
				ticket.save(()=>{
					callback({data:{status:200, message:"Updated ticket", comment:newComment}});
				})
				//var extended = _.concat(data, ...ticketExd);
				
			}
		})
	}
	publicAPI.getUsersList = (query, callback)=>{
		var regex = new RegExp(query, 'ig');
		
		var query = Users.find();

		// this allows you to continue applying modifiers to it
		query.sort('uid');
		query.select('uid login name icon');

		// you can chain them together as well
		// a full list of methods can be found:
		// http://mongoosejs.com/docs/api.html#query-js
		query.or({$or:[{ 'name.first': regex}, { 'name.last': regex}]});

		// finally, when ready to execute the query, call the exec() function
		query.exec(function(err, results) {
		  if (err) {
				// No users
				callback(false);
			} else {
				
				callback(results)			
			}
		});
		
		/* Users.find({}, 'uid login name icon',function findUsers(err, users){
			if (err) {
				// No users
				callback(false);
			} else {
				
				callback(users)			
			}
		}) */
	}
	publicAPI.saveUser = (callback)=>{
		var user = {
			"uid" : 2,
			"login" : "porsche.carrera@abc.com",
			"name" :{ 
				"first":"Porsche",
				"last":"Carrera"
			},
			"role": "Front end developer",
			"about" : "A seriously fast guy.",
			"projects": [{
				"projectid": 1,
				"title": "Demigod v1.0.0",
				"joineddate": new Date("06/30/2016"),
				"role": "member"
			}],
			"tickets": [{
				"ticketid": "DEMIGOD-01",
				"title": "Please add the thumbnail for users",
			}],
			"watchlist": [{
				"ticketid": "DEMIGOD-01",
				"title": "Please add the thumbnail for users",
			}]
		}
		
		var icon = user.name.first.charAt(0)+user.name.last.charAt(0)
	user.icon = icon;
		
		// var kk = new Users(user)
		// kk.save(function(e,s){
		// 	if (e) console.log(e) 
		// 	console.log('added')
		// 	callback(true)
		// })
	// 	var ticket = {
	// 		title: "some page",
	// 		ticketid: "DEMIGOD-09",
	// 		project: {
	// 			id: 1,
	// 			title: "DEMIGOD",
	// 			icon: "D"
	// 		},
	// 		createddate: new Date(),
	// 		modifiedddate: new Date(),
	// 		createdby:{
	// 			uid: 1,
	// 			login: "rohith.ayyampully@gmail.com",
	// 			name: "Rohith Ayyampully"
	// 		},
	// 		assignedto:{},
	// 		status: "open",
	// 		type: "bug",
	// 		priority: "medium",
	// 		watchers:[{
	// 			uid: 1,
	// 			login: "rohith.ayyampully@gmail.com",
	// 			name: "Rohith Ayyampully"
	// 		}],
	// 		attachments: [],
	// 		subtickets: [],
	// 		tags: ['Array'],
	// 		description: "This is the description of a demigod ticket. blah blah.",
	// 		comments: [{
	// 			message: "Someone going crazy",
	// 			createddate: new Date(),
	// 			createdby:{
	// 			uid: 1,
	// 			login: "rohith.ayyampully@gmail.com",
	// 			name: "Rohith Ayyampully"
	// 		}
	// 		}]
	// }


var kk = new Users(user)
		kk.save(function(e,s){
			if (e) console.log(e) 
			console.log('added')
			callback(true)
})


	}
	return publicAPI;
}