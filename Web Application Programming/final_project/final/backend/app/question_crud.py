from sqlalchemy.orm import Session, load_only
from sqlalchemy.sql.expression import func, select
from app.schemas import Questions
from app.request_body import Question
import random


def question_create(db: Session, question: Question) :
    row_num = db.query(Questions).count()
    db_question = Questions(
        question_id = row_num, 
        question_name = question.question_name,
        option_1 = question.option_1,
        option_2 = question.option_2,
        option_3 = question.option_3,
        option_4 = question.option_4,
        answer = question.answer
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def quetions_get_all(db: Session) :
    return db.query(Questions).all()

def question_delete(id:str, db: Session) :
    question = db.query(Questions).filter_by(question_id=id).all()
    if not question : 
        return {"message":"question does not exist"}
    db.query(Questions).filter_by(question_id=id).delete()
    db.commit()
    return {"message":"delete success"}

def question_get_random(db: Session):
    return db.query(Questions).order_by(func.random()).limit(5).all()
