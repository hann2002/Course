

from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, Time
from sqlalchemy.ext.declarative import declarative_base

# create engine
engine = create_engine('sqlite:///example.db', echo=True)

# create base class
Base = declarative_base()

"""
# define a table
class User(Base):
    __tablename__ = 'users'
    email = Column(String, primary_key = True)
    password = Column(String, primary_key = True)
    name = Column(String)
    number = Column(String)
    active = Column(Boolean)

# donation log
class Donator(Base):
   __tablename__ = 'donator'
   email = Column(String, primary_key = True)
   donated_at = Column(DateTime, primary_key = True)
   money = Column(Integer)

"""

import uuid

from sqlalchemy import Column, String, Integer, Boolean, DateTime, Float



#For Games
class Questions(Base):
    __tablename__ = "questions"

    question_id = Column(String, primary_key=True, index=True)
    question_name = Column(String)
    option_1 = Column(String)
    option_2 = Column(String)
    option_3 = Column(String)
    option_4 = Column(String)
    answer = Column(Integer)

class Scores(Base):
    __tablename__ = "scores"
    name = Column(String, primary_key=True, index=True)
    total_stars = Column(Integer)
    submit_time = Column(Integer)
    highest_score = Column(Integer)



#For User and Donater
class User(Base):
    __tablename__ = 'users'
    email = Column(String, primary_key = True)
    password = Column(String, primary_key = True)
    name = Column(String)
    number = Column(String)
    active = Column(Boolean)

# donation log
class Donator(Base):
   __tablename__ = 'donator'
   email = Column(String, primary_key = True)
   donated_at = Column(DateTime, primary_key = True)
   money = Column(Integer)

#For Race
class Race_User(Base):
    __tablename__ = "race_users"
    id = Column(String, primary_key=True, index=True)
    plastic = Column(Float, index=True)
    meat = Column(Float, index=True)
    trans = Column(Float, index=True)
    dish = Column(Float, index=True)
    # __tablename__ = "race_users"
    # id = Column(Integer, primary_key=True, index=True)
    # plastic = Column(Integer, index=True)
    # meat = Column(Integer, index=True)
    # trans = Column(Integer, index=True)
    # dish = Column(Integer, index=True)


#For Comments

class Comments1(Base):
    __tablename__ = "comments1_table"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    comment = Column(String, index=True)

class Comments2(Base):
    __tablename__ = "comments2_table"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    comment = Column(String, index=True)

class Comments3(Base):
    __tablename__ = "comments3_table"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    comment = Column(String, index=True)

class Comments4(Base):
    __tablename__ = "comments4_table"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    comment = Column(String, index=True)

class Comments5(Base):
    __tablename__ = "comments5_table"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    comment = Column(String, index=True)

class Comments6(Base):
    __tablename__ = "comments6_table"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    comment = Column(String, index=True)

Base.metadata.create_all(engine)
