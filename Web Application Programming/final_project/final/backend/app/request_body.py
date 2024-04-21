"""
from pydantic import BaseModel, Field
from datetime import date
from typing import Optional
'''
class donate_body(BaseModel):
    
    name_1: str= Field(
        ..., 
        example="蔡",
    )
    name_2: str= Field(
        ..., 
        example="漢錩",
    )
    email: str= Field(
        ..., 
        example="pths411027@gmail.com",
    )
    num: str= Field(
        ..., 
        example="0958151715",
    )
    birth: str= Field(
        ..., 
        example="2023-01-01",
    )
    selection: str= Field(
        ..., 
        example="Option1",
    )
'''

class donate_body(BaseModel):
    surname: str = Field(
        ...,
        example="蔡")
    given_name: str = Field(
        ..., 
        example="漢錩")
    email: str = Field(
        ..., 
        example="pths411027@gmail.com")
    number: str = Field(
        ..., 
        example="0958151715")
    money_index: int = Field(
        ...,
        example = 0)
    
class register_body(BaseModel):
    email: str = Field(
        ...,
        example = 'b07303047@ntu.edu.tw'
    )
    password: str = Field(
        ...,
        example = 'zxc1121259'
    )
    password_again: str = Field(
        ...,
        example = 'zxc1121259'
    )
    name: str = Field(
        ...,
        example = '蔡漢錩'
    )
    num: str = Field(
        ...,
        example = '0958151715'
    )

class login_body(BaseModel):
    email: str = Field(
        ...,
        example = 'b07303047@ntu.edu.tw'
    )
    password: str = Field(
        ...,
        example = 'zxc1121259'
    )
"""

from typing import Optional

from pydantic import BaseModel, Field

#For Game

class Score(BaseModel) :
    name : str
    total_stars : int
    submit_time : int
    highest_score : int


    class Config:
        orm_mode = True

class Question(BaseModel) :
    question_id: Optional[str]
    question_name: str
    option_1: str
    option_2: str
    option_3: str
    option_4: str
    answer: int

    class Config: 
        orm_mode = True

#For Donate and User
class donate_body(BaseModel):
    surname: str = Field(
        ...,
        example="蔡")
    given_name: str = Field(
        ..., 
        example="漢錩")
    email: str = Field(
        ..., 
        example="pths411027@gmail.com")
    number: str = Field(
        ..., 
        example="0958151715")
    money_index: int = Field(
        ...,
        example = 0)
    
class register_body(BaseModel):
    email: str = Field(
        ...,
        example = 'b07303047@ntu.edu.tw'
    )
    password: str = Field(
        ...,
        example = 'zxc1121259'
    )
    password_again: str = Field(
        ...,
        example = 'zxc1121259'
    )
    name: str = Field(
        ...,
        example = '蔡漢錩'
    )
    num: str = Field(
        ...,
        example = '0958151715'
    )

class login_body(BaseModel):
    email: str = Field(
        ...,
        example = 'b07303047@ntu.edu.tw'
    )
    password: str = Field(
        ...,
        example = 'zxc1121259'
    )

#For Race
class Schemas_User(BaseModel):
    id: str
    plastic: float
    meat: float
    dish: float
    trans: float
    # id: int
    # plastic: int
    # meat: int
    # dish: int
    # trans: int
    class Config:
        orm_mode = True
        
class Diff(BaseModel):
    plastic_rank: int
    plastic_num: float
    meat_rank: int
    meat_num: float
    dish_rank: int
    dish_num: float
    trans_rank: int
    trans_num: float
    # plastic_rank: int
    # plastic_num: int
    # meat_rank: int
    # meat_num: int
    # dish_rank: int
    # dish_num: int
    # trans_rank: int
    # trans_num: int
    class Config:
        orm_mode = True  

class Id_num(BaseModel):
    id: str
    num: float
    # id: int
    # num: int
    class Config:
        orm_mode = True

#For Comment 
class Comment(BaseModel):
    name:str
    comment:str