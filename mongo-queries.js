'use strict';


//1.
db.notes.find();
//2.
db.notes.find().pretty();
//3.
db.notes.find({}, {title:1,content:1});
//4.
db.notes.find({}, {_id:0, title:1,content:1});
//5.Write a MongoDB query to display only the title field for all the documents in the collection notes and sort the results by _id in descending order.
db.notes.find({}, {title:1}).sort({_id:-1});

//6.  Display all the documents from the collection notes which contain the title '5 life lessons learned from cats'.
db.notes.find({
  title: {$regex: /5 life lessons learned from cats/}
});
//7.Write a MongoDB query to display the first 5 documents from the collection notes.
db.notes.find().
  sort({_id:1}).   //or use $natural : 1 if you want 'natural' internal mongo order
  limit(5).pretty();

//8.Write a MongoDB query to display the next 5 documents from the collection notes after skipping the first 5.

db.notes.find().
  skip(5).
  sort({_id:1}).  //or use $natural : 1 if you want 'natural' internal mongo order
  limit(5).pretty();

//9.Write a MongoDB query to display the total number of documents in the collection notes.

db.notes.find().count();

//10.Write a MongoDB query to display the documents from the collection notes which have an _id that is greater than "000000000000000000000007".

db.notes.find ({ _id : { $gt : '000000000000000000000007' } });

//11. Write a MongoDB query to display the documents from the collection notes which have an _id which is greater than or equal to "000000000000000000000009" but less than or equal to "000000000000000000000017".

db.notes.find( {_id : {$gte: '000000000000000000000007', $lte: '000000000000000000000017' }});

//12. 
db.notes.find( {_id: {$lte: '000000000000000000000007' }});

//13

db.notes.findOne();

//14. 

db.notes.findOne({},{_id:0, title:1});

//15.

db.notes.findOne({},{title:1});

//16.insert one document into the collection notes. 

db.notes.
  insert({   
    title: 'Mister pants feels good all over',
    content: 'All the Time. Visit misterpants.com For More Fun!'
  });
  
//17.MongoDB query to insert two note documents into the collection notes
db.notes.
  insertMany([
    { title: '5 Great Tips for No Hair', content: 'Just Kidding!!'},
    { title: '666 Things About Heaven', content: 'Heaven is a place on Earth'},
  ]);

//18. modify the title and content fields of the document from the collection notes with _id "000000000000000000000003". 

db.notes.
  update(
    {_id:'000000000000000000000006'},
    { $set: {title:'A QUICK UPDATE!', content: 'A QUICK CONTENT UPDATE'}} 
  );

//19. Write a MongoDB query to modify only the title field of the document from the collection notes with _id "000000000000000000000007


db.notes.
  update(
    {_id:'000000000000000000000007'},
    { $set: {title:'JAMES BOND 00000000007'}} 
  );

//20. greater than "000000000000000000000014

db.notes.
  update(
    { _id : { $gt : '000000000000000000000014' }},
    { $set: {title: 'the best cat the the than 14', content: 'Very Coool'}},
    {multi:true}
  );

//21. remove only the title field from the document in the collection notes with _id "000000000000000000000008".

db.notes.update(
  {_id: '000000000000000000000008'},
  { $unset: { title:''}}
);

//22.o remove the content fields from all documents in the collection notes with _id less than or equal to "000000000000000000000006"

db.notes.update(
  {_id: {$lte: '000000000000000000000006'}},
  {$unset: {content:''}},
  {multi:true}
);

//23. _id less than or equal to "000000000000000000000003".

db.notes.update(
  {_id: {$lte:'000000000000000000000003' }},
  {$unset: {title:''}},
  {multi:true}
);

//24.  remove the document from the collection notes that has an _id "000000000000000000000017"

db.notes.deleteOne(
  {_id: '000000000000000000000017' }
);

//25. remove documents with an _id which is not less than "000000000000000000000018".

db.notes.deleteMany(
  {_id : {$gt : '000000000000000000000018'}}
);

//26.remove the documents from the collection notes that have an _id which is greater than or equal to "000000000000000000000013" and contain the string 'dogs' in the title

db.notes.deleteMany(
  { _id: {$gte: '000000000000000000000013'}, title: {$regex: /dogs/}}
);

//27.   Display all the documents from the collection notes which do not have a title field

db.notes.find(
  { title : {$exists:false}  }
);

//28. remove all the documents from the collection notes which contain the string 'cat' in the title but not the string 'the'.

db.notes.deleteMany(
  { $and: [ {title: {$regex: /cat/}}, { title: {$not: /the/}}] } 
).pretty();

//29.Display all the documents from the collection notes that have a title field which does not contain the string 'dogs' and does contain a title field.
db.notes.find(
  { $and:[ {title :{$exists:true}},  {title: {$not:/dogs/}} ], } 
).pretty();

