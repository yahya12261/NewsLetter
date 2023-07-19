CREATE TABLE Image (
    imgId bigint AUTO_INCREMENT PRIMARY key ,
    imageLink text ,
    imgsize int ,
    imgExt varchar(8)
    );
	
	
	CREATE TABLE Person
	( personId bigint AUTO_INCREMENT , 
	firstName varchar(25) ,
	middleName varchar(25) ,
	lastName varchar(25) ,
	Dob datetime ,
	DateOfCreated datetime,
	imgId bigint,
	PRIMARY Key(personId), 
	FOREIGN KEY (imgId) REFERENCES Image(imgId) );
	
	
	CREATE TABLE Account
 ( accountId bigint AUTO_INCREMENT ,
 personId bigint ,
 Pass varchar(30) ,
 lastLogin datetime ,
 Email varchar(30) ,
 DateOfCreated datetime,
 PRIMARY Key(accountId),
 FOREIGN KEY (personId) REFERENCES Person(personId) );
 
 CREATE TABLE Post (
    postId bigint AUTO_INCREMENT ,
    Paragraph text ,
    DateOfCreated datetime,
    imgId bigint ,
    PRIMARY Key(postId),
    FOREIGN KEY (imgId) REFERENCES Image(imgId)
    )
CREATE TABLE Comments (
    personId bigint ,
    commentContent text,
    postId bigint,
    FOREIGN KEY (personId) REFERENCES Person(personId),
    FOREIGN KEY (postId) REFERENCES Post(postId)
    );
	
	CREATE TABLE Likes (
   personId bigint , 
    postId bigint,
     FOREIGN KEY (personId) REFERENCES Person(personId),
       FOREIGN KEY (postId) REFERENCES Post(postId)
  
    )